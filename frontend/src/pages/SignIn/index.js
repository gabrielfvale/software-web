import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUser } from 'providers/UserProvider';
import * as Yup from 'yup';
import api from 'services/api';

import {
  Box,
  Flex,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react';
import Content from 'components/Content';

const SigninSchema = Yup.object().shape({
  username: Yup.string().max(30, 'Too Long!').required('Required'),
  password: Yup.string().max(64, 'Too Long!').required('Required'),
});

const SignIn = () => {
  const { login } = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async values => {
    try {
      const { data } = await api.post('/auth/sign-in', values);
      login(data.token);
      toast({
        title: 'Login success',
        description: 'Welcome back!',
        status: 'success',
        isClosable: true,
      });
      const redirect = searchParams.get('redirect');
      navigate(redirect || '/');
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response.data.error,
        status: 'error',
        isClosable: true,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit,
  });
  return (
    <Content as={Flex} align="center" justify="center">
      <Box bg="m180.darkBeige" p={6}>
        <form onSubmit={formik.handleSubmit}>
          <VStack>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                bg="white"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                bg="white"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button type="submit" width="full" size="md">
              Sign in
            </Button>
          </VStack>
        </form>
      </Box>
    </Content>
  );
};

export default SignIn;

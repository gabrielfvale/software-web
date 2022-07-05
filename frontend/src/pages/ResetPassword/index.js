import { useEffect, useState } from 'react';
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

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too short')
    .max(64, 'Too long')
    .required('Required'),
  confirm_password: Yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match'),
  }),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams({});
  const navigate = useNavigate();
  const toast = useToast();
  const { logout } = useUser();

  const [token, setToken] = useState(null);
  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    const searchToken = searchParams.get('token');
    const searchId = searchParams.get('id');
    if (!searchToken || !searchId) {
      toast({
        description: 'Invalid token or user',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      navigate('/');
    }
    setToken(searchToken);
    setUserId(searchId);
  }, [searchParams]);

  const onSubmit = async values => {
    let description = 'Password updated successfully. Please login again.';
    let status = 'success';
    try {
      await api.post('/auth/reset-password', {
        token,
        user_id,
        password: values.password,
      });
      logout();
      navigate('/');
    } catch (e) {
      description = e.response.data.error;
      status = 'error';
    }
    toast({
      description,
      status,
      isClosable: true,
    });
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: ResetSchema,
    onSubmit,
  });

  return (
    <Content as={Flex} align="center" justify="center">
      <Box bg="m180.darkBeige" p={6}>
        <form onSubmit={formik.handleSubmit}>
          <VStack>
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
            <FormControl isInvalid={formik.errors.confirm_password}>
              <FormLabel htmlFor="confirm_password">Confirm</FormLabel>
              <Input
                bg="white"
                type="password"
                id="confirm_password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
              />
              <FormErrorMessage>
                {formik.errors.confirm_password}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" width="full" size="md">
              Reset password
            </Button>
          </VStack>
        </form>
      </Box>
    </Content>
  );
};

export default ResetPassword;

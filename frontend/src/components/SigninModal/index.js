import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useUser } from 'providers/UserProvider';
import api from 'services/api';

const SigninSchema = Yup.object().shape({
  username: Yup.string().max(30, 'Too Long!').required('Required'),
  password: Yup.string().max(64, 'Too Long!').required('Required'),
});

const SigninModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { login } = useUser();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: values => onSubmit(values),
  });

  const onSubmit = async values => {
    let toastMessage = 'Welcome back!';
    let toastStatus = 'success';
    try {
      const { data } = await api.post('/auth/sign-in', values);
      login(data.token);
      formik.resetForm();
      onClose();
    } catch (e) {
      toastMessage = e.response.data.error;
      toastStatus = 'error';
    }
    toast({
      description: toastMessage,
      status: toastStatus,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backgroundColor="m180.navyBlue">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>SIGN IN</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SigninModal;

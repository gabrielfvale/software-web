import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';

import { useUser } from 'providers/UserProvider';
import api from 'services/api';
import { useState } from 'react';

const SigninSchema = Yup.object().shape({
  username: Yup.string().max(30, 'Too Long!').required('Required'),
  password: Yup.string().max(64, 'Too Long!').required('Required'),
});

const SigninModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { login } = useUser();
  const [showReset, setShowReset] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: values => onSubmit(values),
  });

  const resetFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: values => onReset(values),
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

  const onReset = async values => {
    let toastMessage =
      'A link to reset your password has been sent to your email.';
    let toastStatus = 'success';
    try {
      await api.post('/auth/request-reset-password', values);
      resetFormik.resetForm();
      setShowReset(false);
      onClose();
    } catch (e) {
      console.log(e);
      toastMessage = e.response.data.error;
      toastStatus = 'error';
    }
    toast({
      description: toastMessage,
      status: toastStatus,
      isClosable: true,
    });
  };

  const renderForm = () => {
    if (showReset) {
      return (
        <form onSubmit={resetFormik.handleSubmit}>
          <VStack alignItems="flex-start">
            <FormControl isInvalid={resetFormik.errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                bg="white"
                type="email"
                id="email"
                name="email"
                onChange={resetFormik.handleChange}
                value={resetFormik.values.email}
              />
              <FormErrorMessage>{resetFormik.errors.email}</FormErrorMessage>
            </FormControl>

            <Button type="submit" width="full" size="md">
              Reset
            </Button>

            <Button
              size="sm"
              variant="link"
              onClick={() => setShowReset(false)}
            >
              Go back
            </Button>
          </VStack>
        </form>
      );
    }

    return (
      <form onSubmit={formik.handleSubmit}>
        <VStack alignItems="flex-start">
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
          <Text fontSize="sm">
            Forgot your password ?{' '}
            <Button size="sm" variant="link" onClick={() => setShowReset(true)}>
              click here
            </Button>
          </Text>
          <Button type="submit" width="full" size="md">
            Sign in
          </Button>
        </VStack>
      </form>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowReset(false);
        onClose();
      }}
      backgroundColor="m180.navyBlue"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{showReset ? 'RESET PASSWORD' : 'SIGN IN'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>{renderForm()}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SigninModal;

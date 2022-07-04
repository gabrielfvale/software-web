import { useState } from 'react';
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
  Checkbox,
  InputGroup,
  InputRightElement,
  Text,
  Button,
  useToast,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useUser } from 'providers/UserProvider';
import api from 'services/api';

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string()
    .min(4, 'Too short')
    .max(30, 'Too long')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too short')
    .max(64, 'Too long')
    .required('Required'),
  confirm_password: Yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match'),
  }),
});

const SignupModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { login } = useUser();

  const onSubmit = async values => {
    let toastMessage = 'Welcome to Filmit!';
    let toastStatus = 'success';
    try {
      const { data } = await api.post('/auth/sign-up', values);
      login(data.token);
      onClose();
      formik.resetForm();
    } catch (e) {
      toastMessage = e.response.data.error;
      toastStatus = 'error';
    }
    toast({
      description: toastMessage,
      status: toastStatus,
      isClosable: true,
      duration: 2000,
    });
  };

  const formatField = (string = '') => {
    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized.replace('_', ' ');
  };

  const textFields = ['first_name', 'last_name', 'email', 'username'];

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} backgroundColor="m180.navyBlue">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>JOIN FILMIT</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
          <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="flex-start">
              {textFields.map(field => (
                <FormControl key={field} isInvalid={formik.errors[field]}>
                  <FormLabel fontSize="sm" htmlFor={field}>
                    {formatField(field)}
                  </FormLabel>
                  <Input
                    fontSize="xs"
                    placeholder={formatField(field)}
                    id={field}
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors[field]}</FormErrorMessage>
                </FormControl>
              ))}

              <FormControl isInvalid={formik.errors.password}>
                <FormLabel fontSize="sm" htmlFor="password">
                  Password
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    fontSize="xs"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.confirm_password}>
                <FormLabel fontSize="sm" htmlFor="confirm_password">
                  Password
                </FormLabel>
                <Input
                  fontSize="xs"
                  type={show ? 'text' : 'password'}
                  placeholder="Confirm password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>
                  {formik.errors.confirm_password}
                </FormErrorMessage>
              </FormControl>

              <Checkbox size="md" colorScheme="m180.pink" defaultChecked>
                <Text fontSize="xs">
                  I’m at least 16 years old and accept the Terms of Use.
                </Text>
              </Checkbox>

              <Checkbox size="md" colorScheme="m180.pink" defaultChecked>
                <Text fontSize="xs">
                  I accept the Privacy Policy and consent to the processing of
                  my personal information in accordance with it.
                </Text>
              </Checkbox>
              <Button
                type="submit"
                size="md"
                fontSize="sm"
                alignSelf="flex-end"
              >
                Sign Up
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;

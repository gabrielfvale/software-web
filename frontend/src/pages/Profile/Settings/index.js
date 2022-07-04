import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUser } from 'providers/UserProvider';
import * as Yup from 'yup';
import api from 'services/api';

import {
  Flex,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  HStack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Content from 'components/Content';
import Category from 'components/Category';
import { Navigate } from 'react-router-dom';
import useFetchData from 'hooks/fetchData';

const AccountSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too short')
    .max(30, 'Too long')
    .required('Required'),
  first_name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  bio: Yup.string().nullable(),
});

const Settings = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user, authenticated, setUsername } = useUser();
  const toast = useToast();

  const onSubmit = async values => {
    let description = 'Profile updated successfully';
    let status = 'success';
    try {
      await api.put('profile', values);
      setUsername(values.username);
      navigate(`/profile/${values.username}`);
    } catch (e) {
      description = e.response.data.error;
      status = 'error';
    }
    toast({
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      bio: '',
    },
    validationSchema: AccountSchema,
    onSubmit,
  });

  const { data } = useFetchData(`/profile/${username}`);

  useEffect(() => {
    if (data) {
      const { first_name, last_name, email, bio } = data;
      formik.setValues(
        {
          username,
          first_name,
          last_name,
          email,
          bio,
        },
        false
      );
    }
  }, [data, formik, username]);

  console.log({ authenticated, user });

  if (!authenticated || user.username !== username) {
    return <Navigate to={`/profile/${username}`} />;
  }

  return (
    <Content as={Flex} align="center" justify="center">
      <Category title="Profile settings">
        <form onSubmit={formik.handleSubmit}>
          <VStack>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="username" fontSize="sm">
                Username
              </FormLabel>
              <Input
                bg="white"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
            <HStack>
              <FormControl isInvalid={formik.errors.first_name}>
                <FormLabel htmlFor="first_name" fontSize="sm">
                  First name
                </FormLabel>
                <Input
                  bg="white"
                  id="first_name"
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.last_name}>
                <FormLabel htmlFor="last_name" fontSize="sm">
                  Last name
                </FormLabel>
                <Input
                  bg="white"
                  id="last_name"
                  name="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl isInvalid={formik.errors.email}>
              <FormLabel htmlFor="email" fontSize="sm">
                Email
              </FormLabel>
              <Input
                bg="white"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.bio}>
              <FormLabel htmlFor="bio" fontSize="sm">
                About me
              </FormLabel>
              <Textarea
                bg="white"
                id="bio"
                name="bio"
                resize="none"
                onChange={formik.handleChange}
                value={formik.values.bio}
              />
              <FormErrorMessage>{formik.errors.bio}</FormErrorMessage>
            </FormControl>
            <Button type="submit" size="md" alignSelf="flex-end">
              Save
            </Button>
          </VStack>
        </form>
      </Category>
    </Content>
  );
};

export default Settings;

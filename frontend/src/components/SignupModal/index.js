import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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
} from '@chakra-ui/react';
import React from 'react';

const SignupModal = ({ isOpen, onClose }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Modal isOpen={isOpen} onClose={onClose} backgroundColor="m180.navyBlue">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>JOIN FILMIT</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
          <FormControl marginBottom="0.5rem">
            <FormLabel fontSize="sm">First name</FormLabel>
            <Input fontSize="xs" placeholder="First name" />
          </FormControl>

          <FormControl marginBottom="0.5rem" mt={4}>
            <FormLabel fontSize="sm">Last name</FormLabel>
            <Input fontSize="xs" placeholder="Last name" />
          </FormControl>

          <FormControl marginBottom="0.5rem">
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input fontSize="xs" placeholder="Email" />
          </FormControl>
          <FormControl marginBottom="0.5rem">
            <FormLabel fontSize="sm">Username</FormLabel>
            <Input fontSize="xs" placeholder="Username" />
          </FormControl>
          <FormControl marginBottom="1rem">
            <FormLabel fontSize="sm">Password</FormLabel>
            <InputGroup size="md">
              <Input
                fontSize="xs"
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Checkbox size="md" colorScheme="m180.pink" defaultChecked>
            <Text fontSize="xs">
              I’m at least 16 years old and accept the Terms of Use.
            </Text>
          </Checkbox>

          <Checkbox size="md" colorScheme="m180.pink" defaultChecked>
            <Text fontSize="xs">
              I accept the Privacy Policy and consent to the processing of my
              personal information in accordance with it.
            </Text>
          </Checkbox>
        </ModalBody>

        <ModalFooter>
          <Button size="xs" fontSize="sm" colorScheme="m180.pink" mr={3}>
            Sign In
          </Button>
          <Button size="xs" fontSize="sm" colorScheme="m180.pink">
            Sign Up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;

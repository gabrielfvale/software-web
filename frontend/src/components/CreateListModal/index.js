import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Button,
} from '@chakra-ui/react';

const NewListSchema = Yup.object().shape({
  name: Yup.string().max(30, 'Too Long!').required('Required'),
});

const CreateListModal = ({ isOpen, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      is_public: true,
    },
    validationSchema: NewListSchema,
    onSubmit,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl isInvalid={formik.errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  bg="white"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.name}>
                <Checkbox
                  size="md"
                  colorScheme="m180.pink"
                  checked={formik.values.is_public}
                  onChange={formik.handleChange}
                >
                  Public
                </Checkbox>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" width="full" size="md">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateListModal;

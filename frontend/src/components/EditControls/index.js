import { HStack, Button } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { FaCheck, FaTimes } from 'react-icons/fa';

const EditControls = ({
  isEditing = false,
  visible = true,
  onEdit = () => {},
  onSave = () => {},
  onCancel = () => {},
}) => {
  if (!visible) {
    return <></>;
  }

  if (isEditing) {
    return (
      <HStack>
        <Button size="xs" leftIcon={<FaCheck />} onClick={onSave}>
          Save
        </Button>
        <Button size="xs" leftIcon={<FaTimes />} onClick={onCancel}>
          Cancel
        </Button>
      </HStack>
    );
  }
  return (
    <Button
      size="sm"
      variant="link"
      leftIcon={<AiFillEdit />}
      onClick={() => onEdit(prev => !prev)}
    >
      Edit
    </Button>
  );
};

export default EditControls;

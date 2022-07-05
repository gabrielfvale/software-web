import { Textarea, Button, VStack, Text, HStack } from '@chakra-ui/react';

const Comment = ({
  description = '',
  onChange = () => {},
  onSend = () => {},
}) => {
  return (
    <VStack width="100%" alignItems="flex-start">
      <Textarea
        bg="white"
        resize="none"
        fontSize="xs"
        maxLength="280"
        value={description}
        onChange={onChange}
      />
      <HStack
        alignItems="flex-start"
        justifyContent="space-between"
        width="100%"
      >
        <Text fontSize="xs">{description.length}/280</Text>
        <Button size="sm" onClick={onSend}>
          Reply
        </Button>
      </HStack>
    </VStack>
  );
};

export default Comment;

import { Textarea, Button, VStack, Text, HStack } from '@chakra-ui/react';

const Comment = ({
  username = '',
  description = '',
  onChange = () => {},
  onSend = () => {},
}) => {
  return (
    <VStack width="100%" alignItems="flex-start">
      <Text as="span" fontSize="xs">
        Commenting as{' '}
        <Text as="span" fontSize="xs" fontWeight="bold">
          {username}
        </Text>
      </Text>
      <Textarea
        maxlength="280"
        bg="white"
        fontSize="xs"
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
          Send
        </Button>
      </HStack>
    </VStack>
  );
};

export default Comment;

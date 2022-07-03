import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Link from 'components/Link';
import { StarInput } from 'components/Stars';
import { useState } from 'react';

const ReviewBox = ({
  authenticated = false,
  loginRedirect = '/',
  onSend = () => {},
}) => {
  const [score, setScore] = useState(0);
  const [description, setDescription] = useState('');

  const renderContent = () => {
    if (!authenticated) {
      return (
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="m180.beige"
          w="100%"
          paddingY="2rem"
          borderRadius="0.4rem"
        >
          <Text>
            To review,{' '}
            <Link href="/sign-up" color="m180.pink.500">
              create your account now.
            </Link>
          </Text>
          <Text>
            Already have an account?{' '}
            <Link
              href={`/sign-in/?redirect=${loginRedirect}`}
              color="m180.pink.500"
            >
              login
            </Link>
          </Text>
        </Flex>
      );
    }

    return (
      <VStack alignItems="flex-start">
        <StarInput score={score} onClick={setScore} />
        <Textarea
          bg="white"
          resize="none"
          size="sm"
          borderRadius="0.4rem"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button
          size="sm"
          alignSelf="flex-end"
          onClick={() => onSend({ score, description })}
        >
          Send
        </Button>
      </VStack>
    );
  };

  return (
    <Box w="100%">
      <Heading size="sm" fontWeight="semibold" textTransform="uppercase">
        Review
      </Heading>
      {renderContent()}
    </Box>
  );
};

export default ReviewBox;

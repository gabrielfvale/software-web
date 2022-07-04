import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Link from 'components/Link';
import { StarInput } from 'components/Stars';
import { useEffect, useState } from 'react';

const ReviewBox = ({
  authenticated = false,
  loginRedirect = '/',
  reviewedByMe = false,
  review = {},
  onSend = () => {},
  onUpdate = () => {},
}) => {
  const [score, setScore] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (reviewedByMe) {
      setScore(review.score);
      setDescription(review.description);
    }
  }, [reviewedByMe]);

  const onClick = () => {
    if (reviewedByMe) {
      onUpdate({ score, description });
      return;
    }
    onSend({ score, description });
  };

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
        <HStack justifyContent="space-between" w="full">
          <Text></Text>
          <Button size="sm" alignSelf="flex-end" onClick={onClick}>
            {reviewedByMe ? 'Update' : 'Send'}
          </Button>
        </HStack>
      </VStack>
    );
  };

  return (
    <Box w="100%">
      <Heading size="sm" fontWeight="semibold" textTransform="uppercase">
        {reviewedByMe ? 'Your' : ''} Review
      </Heading>
      {renderContent()}
    </Box>
  );
};

export default ReviewBox;

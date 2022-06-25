import {
  Box,
  Text,
  Icon,
  Link,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { useState } from 'react';
import Comment from './Comment';

const ReviewMovie = ({ username = '' }) => {
  const [comment, setComment] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  return (
    <VStack width="100%">
      <Box width="100%">
        <Text as="span" fontSize="sm" fontWeight="bold">
          Reviewed by{' '}
          <Text as="span" fontSize="sm">
            {username}
          </Text>
        </Text>
        <HStack>
          <Text fontSize="sm">22/10/2022</Text>
          <Icon as={AiFillStar} color="m180.darkPink" fontSize="sm" />
          <Text fontSize="sm">1.0</Text>
        </HStack>
        <Text fontSize="sm" marginTop="0.5rem">
          loved it so much
        </Text>
        <HStack marginTop="0.5" gap={2}>
          <Link>
            <HStack>
              <Icon as={AiFillHeart} color="m180.darkPink" fontSize="sm" />
              <Text fontSize="xs">Like</Text>
            </HStack>
          </Link>
          <Link>
            <HStack>
              <Icon as={FaComment} color="m180.darkPink" fontSize="sm" />
              <Text fontSize="xs">22 comments</Text>
            </HStack>
          </Link>
          <Button size="xs" onClick={() => setComment(!comment)}>
            <Text fontSize="xs">Reply</Text>
          </Button>
        </HStack>
        {comment && (
          <Comment
            description={commentValue}
            onChange={e => setCommentValue(e.target.value)}
          />
        )}
      </Box>
    </VStack>
  );
};

export default ReviewMovie;

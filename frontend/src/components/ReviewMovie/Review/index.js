import { useState } from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { AiFillHeart, AiFillEdit } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import Comment from '../Comment';
import Stars from 'components/Stars';

const Review = ({ review = {}, user = -1, ...rest }) => {
  const [comment, setComment] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const {
    review_id,
    user_id,
    score,
    description,
    created_at,
    updated_at,
    username,
    comments,
    likes,
    liked_by_me,
  } = review;
  const isSameUser = Number(user) === Number(user_id);
  return (
    <Box width="100%" {...rest}>
      <HStack justifyContent="space-between">
        <Text as="span" fontSize="sm">
          Reviewed by{' '}
          <Text as="span" fontWeight="bold">
            {username}
          </Text>
        </Text>
        {isSameUser && (
          <Button
            alignSelf="flex-end"
            size="sm"
            variant="link"
            leftIcon={<AiFillEdit />}
          >
            Edit
          </Button>
        )}
      </HStack>

      <HStack>
        <Text fontSize="sm">{created_at}</Text>
        <Stars score={score} />
        <Text fontSize="sm">{score}</Text>
      </HStack>
      <Text fontSize="sm" marginTop="0.5rem">
        {description}
      </Text>
      <HStack marginTop="0.5rem" gap={2}>
        <Button
          size="xs"
          variant="ghost"
          color={liked_by_me ? 'm180.pink.500' : 'gray'}
          disabled={isSameUser}
          leftIcon={<AiFillHeart />}
        >
          {likes} like
        </Button>
        <Button size="xs" variant="ghost" leftIcon={<FaComment />}>
          {comments} comments
        </Button>
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
  );
};

export default Review;

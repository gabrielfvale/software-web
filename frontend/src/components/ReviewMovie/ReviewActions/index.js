import { Box, HStack, Button } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { getWord } from 'util/plural';

const ReviewActions = ({
  liked = false,
  likes = 0,
  comments = 0,
  likeDisabled = false,
  commentDisabled = false,
  onLike = () => {},
  onComment = () => {},
  ...rest
}) => {
  return (
    <Box>
      <HStack gap={2} {...rest}>
        <Button
          size="xs"
          variant={liked ? 'solid' : 'ghost'}
          colorScheme={liked ? 'm180.pink' : 'gray'}
          leftIcon={<AiFillHeart />}
          pointerEvents={likeDisabled ? 'none' : 'auto'}
          onClick={onLike}
        >
          {likes} {getWord('like', likes)}
        </Button>
        <Button
          size="xs"
          variant="ghost"
          leftIcon={<FaComment />}
          pointerEvents={commentDisabled ? 'none' : 'auto'}
          onClick={onComment}
        >
          {comments} {getWord('comment', comments)}
        </Button>
        {/* {user !== -1 && (
    <Button size="xs" onClick={() => setComment(!comment)}>
      <Text fontSize="xs">Reply</Text>
    </Button>
  )} */}
      </HStack>
    </Box>
  );
};

export default ReviewActions;

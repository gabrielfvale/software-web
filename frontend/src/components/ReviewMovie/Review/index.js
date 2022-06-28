import { useState, useEffect } from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { AiFillHeart, AiFillEdit } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import Comment from '../Comment';
import Stars from 'components/Stars';
import api from 'services/api';
import CommentList from 'components/CommentList';

const mockComment = {
  page: 1,
  total_pages: 2,
  total_results: 2,
  results: [
    {
      comment_id: 6,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 7,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 8,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 9,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 10,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 11,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 12,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 13,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 14,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
    {
      comment_id: 15,
      user_id: '2',
      review_id: '2',
      description: 'oi laurinha vai dar tudo certo.',
      created_at: '2022-02-25',
      updated_at: '2022-02-25',
      username: 'laurinha',
    },
  ],
};

const Review = ({ review = {}, user = -1, ...rest }) => {
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

  const [comment, setComment] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [showCommentList, setShowCommentList] = useState(false);
  const [commentList, setCommentList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      // const { data } = await api.get(`/review/${review_id}/comments`);
      setCommentList(mockComment);
    };
    if (showCommentList) {
      fetchData();
    }
  }, [showCommentList]);

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
        <Button
          size="xs"
          variant="ghost"
          leftIcon={<FaComment />}
          onClick={() => setShowCommentList(!showCommentList)}
        >
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
      {showCommentList && <CommentList data={commentList} />}
    </Box>
  );
};

export default Review;

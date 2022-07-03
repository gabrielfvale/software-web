import { useState, useEffect } from 'react';
import moment from 'moment';
import api from 'services/api';

import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { AiFillHeart, AiFillEdit } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import Comment from '../Comment';
import Stars from 'components/Stars';
import CommentList from 'components/CommentList';
import Pagination from 'components/Pagination';
import Link from 'components/Link';

import { getWord } from 'util/plural';

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

  const [page, setPage] = useState(1);
  const [comment, setComment] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [showCommentList, setShowCommentList] = useState(false);
  const [commentList, setCommentList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(
        `/review/${review_id}/comments/?page=${page}&per_page=5`
      );
      setCommentList(data);
    };
    if (showCommentList) {
      fetchData();
    }
  }, [showCommentList, page, review_id]);

  const isSameUser = Number(user) === Number(user_id);
  const created = moment(created_at).format('DD/MM/YYYY');
  const edited = !moment(created_at).isSame(updated_at);

  const onSendComment = async () => {
    await api.post('/review/comment', {
      review_id,
      description: commentValue,
    });
  };

  return (
    <Box width="100%" {...rest}>
      <HStack justifyContent="space-between">
        <Text as="span" fontSize="sm">
          Reviewed by{' '}
          <Link href={`/profile/${username}`} fontWeight="bold">
            {isSameUser ? 'you' : username}
          </Link>{' '}
          on {created}{' '}
          {edited ? (
            <Text as="span" fontStyle="italic">
              (edited)
            </Text>
          ) : (
            ''
          )}
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
          {likes} {getWord('like', likes)}
        </Button>
        <Button
          size="xs"
          variant="ghost"
          leftIcon={<FaComment />}
          onClick={() => setShowCommentList(!showCommentList)}
        >
          {comments} {getWord('comment', comments)}
        </Button>
        <Button size="xs" onClick={() => setComment(!comment)}>
          <Text fontSize="xs">Reply</Text>
        </Button>
      </HStack>
      {comment && (
        <Comment
          description={commentValue}
          onChange={e => setCommentValue(e.target.value)}
          onSend={onSendComment}
        />
      )}
      {showCommentList && (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <CommentList data={commentList?.results} />
          <Pagination
            page={page}
            total_pages={commentList?.total_pages || 1}
            onClick={setPage}
            showGoTo
          />
        </Box>
      )}
    </Box>
  );
};

export default Review;

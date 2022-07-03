import { useState, useEffect } from 'react';
import moment from 'moment';
import api from 'services/api';

import { Box, Text, Button, HStack, Textarea } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import Comment from '../Comment';
import Stars, { StarInput } from 'components/Stars';
import CommentList from 'components/CommentList';
import Pagination from 'components/Pagination';
import Link from 'components/Link';
import EditControls from 'components/EditControls';

import { getWord } from 'util/plural';

const Review = ({ review = {}, user = -1, ...rest }) => {
  const {
    review_id,
    user_id,
    score: default_score,
    description: default_description,
    created_at,
    updated_at,
    username,
    comments: default_comments,
    likes,
    liked_by_me,
  } = review;

  const [page, setPage] = useState(1);

  const [comment, setComment] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const [showCommentList, setShowCommentList] = useState(false);
  const [commentList, setCommentList] = useState({});

  const [isEditing, setEditing] = useState(false);
  const [description, setDescription] = useState(default_description);
  const [score, setScore] = useState(default_score);

  const [comments, setComments] = useState(Number(default_comments));

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
  }, [showCommentList, page, review_id, comments]);

  const isSameUser = Number(user) === Number(user_id);
  const created = moment(created_at).format('DD/MM/YYYY');
  const edited = !moment(created_at).isSame(updated_at);

  const onSendComment = async () => {
    await api.post('/review/comment', {
      review_id,
      description: commentValue,
    });
    setComments(prev => prev + 1);
    // Reset and toggle comment list
    setCommentValue('');
    setComment(false);
    setShowCommentList(true);
  };

  const onEditClose = () => {
    setScore(default_score);
    setDescription(default_description);
    setEditing(false);
  };

  const onEditFinish = async () => {
    await api.put('/review', { review_id, score, description });
    setEditing(false);
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
        <EditControls
          visible={isSameUser}
          isEditing={isEditing}
          onEdit={setEditing}
          onCancel={onEditClose}
          onSave={onEditFinish}
        />
      </HStack>

      <HStack>
        {isEditing ? (
          <StarInput score={score} onClick={setScore} />
        ) : (
          <Stars score={score} />
        )}
        <Text fontSize="sm">{score}</Text>
      </HStack>

      {isEditing ? (
        <Textarea
          bg="white"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></Textarea>
      ) : (
        <Text fontSize="sm" marginTop="0.5rem">
          {description}
        </Text>
      )}

      <HStack marginTop="0.5rem" gap={2}>
        <Button
          size="xs"
          variant="ghost"
          color={liked_by_me ? 'm180.pink.500' : 'gray'}
          pointerEvents={isSameUser || user === -1 ? 'none' : 'auto'}
          leftIcon={<AiFillHeart />}
        >
          {likes} {getWord('like', likes)}
        </Button>
        <Button
          size="xs"
          variant="ghost"
          leftIcon={<FaComment />}
          onClick={() => setShowCommentList(!showCommentList)}
          pointerEvents={Number(comments) === 0 ? 'none' : 'auto'}
        >
          {comments} {getWord('comment', comments)}
        </Button>
        {user !== -1 && (
          <Button size="xs" onClick={() => setComment(!comment)}>
            <Text fontSize="xs">Reply</Text>
          </Button>
        )}
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

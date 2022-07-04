import { useState, useEffect } from 'react';
import moment from 'moment';
import api from 'services/api';

import { Box, Text, HStack } from '@chakra-ui/react';

import Stars from 'components/Stars';
import Link from 'components/Link';
import ReviewActions from '../ReviewActions';
import CommentSection from '../CommentSection';

const Review = ({ review = {}, user = -1, ...rest }) => {
  const {
    review_id,
    user_id,
    score,
    description,
    created_at,
    updated_at,
    username,
    likes: default_likes,
    comments: default_comments,
    liked_by_me,
  } = review;

  const [liked, setLiked] = useState(liked_by_me);

  const [showCommentList, setShowCommentList] = useState(false);
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState({});

  const [likes, setLikes] = useState(Number(default_likes));
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

  const created = moment(created_at).format('DD/MM/YYYY');
  const edited = !moment(created_at).isSame(updated_at);

  const onSendComment = async description => {
    await api.post('/review/comment', {
      review_id,
      description,
    });
    setComments(prev => prev + 1);
  };

  const onLike = async () => {
    await api.post('/review/like', {
      review_id,
    });
    setLikes(prev => (liked ? prev - 1 : prev + 1));
    setLiked(value => !value);
  };

  return (
    <Box width="100%" {...rest}>
      <HStack justifyContent="space-between">
        <Text as="span" fontSize="sm">
          Reviewed by{' '}
          <Link href={`/profile/${username}`} fontWeight="bold">
            {username}
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
      </HStack>

      <HStack>
        <Stars score={score} />
        <Text fontSize="sm">{score}</Text>
      </HStack>

      <Text fontSize="sm" marginTop="0.5rem">
        {description}
      </Text>

      <ReviewActions
        marginTop="0.5rem"
        liked={liked}
        likes={likes}
        comments={comments}
        likeDisabled={user === -1 || Number(user) === Number(user_id)}
        commentDisabled={user === -1 && comments === 0}
        onLike={onLike}
        onComment={() => setShowCommentList(prev => !prev)}
      />

      {showCommentList && (
        <CommentSection
          page={page}
          commentList={commentList}
          showReply={user !== -1}
          onChangePage={setPage}
          onSendComment={onSendComment}
        />
      )}
    </Box>
  );
};

export default Review;

import { useEffect, useState } from 'react';

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
import CommentSection from '../CommentSection';
import ReviewActions from '../ReviewActions';

import api from 'services/api';

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

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const [showCommentList, setShowCommentList] = useState(false);
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(
        `/review/${review?.review_id}/comments/?page=${page}&per_page=5`
      );
      setCommentList(data);
    };
    if (showCommentList) {
      fetchData();
    }
  }, [showCommentList, page, comments]);

  useEffect(() => {
    if (reviewedByMe) {
      setScore(review.score);
      setDescription(review.description);

      setLikes(Number(review.likes));
      setComments(Number(review.comments));
    }
  }, [reviewedByMe, review]);

  const onClick = () => {
    if (reviewedByMe) {
      onUpdate({ score, description });
      return;
    }
    onSend({ score, description });
  };

  const onSendComment = async description => {
    await api.post('/review/comment', {
      review_id: review.review_id,
      description,
    });
    setComments(prev => prev + 1);
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
          <Box>
            {reviewedByMe && (
              <ReviewActions
                likes={likes}
                comments={comments}
                likeDisabled={true}
                onComment={() => setShowCommentList(value => !value)}
              />
            )}
          </Box>
          <Button size="sm" alignSelf="flex-end" onClick={onClick}>
            {reviewedByMe ? 'Update' : 'Send'}
          </Button>
        </HStack>
        {showCommentList && (
          <CommentSection
            page={page}
            commentList={commentList}
            onChangePage={setPage}
            onSendComment={onSendComment}
          />
        )}
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

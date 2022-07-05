import { VStack, StackDivider, Text } from '@chakra-ui/react';
import moment from 'moment';
import DetailedReview from '../DetailedReview';
import Skeleton from 'components/DetailedReview/skeleton';

const ReviewList = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <VStack divider={<StackDivider color="darkBeige" />} spacing={4}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </VStack>
    );
  }

  if (data && data.length === 0) {
    return <Text>This content is empty.</Text>;
  }

  return (
    <VStack divider={<StackDivider color="darkBeige" />} spacing={4}>
      {data.map(review => {
        review.release_date = moment(review.release_date).format('YYYY');
        return <DetailedReview key={review.review_id} review={review} />;
      })}
    </VStack>
  );
};

export default ReviewList;

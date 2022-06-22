import { VStack, StackDivider } from '@chakra-ui/react';
import moment from 'moment';
import DetailedReview from '../../DetailedReview';

const ReviewList = ({ data = [] }) => {
  return (
    <VStack divider={<StackDivider color="darkBeige" />} spacing={4}>
      {data.map(review => {
        review.release_date = moment(review.release_date).format('YYYY');
        return <DetailedReview review={review} />;
      })}
    </VStack>
  );
};

export default ReviewList;

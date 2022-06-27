import { VStack, StackDivider } from '@chakra-ui/react';
import Review from './Review';
const ReviewMovie = ({ data = {}, user = -1 }) => {
  const { page, total_pages, total_results, results } = data;
  return (
    <VStack
      width="100%"
      bg="m180.darkBeige"
      padding="2rem"
      gap={2}
      divider={<StackDivider borderColor="m180.beige" />}
    >
      {results?.map(review => {
        return <Review key={review.review_id} review={review} user={user} />;
      })}
    </VStack>
  );
};

export default ReviewMovie;

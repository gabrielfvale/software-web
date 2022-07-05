import { VStack, StackDivider } from '@chakra-ui/react';
import { useUser } from 'providers/UserProvider';
import Review from './Review';
const ReviewMovie = ({ data = [] }) => {
  const { user } = useUser();
  const filteredData = data.filter(
    review => Number(review.user_id) !== Number(user?.user_id)
  );
  return (
    <VStack
      width="100%"
      bg="m180.darkBeige"
      gap={2}
      divider={<StackDivider borderColor="m180.beige" />}
    >
      {filteredData.map(review => {
        return <Review key={review.review_id} review={review} user={user} />;
      })}
    </VStack>
  );
};

export default ReviewMovie;

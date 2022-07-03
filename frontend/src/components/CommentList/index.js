import moment from 'moment';
import { VStack, Box, Text, HStack } from '@chakra-ui/react';
import Link from 'components/Link';

const CommentList = ({ data = [] }) => {
  return (
    <VStack width="100%" gap={1} marginTop="1rem">
      {data?.map(comment => {
        const date = moment(comment.created_at).format('MMMM Do YYYY, h:mm a');
        const edited = !moment(comment.created_at).isSame(comment.updated_at);
        return (
          <Box
            width="100%"
            bg="m180.beige"
            padding="1rem"
            borderRadius="0.4rem"
            key={comment.comment_id}
          >
            <Box>
              <HStack alignItems="center">
                <Text as="span" fontSize="xs">
                  Commented by{' '}
                  <Link
                    href={`/profile/${comment.username}`}
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    {comment.username}
                  </Link>
                  {edited ? (
                    <Text as="span" fontStyle="italic">
                      (edited)
                    </Text>
                  ) : (
                    ''
                  )}{' '}
                  at {date}
                </Text>
              </HStack>

              <Text as="span" fontSize="xs">
                {comment.description}
              </Text>
            </Box>
          </Box>
        );
      })}
    </VStack>
  );
};

export default CommentList;

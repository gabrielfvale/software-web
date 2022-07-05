import moment from 'moment';
import { useUser } from 'providers/UserProvider';
import { VStack, Box, Text, HStack, IconButton } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import Link from 'components/Link';

const CommentList = ({ data = [], onDelete = () => {} }) => {
  const { user } = useUser();

  if (data.length === 0) {
    return <Text fontSize="sm">There are no comments.</Text>;
  }

  return (
    <VStack width="100%" gap={1} marginTop="1rem">
      {data?.map(comment => {
        const date = moment(comment.created_at).format('MMMM Do YYYY, h:mm a');
        const edited = !moment(comment.created_at).isSame(comment.updated_at);
        return (
          <Box
            key={comment.comment_id}
            w="100%"
            bg="m180.beige"
            padding="1rem"
            borderRadius="0.4rem"
          >
            <Box>
              <HStack justifyContent="space-between">
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
                {(user?.username === comment.username || user?.admin) && (
                  <HStack>
                    <IconButton
                      icon={<FaTrash />}
                      size="xs"
                      variant="ghost"
                      alignSelf="flex-end"
                      onClick={() => onDelete(comment.comment_id)}
                    />
                  </HStack>
                )}
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

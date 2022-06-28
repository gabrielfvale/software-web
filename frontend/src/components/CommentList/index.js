import { useState } from 'react';
import moment from 'moment';
import { VStack, Box, Text, HStack } from '@chakra-ui/react';
import Pagination from 'components/Pagination';

const CommentList = ({ data = {} }) => {
  const { page, total_pages, total_results, results } = data;
  const [pageInit, setPage] = useState(page);

  return (
    <VStack width="100%" gap={1} marginTop="1rem">
      {results?.map(comment => {
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
                  <Text as="span" fontSize="xs" fontWeight="bold">
                    {comment.username}
                  </Text>
                </Text>
                <Text fontSize="xs">at {comment.created_at}</Text>
              </HStack>

              <Text as="span" fontSize="xs">
                {comment.description}
              </Text>
            </Box>
          </Box>
        );
      })}
      <Box>
        <Pagination
          page={pageInit}
          total_pages={total_pages || 1}
          onClick={setPage}
          showGoTo
        />
      </Box>
    </VStack>
  );
};

export default CommentList;

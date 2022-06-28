import { useState } from 'react';
import moment from 'moment';
import { VStack, Box, Text, HStack } from '@chakra-ui/react';

const CommentList = ({ data = {} }) => {
  const { page, total_pages, total_results, results } = data;

  return (
    <VStack width="100%" gap={1} marginTop="1rem">
      {results?.map(comment => {
        let date = moment(comment.created_at).format('MMMM Do YYYY, h:mm a');
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
                <Text fontSize="xs">at {date}</Text>
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

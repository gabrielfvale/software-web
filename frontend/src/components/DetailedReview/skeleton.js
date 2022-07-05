import {
  Box,
  Heading,
  Text,
  Icon,
  HStack,
  VStack,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

const DetailedReviewSkeleton = () => {
  return (
    <HStack gap="0.5rem" w="full" alignItems="stretch">
      <Box w={130}>
        <Skeleton w="109px" h="163px" />
      </Box>
      <VStack alignItems="flex-start" justifyContent="space-between" w="100%">
        <Box>
          <HStack>
            <Skeleton>
              <Heading size="md">Lorem Ipsum</Heading>
            </Skeleton>
            <Skeleton>
              <Heading size="xs">yyyy</Heading>
            </Skeleton>
          </HStack>
          <SkeletonText noOfLines={3} mt={2} />
        </Box>

        <HStack justifySelf="flex-end">
          <HStack>
            <Skeleton>
              <Text fontSize="xs">.. 0 likes</Text>
            </Skeleton>
          </HStack>

          <HStack>
            <Skeleton>
              <Text fontSize="xs">.. 0 comments</Text>
            </Skeleton>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default DetailedReviewSkeleton;

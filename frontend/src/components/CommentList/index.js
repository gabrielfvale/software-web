import { VStack, Box, StackDivider, Text, HStack } from '@chakra-ui/react';
const CommentList = ({ username = '', count = 0, comment = '' }) => {
  return (
    <VStack
      divider={<StackDivider borderColor="m180.darkBeige" />}
      width="100%"
    >
      <Box width="100%" marginTop="0.5rem">
        <Text fontSize="sm">{count} comments. </Text>
      </Box>

      <Box width="100%">
        <HStack>
          <Box>
            <Text as="span" fontSize="xs">
              Reviewed by{' '}
            </Text>
            <Text as="span" fontSize="xs" fontWeight="bold">
              {username}
            </Text>
          </Box>
          <Text fontSize="xs">22/10/2022</Text>
        </HStack>

        <Text as="span" fontSize="xs">
          Tom cruise would have actually genetically engineered a whole Island
          worth of dinosaurs and then set them free to the world and then cause
          havoc, then would have actually trained velociraptors and jumped from
          trex to trex and killed Chris Pratt, the actual villain and that
          blonde too.
        </Text>
      </Box>
    </VStack>
  );
};

export default CommentList;

import { Box, Text } from '@chakra-ui/react';

const ListingSection = ({ title, redirectTo, children }) => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        borderBottomColor="m180.darkBeige"
        borderBottomWidth="1"
        paddingBottom="0.5rem"
        marginBottom="1rem"
      >
        <Text fontSize="sm">{title}</Text>
        {!!redirectTo && (
          <Text fontSize="sm" color="m180.darkPink">
            More
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default ListingSection;

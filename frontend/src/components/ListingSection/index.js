import { Box, Text, useTheme } from '@chakra-ui/react';

const ListingSection = ({ title, redirectTo, children }) => {
  const theme = useTheme();

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        borderBottomColor={theme.colors.m180.darkBeige}
        borderBottomWidth={1}
        paddingBottom={'0.5rem'}
        marginBottom={'1rem'}
      >
        <Text fontSize="sm">{title}</Text>
        {!!redirectTo && (
          <Text fontSize="sm" color={'m180.darkPink'}>
            More
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default ListingSection;

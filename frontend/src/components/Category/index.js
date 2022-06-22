import { HStack, Box, Heading, Link, Divider } from '@chakra-ui/react';

const Category = ({ text = '', link = '', children }) => {
  return (
    <Box>
      <Box width="100%">
        <HStack marginTop="1rem" marginBottom="1rem">
          <Heading size="md">{text}</Heading>
          {link && <Link href={link}>More</Link>}
        </HStack>
        <Divider color="darkBeige" />
      </Box>
      {children}
    </Box>
  );
};

export default Category;

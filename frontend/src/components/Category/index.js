import { HStack, Box, Heading, Divider } from '@chakra-ui/react';
import Link from '../Link';

const Category = ({ text = '', link = '', children }) => {
  return (
    <Box>
      <Box width="100%">
        <HStack justifyContent="space-between">
          <Heading size="sm" textTransform="uppercase">
            {text}
          </Heading>
          {link && (
            <Link href={link} fontSize="sm" color="m180.pink.500">
              MORE
            </Link>
          )}
        </HStack>
        <Divider color="darkBeige" />
      </Box>
      {children}
    </Box>
  );
};

export default Category;

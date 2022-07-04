import { HStack, Box, Heading, Divider } from '@chakra-ui/react';
import Link from '../Link';

const Category = ({ title = '', link = '', children, ...rest }) => {
  return (
    <Box {...rest}>
      <Box width="100%" marginY="1rem">
        <HStack justifyContent="space-between">
          <Heading size="sm" fontWeight="semibold" textTransform="uppercase">
            {title}
          </Heading>
          {link && (
            <Link href={link} fontSize="sm" color="m180.pink.500">
              MORE
            </Link>
          )}
        </HStack>
        <Divider borderColor="m180.darkBeige" />
      </Box>
      {children}
    </Box>
  );
};

export default Category;

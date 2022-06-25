import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ href, children, ...rest }) => {
  return (
    <ChakraLink as={RouterLink} to={href} {...rest} color="m180.pink.500">
      {children}
    </ChakraLink>
  );
};

export default Link;

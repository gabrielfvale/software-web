import { Heading, Text } from '@chakra-ui/react';
import Content from 'components/Content';

const NotFound = () => {
  return (
    <Content margin="auto auto" textAlign="center">
      <Heading>404 - Not found</Heading>
      <Text>The page you were looking for could not be found.</Text>
    </Content>
  );
};

export default NotFound;

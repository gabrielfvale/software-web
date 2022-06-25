import { Box } from '@chakra-ui/react';
import ListComment from '../../components/ListComment';

const Lists = () => {
  return (
    // Testing ListComment component
    <Box paddingLeft="15rem" paddingRight="15rem">
      <ListComment username="Ola" />
    </Box>
  );
};

export default Lists;

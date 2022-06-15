import { Flex, Text, HStack } from '@chakra-ui/react';
import theme from '../../styles/theme.js';

const Navbar = () => {
  return (
    <Flex
      color="white"
      bg="m180.navyBlue.500"
      width="100vw"
      height="5vw"
      justifyContent="space-between"
      alignItems="center"
      padding="3rem"
    >
      <Text>Ola</Text>

      <HStack spacing="24px">
        <Text>Ola</Text>
        <Text>Ola</Text>
        <Text>Ola</Text>
        <Text>Ola</Text>
      </HStack>
    </Flex>
  );
};

export default Navbar;

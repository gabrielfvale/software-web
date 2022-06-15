import { Flex, Image, Text, HStack } from '@chakra-ui/react';
import Logo from '../../assets/Logo.svg';

const routes = [
  {
    title: 'Films',
    route: '/films',
  },
  {
    title: 'Lists',
    route: '/lists',
  },
  {
    title: 'My profile',
    route: '/profile',
  },
];

const Navbar = () => {
  return (
    <Flex
      color="white"
      bg="m180.navyBlue.500"
      width="100%"
      height="6rem"
      justifyContent="space-between"
      alignItems="center"
      paddingRight="3rem"
      paddingLeft="3rem"
    >
      <Image src={Logo} h="4.5rem" objectFit="contain" />

      <HStack spacing="24px">
        {routes.map(route => (
          <Text key={route.route}>{route.title}</Text>
        ))}
      </HStack>
    </Flex>
  );
};

export default Navbar;

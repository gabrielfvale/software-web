import {
  Flex,
  Image,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
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

// homepage -> navbar gradiente
// todos os outros lugares -> navbar com background

const Navbar = ({ transparent = false }) => {
  const background = transparent
    ? 'linear(to-b,rgba(0,0,0,0.3),transparent)'
    : 'linear(to-r,m180.navyBlue.500,m180.navyBlue.400)';
  return (
    <Flex
      color="white"
      bgGradient={background}
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
          <Link minWidth="7rem" key={route.route} href={route.route}>
            {route.title}
          </Link>
        ))}
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<SearchIcon color="m180.purple" />}
          />
          <Input variant="filled" type="search" placeholder="Search" />
        </InputGroup>
      </HStack>
    </Flex>
  );
};

export default Navbar;

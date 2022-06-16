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

const Navbar = ({ onHomepage = false, routes = [] }) => {
  const background = onHomepage
    ? 'linear(to-b,rgba(0,0,0,0.3),transparent)'
    : 'linear(to-r,m180.navyBlue.500,m180.navyBlue.400)';

  const position = onHomepage ? 'absolute' : 'static';
  return (
    <Flex
      position={position}
      color="white"
      bgGradient={background}
      width="100%"
      height="6rem"
      justifyContent="space-between"
      alignItems="center"
      paddingRight="3rem"
      paddingLeft="3rem"
    >
      <Link href="/">
        <Image src={Logo} h="4.5rem" objectFit="contain" />
      </Link>

      <HStack spacing="24px">
        {routes.map(route => (
          <Link minWidth="7rem" key={route.path} href={route.path}>
            {route.title}
          </Link>
        ))}
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<SearchIcon color="m180.purple" />}
          />
          <Input
            variant="filled"
            type="search"
            placeholder="Search"
            focusBorderColor="white"
          />
        </InputGroup>
      </HStack>
    </Flex>
  );
};

export default Navbar;

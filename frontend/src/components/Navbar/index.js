import {
  Flex,
  Image,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Logo from '../../assets/Logo.svg';

const Navbar = ({ onHomepage = false, routes = [] }) => {
  const background = onHomepage
    ? 'linear(to-b,transparent,transparent)'
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
      paddingRight="15rem"
      paddingLeft="15rem"
      zIndex="2"
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
        <InputGroup width="12rem">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="m180.purple" />}
          />
          <Input
            borderRadius="2rem"
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

import {
  Flex,
  Image,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import Content from 'components/Content';
import Link from '../Link';
import Logo from '../../assets/Logo.svg';

const Navbar = ({ onHomepage = false, routes = [] }) => {
  const background = onHomepage
    ? 'linear(to-b,transparent,transparent)'
    : 'linear(to-r,m180.navyBlue.500,m180.navyBlue.400)';

  const position = onHomepage ? 'absolute' : 'static';
  return (
    <Content
      as={Flex}
      position={position}
      color="white"
      bgGradient={background}
      width="100%"
      height="6rem"
      justifyContent="space-between"
      alignItems="center"
      zIndex="2"
    >
      <Link href="/">
        <Image src={Logo} h="4.5rem" objectFit="contain" />
      </Link>

      <HStack gap={4}>
        {routes.map(route => (
          <Link key={route.path} color="white" href={route.path}>
            {route.title}
          </Link>
        ))}
        <InputGroup width="12rem">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={AiOutlineSearch} color="m180.purple" />}
          />
          <Input
            borderRadius="2rem"
            variant="filled"
            type="search"
            placeholder="Search"
            _focus={{ background: '#d5dbe0' }}
          />
        </InputGroup>
      </HStack>
    </Content>
  );
};

export default Navbar;

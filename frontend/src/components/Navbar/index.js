import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'providers/UserProvider';
import {
  Flex,
  Image,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import Content from 'components/Content';
import SigninModal from 'components/SigninModal';
import Link from '../Link';
import Logo from '../../assets/Logo.svg';

const Navbar = ({ onHomepage = false }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');

  const { user, authenticated, logout } = useUser();
  const background = onHomepage
    ? 'linear(to-b,transparent,transparent)'
    : 'linear(to-r,m180.navyBlue.500,m180.navyBlue.400)';

  const userRoute = authenticated
    ? [{ title: 'My profile', path: `/profile/${user?.username}` }]
    : [];

  const routes = [
    {
      title: 'Films',
      path: '/films',
    },
    {
      title: 'Lists',
      path: '/lists',
    },
    ...userRoute,
  ];

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
      <SigninModal isOpen={isOpen} onClose={onClose} />
      <Link href="/">
        <Image src={Logo} h="4.5rem" objectFit="contain" />
      </Link>

      <HStack gap={4}>
        {routes.map(route => (
          <Link key={route.path} color="white" href={route.path}>
            {route.title.toUpperCase()}
          </Link>
        ))}
        {authenticated ? (
          <Link
            href="#"
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            LOG OUT
          </Link>
        ) : (
          <Link href="#" onClick={onOpen}>
            SIGN IN
          </Link>
        )}
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
            color="black"
            _focus={{ background: '#d5dbe0' }}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                navigate(`/films/search/?query=${query}`);
              }
            }}
          />
        </InputGroup>
      </HStack>
    </Content>
  );
};

export default Navbar;

import { useLocation } from 'react-router-dom';

import UserProvider from 'providers/UserProvider';

import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router, { publicRoutes } from './routes';
import { useEffect } from 'react';
import { useDocumentTitle } from 'hooks/documentTitle';

function App() {
  const location = useLocation();
  const setTitle = useDocumentTitle();

  useEffect(() => {
    if (['/', '/lists', '/films'].includes(location.pathname)) {
      setTitle('Filmit');
    }
  }, [setTitle, location]);

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Flex
          minH="100vh"
          flexDir="column"
          position="relative"
          paddingBottom="8rem"
        >
          <Navbar
            routes={publicRoutes}
            onHomepage={location.pathname === '/'}
          />
          <Router />
          <Footer />
        </Flex>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;

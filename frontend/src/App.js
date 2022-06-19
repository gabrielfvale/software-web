import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router, { publicRoutes } from './routes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <ChakraProvider theme={theme}>
      <Box backgroundColor="m180.beige">
        <Navbar routes={publicRoutes} onHomepage={location.pathname === '/'} />
        <Box minHeight={'100vh'} bg="white">
          <Router />
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;

import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router, { publicRoutes } from './routes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" minH="100vh" paddingBottom="8rem">
        <Navbar routes={publicRoutes} onHomepage={location.pathname === '/'} />
        <Router />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;

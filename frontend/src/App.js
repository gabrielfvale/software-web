import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Router, { publicRoutes } from './routes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <ChakraProvider theme={theme}>
      <Box backgroundColor="m180.beige">
        <Navbar routes={publicRoutes} onHomepage={location.pathname === '/'} />
        <Router />
      </Box>
    </ChakraProvider>
  );
}

export default App;

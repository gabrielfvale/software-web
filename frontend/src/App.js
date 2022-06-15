import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  Stack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import theme from './styles/theme';
import Hero from './components/Hero';
import Navbar from './components/Navbar/index.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="m180.pink"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>

            <Navbar></Navbar>
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="m180.navyBlue" variant="solid">
                Button
              </Button>
              <Button colorScheme="m180.navyBlue" variant="outline">
                Button
              </Button>
              <Button colorScheme="m180.navyBlue" variant="ghost">
                Button
              </Button>
              <Button colorScheme="m180.navyBlue" variant="link">
                Button
              </Button>
            </Stack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

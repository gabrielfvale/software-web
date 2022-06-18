import Hero from '../../components/Hero';
import HomeGrid from '../../components/Movies/HomeGrid/HomeGrid';
import BasicGrid from '../../components/Grid/BasicGrid';
import { Button, Heading, Box } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box>
      <Box>
        <Hero src="https://www.themoviedb.org/t/p/original/zvQgzyelcgSYNr4GpPXEEgl1i7O.jpg" />
      </Box>
      <Box paddingLeft="15rem" paddingRight="15rem">
        <HomeGrid></HomeGrid>
        <BasicGrid></BasicGrid>
      </Box>
    </Box>
  );
};

export default Home;

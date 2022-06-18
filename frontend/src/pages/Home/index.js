import Hero from '../../components/Hero';
import HomeGrid from '../../components/Movies/HomeGrid';
import BasicGrid from '../../components/Grid';
import { Box } from '@chakra-ui/react';
import ReviewGrid from '../../components/Review';
import { useEffect, useState } from 'react';

const Home = () => {
  return (
    <Box>
      <Box>
        <Hero src="https://www.themoviedb.org/t/p/original/zvQgzyelcgSYNr4GpPXEEgl1i7O.jpg" />
      </Box>
      <Box paddingLeft="15rem" paddingRight="15rem">
        <HomeGrid></HomeGrid>
        <BasicGrid></BasicGrid>
        <ReviewGrid></ReviewGrid>
      </Box>
    </Box>
  );
};

export default Home;

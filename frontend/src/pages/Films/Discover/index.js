import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import MovieGrid from 'components/MovieGrid';
import Pagination from 'components/Pagination';
import FilteringHeader from './components/FilteringHeader';

const mockList = {
  page: 1,
  total_pages: 8,
  total_results: 200,
  results: [
    {
      id: 16859,
      title: "Kiki's Delivery Service",
      poster_path: '/7nO5DUMnGUuXrA4r2h6ESOKQRrx.jpg',
    },
    {
      id: 526896,
      title: 'Morbius',
      poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    },
    {
      id: 718789,
      title: 'Lightyear',
      poster_path: '/vpILbP9eOQEtdQgl4vgjZUNY07r.jpg',
    },
    {
      id: 361743,
      title: 'Top Gun: Maverick',
      poster_path: '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    },
    {
      id: 639933,
      title: 'The Northman',
      release_date: '2022-04-07',
      poster_path: '/8p9zXB7M78nZpm215zHfqpknMeM.jpg',
    },
    {
      movie_id: 263115,
      title: 'Logan',
      poster_path: '/r9utEhMKiaXUj0Bi6iAa3Yr5hrL.jpg',
    },
    {
      movie_id: 31011,
      title: 'Mr. Nobody',
      poster_path: '/qNkIONc4Rgmzo23ph7qWp9QfVnW.jpg',
    },
    {
      movie_id: 149870,
      title: 'The Wind Rises',
      poster_path: '/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg',
    },
  ],
};

const Discover = () => {
  return (
    <Box marginX="15rem" paddingY="1.5rem">
      <FilteringHeader>
        <Box
          marginY="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text color="m180.darkPink" mb="1rem" fontSize="xs">
            {mockList.total_results} films found
          </Text>
          <MovieGrid data={mockList.results} />
        </Box>
      </FilteringHeader>
      <Box flex={1} display="flex" justifyContent="center">
        <Pagination page={mockList.page} total_pages={mockList.total_pages} />
      </Box>
    </Box>
  );
};

export default Discover;

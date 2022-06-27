import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import MovieGrid from 'components/MovieGrid';
import Pagination from 'components/Pagination';
import FilteringHeader from './components/FilteringHeader';

const mockList = {
  list_id: 1,
  title: 'Upcoming Movies',
  movies: [
    {
      id: '0',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17514/images-w1400.jpg',
    },
    {
      id: '1',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17518/images-w1400.jpg',
    },
    {
      id: '2',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17517/images-w1400.jpg',
    },
    {
      id: '3',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17521/images-w1400.jpg',
    },
    {
      id: '4',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17522/images-w1400.jpg',
    },
    {
      id: '5',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17523/images-w1400.jpg',
    },
    {
      id: '6',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17524/images-w1400.jpg',
    },
    {
      id: '7',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17514/images-w1400.jpg',
    },
    {
      id: '8',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17518/images-w1400.jpg',
    },
    {
      id: '9',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17517/images-w1400.jpg',
    },
    {
      id: '10',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17521/images-w1400.jpg',
    },
    {
      id: '11',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17522/images-w1400.jpg',
    },
    {
      id: '12',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17523/images-w1400.jpg',
    },
    {
      id: '13',
      poster_path:
        'https://assets.mubicdn.net/images/notebook/post_images/17524/images-w1400.jpg',
    },
  ],
  likes: 1234,
  description:
    'Et mollitia ut exercitationem qui sed recusandae sint illum. Molestiae quae a odio harum aliquam expedita inventore. Tenetur recusandae maiores vero voluptatem veniam autem saepe laborum.',
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
            2900 films found
          </Text>
          <MovieGrid data={mockList.movies} />
        </Box>
      </FilteringHeader>
      <Box flex={1} display="flex" justifyContent="center">
        <Pagination total_pages={8} />
      </Box>
    </Box>
  );
};

export default Discover;

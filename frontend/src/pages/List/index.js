import React, { useRef } from 'react';
import { Box, Text, HStack, Icon, Button } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import MoviePosters from '../../components/MoviePosters';

const mockUser = {
  user_id: 1,
  first_name: 'Usuario',
  last_name: 'Teste',
  bio: 'Usuario de teste',
  country: 'BR',
  admin: false,
};

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

const List = () => {
  const headerRef = useRef();

  return (
    <Box marginX="15rem" paddingY="1.5rem">
      <Box
        bg="m180.darkBeige"
        borderRadius="base"
        padding="1rem"
        marginBottom="2rem"
        ref={headerRef}
      >
        <HStack>
          <Text>List by</Text>
          <Text fontWeight={'bold'}>
            {mockUser.first_name} {mockUser.last_name}
          </Text>
        </HStack>
        <HStack gap={'1rem'} marginY="0.5rem">
          <Text fontWeight={'medium'}>{mockList.title}</Text>
          <HStack>
            <Icon as={AiFillHeart} color="m180.pink.500" />
            <Text fontSize="xs" fontWeight="medium">
              {mockList.likes} likes
            </Text>
          </HStack>
        </HStack>
        <Text width="50%" fontSize="xs">
          {mockList.description}
        </Text>
      </Box>
      <MoviePosters data={mockList.movies} />
      <Box flex={1} display="flex" justifyContent="flex-end">
        <Button
          fontSize="sm"
          fontWeight="medium"
          colorScheme="m180.pink"
          padding="0.5rem 1.5rem"
          mt="1rem"
        >
          EDIT
        </Button>
      </Box>
    </Box>
  );
};

export default List;

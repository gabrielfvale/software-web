import React from 'react';
import { Box, Text, HStack, Icon, Button } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import Content from '../../../components/Content';
import MovieGrid from '../../../components/MovieGrid';

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
  description:
    'Et mollitia ut exercitationem qui sed recusandae sint illum. Molestiae quae a odio harum aliquam expedita inventore. Tenetur recusandae maiores vero voluptatem veniam autem saepe laborum.',
  likes: 1234,
  movies: [16859, 526896, 718789, 361743, 639933, 263115, 31011, 149870],
  details: [
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

const ListByUsername = () => {
  return (
    <Content>
      <Box
        bg="m180.darkBeige"
        borderRadius="base"
        padding="1rem"
        marginBottom="2rem"
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
      <MovieGrid data={mockList.details} />
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
    </Content>
  );
};

export default ListByUsername;

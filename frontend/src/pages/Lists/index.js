import { useNavigate } from 'react-router-dom';

import {
  Box,
  Heading,
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
} from '@chakra-ui/react';
import Category from '../../components/Category';
import ListCard from '../../components/ListCard';
import DetailedListCard from '../../components/DetailedListCard';

const mockUserLists = {
  page: 1,
  total_pages: 1,
  total_results: 1,
  results: [
    {
      list_id: 2,
      user_id: 2,
      username: 'gabrielfvale',
      name: 'Animations',
      description:
        'Id omnis sit inventore voluptate quo a fugiat. Autem corporis et ea quia. Reprehenderit blanditiis cupiditate earum. Mollitia iure possimus et. Debitis nihil architecto maxime est est.',
      list_type: 'public',
      created_at: '2022-06-22T01:13:24.072Z',
      updated_at: '2022-06-21T22:15:39.611Z',
      likes: '1',
      movies: [585, 862, 9806, 9487],
      posters: [
        {
          movie_id: 585,
          media: '/sgheSKxZkttIe8ONsf2sWXPgip3.jpg',
        },
        {
          movie_id: 862,
          media: '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
        },
        {
          movie_id: 9806,
          media: '/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg',
        },
        {
          movie_id: 9487,
          media: '/kEgOJBBXsY9RrPCFwaT398SSyfS.jpg',
        },
      ],
    },
    {
      list_id: 3,
      user_id: '1',
      username: 'laurapetrola',
      name: 'My favorite movies',
      description:
        'Id omnis sit inventore voluptate quo a fugiat. Autem corporis et ea quia. Reprehenderit blanditiis cupiditate earum. Mollitia iure possimus et. Debitis nihil architecto maxime est est.',
      list_type: 'public',
      created_at: '2022-06-22T01:13:24.072Z',
      updated_at: '2022-06-21T22:15:39.611Z',
      likes: '1',
      movies: [263115, 31011, 16859, 149870],
      posters: [
        {
          movie_id: 263115,
          media: '/r9utEhMKiaXUj0Bi6iAa3Yr5hrL.jpg',
        },
        {
          movie_id: 31011,
          media: '/qNkIONc4Rgmzo23ph7qWp9QfVnW.jpg',
        },
        {
          movie_id: 16859,
          media: '/7nO5DUMnGUuXrA4r2h6ESOKQRrx.jpg',
        },
        {
          movie_id: 149870,
          media: '/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg',
        },
      ],
    },
  ],
};

const Lists = () => {
  const navigate = useNavigate();

  return (
    <Box paddingY="1rem" paddingX="15rem">
      <VStack>
        <Heading size="md" fontWeight="medium">
          Collect, curate, and share. Lists are the perfect way to group films.
        </Heading>
        <Button
          size="sm"
          borderRadius="2rem"
          onClick={() => navigate('/create-list')}
        >
          START YOUR OWN LIST
        </Button>
      </VStack>

      <Grid templateColumns="2fr 1fr" gap={6}>
        {/* Popular lists */}
        <GridItem colSpan={2}>
          <Category title="Popular lists" link="/lists/popular">
            <HStack>
              {mockUserLists.results
                .slice(0, 4)
                .map(({ list_id, name, posters, likes, username }) => (
                  <ListCard
                    title={name}
                    author={username}
                    posters={posters.map(p => p.media)}
                    list_id={list_id}
                    likes={likes}
                  />
                ))}
            </HStack>
          </Category>
        </GridItem>

        {/* Recent lists */}
        <GridItem>
          <Category title="Recent lists">
            <VStack gap={4} alignItems="flex-start">
              {mockUserLists.results.map(list => (
                <DetailedListCard
                  key={list.list_id}
                  {...list}
                  posters={list.posters.map(i => i.media)}
                />
              ))}
            </VStack>
          </Category>
        </GridItem>

        {/* TODO: Crew picks */}
        <GridItem>
          <Category title="Crew picks" />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Lists;

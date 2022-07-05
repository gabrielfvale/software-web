import { useNavigate } from 'react-router-dom';

import {
  Heading,
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
} from '@chakra-ui/react';
import Content from 'components/Content';
import Category from 'components/Category';
import ListCard from 'components/ListCard';
import DetailedListCard from 'components/DetailedListCard';
import { useEffect, useState } from 'react';
import useFetchData from 'hooks/fetchData';
import { getMoviePosters } from 'util/posters';

const Lists = () => {
  const navigate = useNavigate();
  const [popularLists, setPopularLists] = useState([]);
  const { data } = useFetchData('/list/popular');

  const fetchPopularPosters = async lists => {
    const newPopularLists = [];
    for (const list of lists) {
      const posters = await getMoviePosters(list.movies);
      newPopularLists.push({ ...list, posters });
    }
    setPopularLists([...newPopularLists]);
  };

  useEffect(() => {
    if (data) {
      fetchPopularPosters(data.results);
    }
  }, [data]);

  return (
    <Content>
      <VStack>
        <Heading size="md" fontWeight="medium">
          Collect, curate, and share. Lists are the perfect way to group films.
        </Heading>
        <Button
          size="sm"
          borderRadius="2rem"
          onClick={() => navigate('/lists/create')}
        >
          START YOUR OWN LIST
        </Button>
      </VStack>

      <Grid templateColumns="2fr 1fr" gap={6}>
        {/* Popular lists */}
        <GridItem colSpan={2}>
          <Category title="Popular lists" link="/lists/popular">
            <HStack>
              {popularLists
                .slice(0, 4)
                .map(({ list_id, name, posters, likes, username }) => (
                  <ListCard
                    key={list_id}
                    title={name}
                    author={username}
                    posters={posters}
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
              {popularLists.map(list => (
                <DetailedListCard
                  key={list.list_id}
                  {...list}
                  posters={list.posters}
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
    </Content>
  );
};

export default Lists;

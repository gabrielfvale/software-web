import { useEffect, useState } from 'react';
import { useUser } from 'providers/UserProvider';

import { Box, Text, HStack, Icon, Button } from '@chakra-ui/react';
import { AiFillEdit, AiFillHeart } from 'react-icons/ai';

import Content from 'components/Content';
import MovieGrid from 'components/MovieGrid';
import useFetchData from 'hooks/fetchData';
import { useParams } from 'react-router-dom';
import Link from 'components/Link';
import { getWord } from 'util/plural';
import api from 'services/api';

const ListById = () => {
  const { list_id } = useParams();
  const { data } = useFetchData(`/list/${list_id}`);
  const { user } = useUser();

  const [list, setList] = useState({});

  const fetchMovieDetails = async listData => {
    const movies = listData.movies.join(',');
    const { data } = await api.get(`/movie/many/${movies}`);
    setList({ ...listData, details: [...data] });
  };

  useEffect(() => {
    if (data) {
      fetchMovieDetails(data);
    }
  }, [data]);

  return (
    <Content>
      <Box
        bg="m180.darkBeige"
        borderRadius="base"
        padding="1rem"
        marginBottom="2rem"
      >
        <HStack justifyContent="space-between">
          <HStack gap="1rem">
            <Text fontWeight="medium">{list?.name}</Text>
            <HStack spacing={1}>
              <Icon as={AiFillHeart} color="m180.pink.500" />
              <Text fontSize="xs" fontWeight="medium">
                {list?.likes} {getWord('like', list?.likes)}
              </Text>
            </HStack>
          </HStack>
          {Number(user?.user_id) === Number(list?.user_id) && (
            <Button size="sm" mt="1rem" leftIcon={<AiFillEdit />}>
              Edit
            </Button>
          )}
        </HStack>
        <Text fontSize="sm">
          by{' '}
          <Link href={`/profile/${list?.username}`} fontWeight="bold">
            {list?.username}
          </Link>
        </Text>

        <Text fontSize="xs">{list?.description}</Text>
      </Box>
      <MovieGrid data={list?.details} />
      <Box flex={1} display="flex" justifyContent="flex-end"></Box>
    </Content>
  );
};

export default ListById;

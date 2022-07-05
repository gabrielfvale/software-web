import { useEffect, useState } from 'react';
import { useUser } from 'providers/UserProvider';

import {
  Box,
  Text,
  HStack,
  Icon,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
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
  const { user, authenticated } = useUser();
  const toast = useToast();

  const [list, setList] = useState({});
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchMovieDetails = async listData => {
    const movies = listData.movies.join(',');
    const { data } = await api.get(`/movie/many/${movies}`);
    setList({ ...listData, details: [...data] });
  };

  useEffect(() => {
    if (data) {
      fetchMovieDetails(data);
      setLikes(Number(data.likes));
      setLiked(data.liked_by_me);
    }
  }, [data]);

  const handleLike = async () => {
    try {
      await api.post('/list/like', { list_id });
      setLikes(prev => (liked ? prev - 1 : prev + 1));
      setLiked(value => !value);
    } catch (e) {
      toast({
        description: e.response.data.error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const isSameUser = Number(user.user_id) === Number(list?.user_id);

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
                {likes} {getWord('like', likes)}
              </Text>
            </HStack>
          </HStack>
          <HStack>
            {authenticated && !isSameUser && (
              <IconButton
                icon={<AiFillHeart />}
                size="sm"
                variant={liked ? 'solid' : 'ghost'}
                onClick={handleLike}
              />
            )}
            {Number(user?.user_id) === Number(list?.user_id) && (
              <Button size="sm" leftIcon={<AiFillEdit />}>
                Edit
              </Button>
            )}
          </HStack>
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

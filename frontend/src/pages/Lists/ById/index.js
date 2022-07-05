import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from 'providers/UserProvider';
import useFetchData from 'hooks/fetchData';

import api from 'services/api';
import { getWord } from 'util/plural';

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
import Link from 'components/Link';
import NotFound from 'pages/NotFound';
import { FaTrash } from 'react-icons/fa';

const ListById = () => {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const { data, error } = useFetchData(`/list/${list_id}`);
  const { user, authenticated } = useUser();
  const toast = useToast();

  const [list, setList] = useState(null);
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

  const handleDelete = async () => {
    let description = 'List deleted successfully';
    let status = 'success';
    try {
      await api.delete(`/list/${list_id}`);
      navigate(`/profile/${user.username}`);
    } catch (e) {
      description = e.response.data.error;
      status = 'error';
    }
    toast({
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
  };

  const isSameUser = Number(user.user_id) === Number(list?.user_id);

  if (error) {
    return <NotFound />;
  }

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
            {isSameUser && (
              <Button
                size="sm"
                leftIcon={<AiFillEdit />}
                onClick={() => navigate(`/lists/edit/?list_id=${list_id}`)}
              >
                Edit
              </Button>
            )}
            {(isSameUser || user?.admin) && (
              <IconButton icon={<FaTrash />} size="sm" onClick={handleDelete} />
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
      <MovieGrid data={list?.details} loading={!list} mockCount={8} />
    </Content>
  );
};

export default ListById;

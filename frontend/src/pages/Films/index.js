import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useDocumentTitle } from 'hooks/documentTitle';
import useFetchData from 'hooks/fetchData';
import { useUser } from 'providers/UserProvider';

import { VStack } from '@chakra-ui/react';
import Content from 'components/Content';
import MovieCard from 'components/MovieCard';
import ReviewMovie from 'components/ReviewMovie';
import ReviewBox from 'components/ReviewBox';
import api from 'services/api';

const Movie = () => {
  const { movie_id } = useParams();
  const toast = useToast();

  const setTitle = useDocumentTitle();
  const { data } = useFetchData(`/movie/${movie_id}`);
  const { data: reviews } = useFetchData(`/review/${movie_id}`);
  const { user, authenticated } = useUser();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data, setTitle]);

  const onSendReview = async values => {
    try {
      await api.post('/review', {
        movie_api_id: movie_id,
        ...values,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response.data.error,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Content>
      <MovieCard
        movie={data}
        isOnWatchList={data?.on_watch}
        isFavorite={data?.on_favorites}
      />
      <VStack
        gap={10}
        flexDir="column"
        alignItems="center"
        padding="2rem"
        marginTop="1rem"
        bg="m180.darkBeige"
        borderRadius="0.4rem"
      >
        {!data?.reviewed_by_me && (
          <ReviewBox authenticated={authenticated} onSend={onSendReview} />
        )}
        <ReviewMovie data={reviews?.results} user={user?.user_id || 1} />
      </VStack>
    </Content>
  );
};

export default Movie;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useDocumentTitle } from 'hooks/documentTitle';
import useFetchData from 'hooks/fetchData';
import { useUser } from 'providers/UserProvider';
import api from 'services/api';

import { VStack } from '@chakra-ui/react';
import Content from 'components/Content';
import MovieCard from 'components/MovieCard';
import ReviewMovie from 'components/ReviewMovie';
import ReviewBox from 'components/ReviewMovie/ReviewBox';

const Movie = () => {
  const { movie_id } = useParams();

  const [isOnWatch, setIsOnWatch] = useState(false);
  const [isOnFavorites, setIsOnFavorites] = useState(false);
  const [reviewedByMe, setReviewedByMe] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const toast = useToast();
  const setTitle = useDocumentTitle();
  const { data } = useFetchData(`/movie/${movie_id}`);
  const { data: reviews } = useFetchData(
    `/review/${movie_id}`,
    true,
    refreshCounter
  );
  const { user, authenticated } = useUser();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data, setTitle]);

  useEffect(() => {
    if (data) {
      setIsOnWatch(data.on_watch);
      setIsOnFavorites(data.on_favorites);
      setReviewedByMe(data.reviewed_by_me);
    }
  }, [data]);

  const onAddToSpecial = async list_type => {
    try {
      await api.post('/list/add-special', {
        list_type,
        movie_api_id: movie_id,
      });
      list_type === 'watch'
        ? setIsOnWatch(prev => !prev)
        : setIsOnFavorites(prev => !prev);
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response.data.error,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const onSendReview = async values => {
    try {
      await api.post('/review', {
        movie_api_id: movie_id,
        ...values,
      });
      setReviewedByMe(true);
      setRefreshCounter(prev => prev + 1);
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
        isOnWatchList={isOnWatch}
        isFavorite={isOnFavorites}
        onAddToWatchList={() => onAddToSpecial('watch')}
        onFavorite={() => onAddToSpecial('favorites')}
        loading={!data}
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
        {!reviewedByMe && (
          <ReviewBox
            authenticated={authenticated}
            loginRedirect={`/films/${movie_id}`}
            onSend={onSendReview}
          />
        )}
        <ReviewMovie data={reviews?.results} user={user?.user_id || 1} />
      </VStack>
    </Content>
  );
};

export default Movie;

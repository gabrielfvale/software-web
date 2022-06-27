import useFetchData from 'hooks/fetchData';
import { useDocumentTitle } from 'hooks/documentTitle';

import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import MovieCard from 'components/MovieCard';
import ReviewMovie from 'components/ReviewMovie';
import { useEffect } from 'react';
import { getUser } from 'services/auth';

const mockReviews = {
  page: 1,
  total_pages: 1,
  total_results: 1,
  results: [
    {
      review_id: 2,
      user_id: '1',
      movie_api_id: '526896',
      score: '2.4',
      description: 'The most movie of all time',
      created_at: '2022-06-25T09:09:41.827Z',
      updated_at: '2022-06-25T09:09:41.827Z',
      username: 'teste',
      comments: '0',
      likes: '1',
      liked_by_me: false,
    },
    {
      review_id: 3,
      user_id: '1',
      movie_api_id: '526896',
      score: '2.4',
      description: 'The most movie of all time',
      created_at: '2022-06-25T09:09:41.827Z',
      updated_at: '2022-06-25T09:09:41.827Z',
      username: 'teste',
      comments: '0',
      likes: '1',
      liked_by_me: false,
    },
  ],
};

const Movie = () => {
  const { movie_id } = useParams();
  const setTitle = useDocumentTitle();
  const { data } = useFetchData(`/movie/${movie_id}`);
  const user = getUser();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data, setTitle]);

  return (
    <VStack
      gap={2}
      flexDir="column"
      alignItems="center"
      paddingX="15rem"
      paddingY="1rem"
    >
      <MovieCard
        movie={data}
        isOnWatchList={data?.on_watch}
        isFavorite={data?.on_favorites}
      />
      <ReviewMovie data={mockReviews} user={user?.user_id || 1} />
    </VStack>
  );
};

export default Movie;

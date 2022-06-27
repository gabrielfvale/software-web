import { useFetchData } from 'hooks/fetchData';
import { useDocumentTitle } from 'hooks/documentTitle';

import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import MovieCard from 'components/MovieCard';
import ReviewMovie from 'components/ReviewMovie';

const Movie = () => {
  const { movie_id } = useParams();
  const setTitle = useDocumentTitle();
  const [data] = useFetchData(`/movie/${movie_id}`, data =>
    setTitle(data?.title)
  );

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
      <ReviewMovie />
    </VStack>
  );
};

export default Movie;

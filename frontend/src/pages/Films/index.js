import { useEffect, useState } from 'react';
import api from 'services/api';

import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import MovieCard from 'components/MovieCard';

const Movie = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await api.get(`/movie/${movie_id}`);
      console.log(data);
      setMovie({ ...data });
    };
    fetchMovie();
  }, []);

  return (
    <VStack
      gap={2}
      flexDir="column"
      alignItems="center"
      paddingX="15rem"
      paddingY="1rem"
    >
      <MovieCard
        movie={movie}
        isOnWatchList={movie?.on_watch}
        isFavorite={movie?.on_favorites}
      />
    </VStack>
  );
};

export default Movie;

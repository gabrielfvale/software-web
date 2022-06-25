import { Image, Box, HStack } from '@chakra-ui/react';
import Link from '../Link';

const PopularMoviesRow = ({ data = [] }) => {
  const modifiedData = data.slice(0, 6);
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  return (
    <HStack spacing="24px" paddingTop="5rem" paddingBottom="5rem">
      {modifiedData.map(movie => (
        <Box key={movie.id} flex="1">
          <Link href={`/movie/${movie.id}`}>
            <Image
              src={mediaUrl + 'w300' + movie.poster_path}
              alt={movie.title}
            />
          </Link>
        </Box>
      ))}
    </HStack>
  );
};

export default PopularMoviesRow;

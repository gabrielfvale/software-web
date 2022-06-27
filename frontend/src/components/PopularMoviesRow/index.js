import { Image, Box, HStack } from '@chakra-ui/react';
import ClickablePoster from '../ClickablePoster';
import Link from '../Link';

const PopularMoviesRow = ({ data = [] }) => {
  const modifiedData = data.slice(0, 6);
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  return (
    <HStack spacing="24px" paddingTop="5rem" paddingBottom="5rem">
      {modifiedData.map(({ id, title, poster_path }) => (
        <ClickablePoster
          key={id}
          movie_id={id}
          title={title}
          poster_path={poster_path}
        />
      ))}
    </HStack>
  );
};

export default PopularMoviesRow;

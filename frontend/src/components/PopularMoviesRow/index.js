import { HStack } from '@chakra-ui/react';
import ClickablePoster from '../ClickablePoster';

const PopularMoviesRow = ({ data = [] }) => {
  const modifiedData = data?.slice(0, 6);
  return (
    <HStack gap={2} marginY="5rem">
      {modifiedData.map(({ id, title, poster_path }) => (
        <ClickablePoster
          key={id}
          movie_id={id}
          title={title}
          poster_path={poster_path}
          overlay={false}
        />
      ))}
    </HStack>
  );
};

export default PopularMoviesRow;

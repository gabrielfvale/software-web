import { HStack } from '@chakra-ui/react';
import ClickablePoster from '../ClickablePoster';

const PopularMoviesRow = ({ data = [] }) => {
  const modifiedData = data.slice(0, 6);
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

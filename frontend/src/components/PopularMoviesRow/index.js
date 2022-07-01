import { Grid } from '@chakra-ui/react';
import ClickablePoster from '../ClickablePoster';

const PopularMoviesRow = ({ data = [], ...rest }) => {
  const modifiedData = data?.slice(0, 6);
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={2} {...rest}>
      {modifiedData.map(({ id, title, poster_path }) => (
        <ClickablePoster
          key={id}
          movie_id={id}
          title={title}
          poster_path={poster_path}
          overlay={false}
        />
      ))}
    </Grid>
  );
};

export default PopularMoviesRow;

import { Grid } from '@chakra-ui/react';
import ClickablePoster from '../ClickablePoster';

const PopularMoviesRow = ({ data = [], columns = 6, gap = 2, ...rest }) => {
  const modifiedData = data?.slice(0, columns);
  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={gap} {...rest}>
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

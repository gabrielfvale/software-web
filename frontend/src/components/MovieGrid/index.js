import React from 'react';
import { Grid, Image } from '@chakra-ui/react';

const MoviePosters = ({ data }) => {
  const renderMovieList = () => {
    return data.map(poster => (
      <Image src={poster.poster_path} alt={poster.id} key={poster.id} />
    ));
  };

  return (
    <Grid
      width="100%"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      sx={{
        '@media only screen and (max-width: 480px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media only screen and (min-width: 480px)': {
          gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media only screen and (min-width: 1920px)': {
          gridTemplateColumns: 'repeat(8, 1fr)',
        },
      }}
    >
      {renderMovieList()}
    </Grid>
  );
};

export default MoviePosters;

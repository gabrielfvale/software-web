import React, { useRef } from 'react';
import { Box, Flex, Image, useDimensions } from '@chakra-ui/react';

const MoviePosters = ({ data }) => {
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  const renderMovieList = () => {
    if (!dimensions) {
      return null;
    }

    const posterWidth = dimensions.contentBox.width / 6 - 7;

    return (
      <Flex gap={2} flexWrap="wrap">
        {data.map(poster => (
          <Image
            width={`${posterWidth}px`}
            src={poster.poster_path}
            alt={poster.id}
            key={poster.id}
          />
        ))}
      </Flex>
    );
  };

  return (
    <Box width={'100%'} ref={elementRef}>
      {renderMovieList()}
    </Box>
  );
};

export default MoviePosters;

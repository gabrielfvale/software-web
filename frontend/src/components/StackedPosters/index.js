import { useRef } from 'react';
import { Image, Box, useDimensions } from '@chakra-ui/react';

const StackedPosters = ({ posters = [] }) => {
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  const mediaUrl = process.env.REACT_APP_API_URL + '/media/';
  const w = 'w342';

  const maxImages = posters.length < 4 ? posters.length : 4;
  const iterableImages = posters.slice(0, maxImages);
  const imageWidth = 100;
  const imageAspectRatio = 300 / 445;
  const containerHeight = imageWidth / imageAspectRatio;

  const calcOffset = pos => {
    if (!dimensions) return 0;

    const width = dimensions.contentBox.width;
    const maxOffset = width - imageWidth;
    const offset = maxOffset / (maxImages - 1);

    return pos * offset;
  };

  return (
    <Box
      ref={elementRef}
      borderRadius="0.4rem"
      position="relative"
      height={containerHeight}
      overflow="hidden"
    >
      {iterableImages.map((src, index) => (
        <Image
          key={src + index}
          src={`${mediaUrl}${w}${src}`}
          width="100px"
          borderRadius="0.4rem"
          position="absolute"
          top="0"
          left={() => calcOffset(index)}
          boxShadow="-5px 0 5px 0 rgba(0,0,0,0.5);"
        />
      ))}
    </Box>
  );
};

export default StackedPosters;

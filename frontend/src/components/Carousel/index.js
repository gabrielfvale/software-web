import { Flex, Grid, HStack, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({
  count = 3,
  gap = 3,
  itemRenderer = () => {},
  showPrev = true,
  showNext = true,
  onPrev = () => {},
  onNext = () => {},
}) => {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      alignItems="center"
      pos="relative"
    >
      {showPrev && (
        <IconButton
          icon={<FaChevronLeft />}
          size="sm"
          pos="absolute"
          left="-1rem"
          zIndex={99}
          onClick={onPrev}
        />
      )}
      <Grid flex={1} templateColumns={`repeat(${count}, 1fr)`} gap={gap}>
        {itemRenderer()}
      </Grid>
      {showNext && (
        <IconButton
          icon={<FaChevronRight />}
          size="sm"
          pos="absolute"
          right="-1rem"
          onClick={onNext}
          zIndex={99}
        />
      )}
    </Flex>
  );
};

export default Carousel;

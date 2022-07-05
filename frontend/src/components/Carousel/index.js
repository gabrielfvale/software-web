import { Flex, Grid, HStack, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({
  count = 3,
  gap = 3,
  itemRenderer = () => {},
  prevDisabled = false,
  nextDisabled = false,
  onPrev = () => {},
  onNext = () => {},
  overflow = true,
}) => {
  const controlPos = overflow ? -8 : 0;
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      alignItems="center"
      pos="relative"
    >
      <IconButton
        icon={<FaChevronLeft />}
        size="sm"
        variant="ghost"
        pos="absolute"
        left={controlPos}
        zIndex={99}
        disabled={prevDisabled}
        onClick={onPrev}
      />
      <Grid flex={1} templateColumns={`repeat(${count}, 1fr)`} gap={gap}>
        {itemRenderer()}
      </Grid>
      <IconButton
        icon={<FaChevronRight />}
        size="sm"
        variant="ghost"
        pos="absolute"
        right={controlPos}
        zIndex={99}
        disabled={nextDisabled}
        onClick={onNext}
      />
    </Flex>
  );
};

export default Carousel;

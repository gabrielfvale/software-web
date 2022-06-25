import { useRef, useState, forwardRef } from 'react';
import { useDimensions } from '@chakra-ui/react';

import { Box, HStack, Icon } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Stars = forwardRef(
  (
    {
      displayOnly = true,
      total = 5,
      score = 0,
      isHovered = false,
      hoverActiveStar = -1,
      ...rest
    },
    ref
  ) => {
    return (
      <HStack
        ref={ref}
        pos="relative"
        cursor={displayOnly ? 'auto' : 'pointer'}
        {...rest}
      >
        {[...Array(total)].map((_, index) => {
          const activeState = isHovered ? hoverActiveStar : score;

          const showEmptyIcon = activeState === -1 || activeState < index + 1;

          const isActiveRating = activeState !== 1;
          const usingPrecision = activeState % 1 !== 0;
          const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
          const withPrecision =
            isActiveRating && usingPrecision && isRatingEqualToIndex;

          return (
            <Box
              key={index}
              pos="relative"
              cursor={displayOnly ? 'auto' : 'pointer'}
            >
              <Box
                w={withPrecision ? `${(activeState % 1) * 100}%` : '0%'}
                overflow="hidden"
                pos="absolute"
              >
                <Icon color="m180.darkPink" as={AiFillStar} />
              </Box>
              <Box>
                <Icon
                  color="m180.darkPink"
                  as={showEmptyIcon ? AiOutlineStar : AiFillStar}
                />
              </Box>
            </Box>
          );
        })}
      </HStack>
    );
  }
);

export const StarInput = ({
  score = -1,
  total = 5,
  precision = 0.5,
  onClick = () => {},
}) => {
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = e => {
    setIsHovered(false);
    onClick(calculateRating(e));
  };

  const handleMouseMove = e => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = () => {
    setHoverActiveStar(-1);
    setIsHovered(false);
  };

  const calculateRating = e => {
    if (!dimensions) return 0;

    const { width, left } = dimensions.contentBox;
    let percent = (e.clientX - left) / width;
    const numberInStars = percent * total;
    const nearestNumber =
      Math.round((numberInStars + precision / 2) / precision) * precision;
    return Number(
      nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0)
    );
  };

  return (
    <Stars
      ref={elementRef}
      displayOnly={false}
      total={total}
      score={score}
      isHovered={isHovered}
      hoverActiveStar={hoverActiveStar}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Stars;

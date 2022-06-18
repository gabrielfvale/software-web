import { HStack, Box, Text, Heading } from '@chakra-ui/react';
import {
  AiFillEye,
  AiFillHeart,
  AiOutlineUnorderedList,
  AiFillStar,
  AiFillCalendar,
} from 'react-icons/ai';
import { FaBoxes } from 'react-icons/fa';

const BasicGrid = () => {
  return (
    <Box paddingBottom="2rem">
      <Heading size="md">Filmit allows you to...</Heading>

      <Box>
        <HStack spacing="24px" paddingTop="1rem">
          <Box flex="1" bg="m180.darkBeige" borderRadius="0.3rem">
            <AiFillEye float="left" color="m180.purple" />

            <Text color="m180.navyBlue" fontSize="sm">
              Keep track of every film you’ve ever watched (or just start from
              the day you join)
            </Text>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <AiFillHeart color="m180.purple" />

            <Text color="m180.navyBlue" fontSize="sm">
              Show some love for your favorite films, lists and reviews with a
              “like”.
            </Text>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <AiOutlineUnorderedList color="m180.purple" />

            <Text color="m180.navyBlue" fontSize="sm">
              Write and share reviews, and review other reviews as well.
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box>
        <HStack spacing="24px" paddingTop="3rem">
          <Box flex="1" bg="m180.darkBeige">
            <AiFillStar color="m180.purple" />

            <Text color="m180.navyBlue" fontSize="sm">
              Rate each film on a five-star scale (with halves) to record and
              share your reaction.
            </Text>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <AiFillCalendar color="m180.purple" />

            <Text color="m180.navyBlue" fontSize="sm">
              Rate each film on a five-star scale (with halves) to record and
              share your reaction.
            </Text>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <FaBoxes color="m180.purple" />

            <Text color="m180.navyBlue" fontSize="sm">
              Compile and share lists of films on any topic and keep a watchlist
              of films to see
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default BasicGrid;

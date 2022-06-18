import {
  Link,
  Box,
  Flex,
  Image,
  Divider,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';

import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const ReviewGrid = () => {
  return (
    <Flex flexDirection="column">
      <HStack>
        <Heading size="md">Popular Reviews</Heading>
        <Link>
          <Text size="xs" color="m180.pink">
            More
          </Text>
        </Link>
      </HStack>

      <Divider marginTop="1rem" />
      <Box
        marginTop="1rem"
        marginBottom="1rem"
        w="65rem"
        h="10"
        bg="m180.darkBeige"
        display="flex"
      >
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
        <Heading as="h6" size="xs">
          Doctor Strange in the Multiverse of Madness 2022
        </Heading>
        <Text fontSize="xs">by: laura_petrola</Text>
        <AiFillStar></AiFillStar>
        <Text fontSize="xs">
          imagine making a multiverse movie and exploring 3 of the lamest
          dimensions
        </Text>
        <AiFillHeart></AiFillHeart>
        <Text fontSize="xs">4,944 likes</Text>
        <FaComment></FaComment>
        <Text fontSize="xs">44 comments</Text>
      </Box>
      <Divider />
      <Box
        marginTop="1rem"
        marginBottom="1rem"
        w="65rem"
        h="10"
        bg="m180.darkBeige"
        display="flex"
      >
        <Link>
          <Image></Image>
        </Link>
      </Box>
      <Divider />
      <Box
        marginTop="1rem"
        marginBottom="1rem"
        w="65rem"
        h="10"
        bg="m180.darkBeige"
        display="flex"
      >
        <Link>
          <Image></Image>
        </Link>
      </Box>
      <Divider />
      <Box
        marginTop="1rem"
        marginBottom="1rem"
        w="65rem"
        h="10"
        bg="m180.darkBeige"
        display="flex"
      >
        <Link>
          <Image></Image>
        </Link>
      </Box>
      <Divider />
    </Flex>
  );
};

export default ReviewGrid;

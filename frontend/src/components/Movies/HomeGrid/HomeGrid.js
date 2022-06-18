import { Link, Image, Text, Box, HStack } from '@chakra-ui/react';

const HomeGrid = () => {
  return (
    <HStack spacing="24px" paddingTop="5rem">
      <Box flex="1" bg="tomato">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1" bg="tomato">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1" bg="tomato">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1" bg="tomato">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1" bg="tomato">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1" bg="tomato">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
    </HStack>
  );
};

export default HomeGrid;

import { Link, Image, Box, HStack } from '@chakra-ui/react';

const HomeGrid = () => {
  return (
    <HStack spacing="24px" paddingTop="5rem" paddingBottom="5rem">
      <Box flex="1">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
      <Box flex="1">
        <Link>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Link>
      </Box>
    </HStack>
  );
};

export default HomeGrid;

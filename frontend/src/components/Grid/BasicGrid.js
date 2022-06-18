import { HStack, Box, Link, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const BasicGrid = () => {
  return (
    <Box>
      <Box>
        <HStack spacing="24px" paddingTop="5rem">
          <Box flex="1" bg="m180.darkBeige" borderRadius="0.3rem">
            <SearchIcon color="m180.purple" />
            <Text>Ola</Text>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <Link>
              <Text>Ola</Text>
            </Link>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <Link>
              <Text>Ola</Text>
            </Link>
          </Box>
        </HStack>
      </Box>
      <Box>
        <HStack spacing="24px" paddingTop="3rem">
          <Box flex="1" bg="m180.darkBeige">
            <Link>
              <Text>Ola</Text>
            </Link>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <Link>
              <Text>Ola</Text>
            </Link>
          </Box>
          <Box flex="1" bg="m180.darkBeige">
            <Link>
              <Text>Ola</Text>
            </Link>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default BasicGrid;

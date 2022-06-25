import { useState } from 'react';
import { HStack, Box, Heading, Divider, Text, Icon } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';

const filters = [
  'popularity.asc',
  'popularity.desc',
  'release_date.asc',
  'release_date.desc',
  'revenue.asc',
  'revenue.desc',
  'primary_release_date.asc',
  'primary_release_date.desc',
  'original_title.asc',
  'original_title.desc',
  'vote_average.asc',
  'vote_average.desc',
  'vote_count.asc',
  'vote_count.desc',
];

const FilteringHeader = ({ children }) => {
  const [category, setCategory] = useState('original_title');
  const [order, setOrder] = useState('asc');

  const handleSelectFilter = value => {
    console.log('value:', value);
  };

  return (
    <Box>
      <Box width="100%">
        <HStack justifyContent="space-between">
          <Heading size="sm" textTransform="uppercase" fontWeight="medium">
            Films
          </Heading>
          <HStack cursor="pointer">
            <HStack onClick={() => handleSelectFilter('original_title')}>
              <Text>Original Title</Text>
              <Icon as={AiFillHeart} color="m180.darkPink" />
            </HStack>
          </HStack>
        </HStack>
        <Divider color="darkBeige" />
      </Box>
      {children}
    </Box>
  );
};

export default FilteringHeader;

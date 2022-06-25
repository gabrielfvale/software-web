import { useState } from 'react';
import { HStack, Box, Heading, Divider } from '@chakra-ui/react';
import FilteringItem from '../FilteringItem';

const FilteringHeader = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState('original_title.desc');

  const handleSelectFilter = value => {
    setCurrentCategory(value);
  };

  return (
    <Box>
      <Box width="100%">
        <HStack justifyContent="space-between">
          <Heading size="sm" textTransform="uppercase" fontWeight="medium">
            Films
          </Heading>
          <HStack gap={2}>
            <FilteringItem
              title="Original Title"
              category="original_title"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
            <FilteringItem
              title="Popularity"
              category="popularity"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
            <FilteringItem
              title="Release Date"
              category="release_date"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
            <FilteringItem
              title="Revenue"
              category="revenue"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
            <FilteringItem
              title="Release Date"
              category="primary_release_date"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
            <FilteringItem
              title="Vote Average"
              category="vote_average"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
            <FilteringItem
              title="Vote Count"
              category="vote_count"
              currentCategory={currentCategory}
              onClick={handleSelectFilter}
            />
          </HStack>
        </HStack>
        <Divider color="darkBeige" />
      </Box>
      {children}
    </Box>
  );
};

export default FilteringHeader;

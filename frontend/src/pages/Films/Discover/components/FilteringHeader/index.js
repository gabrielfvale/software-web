import { useState } from 'react';
import { HStack, Heading, Divider, Select, Text } from '@chakra-ui/react';
import FilteringItem from '../FilteringItem';

const FilteringHeader = ({
  sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'release_date', label: 'Release date' },
  ],
  onSortBy = () => {},
  children,
}) => {
  const [order, setOrder] = useState('desc');

  return (
    <>
      <HStack width="100%" justifyContent="space-between">
        <Heading size="sm" textTransform="uppercase" fontWeight="medium">
          Films
        </Heading>
        <HStack>
          <Text fontSize="xs" whiteSpace="nowrap">
            Sort by
          </Text>
          <Select
            size="xs"
            borderRadius="0.4rem"
            variant="unstyled"
            onChange={e => onSortBy(`${e.target.value}.${order}`)}
            fontWeight="semibold"
          >
            {sortOptions?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label?.toUpperCase()}
              </option>
            ))}
          </Select>
          <FilteringItem order={order} onClick={setOrder} />
        </HStack>
      </HStack>
      <Divider color="darkBeige" />
      {children}
    </>
  );
};

export default FilteringHeader;

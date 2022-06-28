import { HStack, Text, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const FilteringItem = ({ order = 'desc', onClick }) => {
  return (
    <HStack
      cursor="pointer"
      onClick={() => onClick(order === 'asc' ? 'desc' : 'asc')}
      gap={0}
    >
      <Text fontWeight="semibold" fontSize="xs">
        {order === 'asc' ? 'ASCENDING' : 'DESCENDING'}
      </Text>
      <Icon
        fontWeight="semibold"
        as={order === 'desc' ? ChevronDownIcon : ChevronUpIcon}
        color="black"
      />
    </HStack>
  );
};

export default FilteringItem;

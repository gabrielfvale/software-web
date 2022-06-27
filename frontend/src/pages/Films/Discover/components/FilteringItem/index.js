import { useState } from 'react';
import { HStack, Text, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const FilteringItem = ({ category, title, onClick, currentCategory }) => {
  const [order, setOrder] = useState('desc');
  const isSelected = currentCategory.includes(category);

  const handleClick = () => {
    if (order === 'asc') {
      setOrder('desc');
    } else {
      setOrder('asc');
    }
    onClick(`${category}.${order}`);
  };

  return (
    <HStack cursor="pointer" onClick={handleClick} gap={0}>
      <Text fontWeight={isSelected ? 'bold' : 'medium'} fontSize="xs">
        {title}
      </Text>
      <Icon
        as={order === 'desc' ? ChevronDownIcon : ChevronUpIcon}
        color="m180.darkPink"
      />
    </HStack>
  );
};

export default FilteringItem;

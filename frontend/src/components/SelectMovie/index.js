import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  HStack,
  Input,
  MenuList,
  MenuItem,
  Image,
  Menu,
  MenuButton,
  VStack,
  Divider,
  StackDivider,
} from '@chakra-ui/react';
import Item from './Item';

const SelectMovie = ({
  data = [],
  query = '',
  onChange = () => {},
  onClick = () => {},
}) => {
  return (
    <Popover
      isOpen={data.length !== 0}
      closeOnBlur={false}
      isLazy
      lazyBehavior="keepMounted"
      matchWidth
    >
      <HStack>
        <PopoverAnchor>
          <Input
            value={query}
            size="md"
            padding="0.2rem"
            display="inline-flex"
            variant="unstyled"
            bg="white"
            onChange={onChange}
          />
        </PopoverAnchor>
      </HStack>

      <PopoverContent bg="white" width="100%">
        <VStack gap={0} alignItems="flex-start">
          {data.map(movie => (
            <Item key={movie.id} onClick={onClick} {...movie} />
          ))}
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default SelectMovie;

import { useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import Item from './Item';

const SelectMovie = ({
  data = [],
  query = '',
  isOpen = false,
  setOpen = () => {},
  onChange = () => {},
  onClick = () => {},
}) => {
  const initialFocusRef = useRef();

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      closeOnBlur={false}
      isLazy
      lazyBehavior="keepMounted"
      matchWidth
    >
      <HStack>
        <PopoverAnchor>
          <Input
            ref={initialFocusRef}
            value={query}
            size="md"
            padding="0.2rem"
            display="inline-flex"
            variant="unstyled"
            bg="white"
            onChange={onChange}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
          />
        </PopoverAnchor>
      </HStack>

      <PopoverContent
        bg="white"
        width="100%"
        _focus={{
          outline: 'none !important',
        }}
      >
        <VStack gap={0} alignItems="flex-start" maxH="20rem" overflowY="scroll">
          {data.map(movie => (
            <Item key={movie.id} onClick={onClick} {...movie} />
          ))}
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default SelectMovie;

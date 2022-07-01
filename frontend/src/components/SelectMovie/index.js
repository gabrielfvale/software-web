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
  onChange = () => {},
  onClick = () => {},
}) => {
  const initialFocusRef = useRef();

  return (
    <Popover
      initialFocusRef={initialFocusRef}
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
            ref={initialFocusRef}
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

import { useRef, useState } from 'react';
import {
  Button,
  IconButton,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({
  maxPagesShown = 3,
  page = 1,
  total_pages = 1,
  onClick = () => {},
}) => {
  const initialFocusRef = useRef();
  const [customPage, setCustomPage] = useState(maxPagesShown + 1);

  // Condition for previous and next buttons to be disabled
  const prevDisabled = page <= 1;
  const nextDisabled = page === total_pages;

  const maxPageCondition = total_pages <= maxPagesShown + 2;

  const iterableArr = maxPageCondition
    ? [...Array(total_pages)]
    : [...Array(maxPagesShown)];

  // Check if should render 1...[page-1] [page] [page+1]...[max]
  const onLeftBreakPoint = page > maxPagesShown;
  const onRightBreakPoint = page > maxPagesShown;

  const prevPage = () => onClick(page - 1);
  const nextPage = () => onClick(page + 1);
  const onCustomPage = () => {
    onClick(Number(customPage));
  };

  return (
    <HStack>
      <IconButton
        icon={<FaChevronLeft />}
        size="md"
        variant="ghost"
        disabled={prevDisabled}
        onClick={prevPage}
      />
      {iterableArr.map((_, index) => {
        const active = page === index + 1;
        return (
          <Button
            key={index + 1}
            size="md"
            variant="ghost"
            colorScheme={active ? 'gray' : 'm180.pink'}
            disabled={active}
            onClick={() => onClick(index + 1)}
          >
            {index + 1}
          </Button>
        );
      })}
      {!maxPageCondition && (
        <>
          <Popover initialFocusRef={initialFocusRef} placement="top">
            <PopoverTrigger>
              <Button size="md" variant="ghost">
                ...
              </Button>
            </PopoverTrigger>
            <PopoverContent w="100%">
              <PopoverBody>
                <HStack>
                  <NumberInput
                    min={1}
                    max={total_pages}
                    maxW={20}
                    size="sm"
                    value={customPage}
                    onChange={value => setCustomPage(value)}
                  >
                    <NumberInputField ref={initialFocusRef} />
                  </NumberInput>
                  <Button size="sm" onClick={onCustomPage}>
                    GO
                  </Button>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button
            size="md"
            variant="ghost"
            disabled={page === total_pages}
            onClick={() => onClick(total_pages)}
          >
            {total_pages}
          </Button>
        </>
      )}
      <IconButton
        icon={<FaChevronRight />}
        size="md"
        variant="ghost"
        disabled={nextDisabled}
        onClick={nextPage}
      />
    </HStack>
  );
};

export default Pagination;

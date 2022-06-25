import { useRef, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
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
import { usePagination } from '../../hooks/pagination';

const Pagination = ({
  page = 1,
  total_pages = 1,
  onClick = () => {},
  showGoTo = false,
}) => {
  const paginationRange = usePagination({ page, total_pages });

  // Custom page popover
  const [customPage, setCustomPage] = useState(1);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const initialFocusRef = useRef();

  if (page === 0 || paginationRange.length < 2) {
    return <></>;
  }

  // Condition for previous and next buttons to be disabled
  const prevDisabled = page <= 1;
  const nextDisabled = page === total_pages;

  // onClick functions
  const onPrev = () => onClick(page - 1);
  const onNext = () => onClick(page + 1);
  const onCustomPage = () => {
    onClick(Number(customPage));
    onToggle();
  };

  const renderPopover = () => (
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
    >
      <PopoverTrigger>
        <Button size="xs" onClick={onToggle}>
          Go to page
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
            <Button size="xs" variant="ghost" onClick={onCustomPage}>
              GO
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <HStack>
      <IconButton
        icon={<FaChevronLeft />}
        size="md"
        variant="ghost"
        disabled={prevDisabled}
        onClick={onPrev}
      />

      {paginationRange.map((currentPage, index) => {
        if (currentPage === 'dots') {
          return (
            <Button
              key={currentPage + index}
              size="md"
              variant="ghost"
              pointerEvents="none"
            >
              &#8230;
            </Button>
          );
        }

        const active = page === currentPage;

        return (
          <Button
            key={currentPage + index}
            size="md"
            variant="ghost"
            colorScheme={active ? 'gray' : 'm180.pink'}
            disabled={active}
            onClick={() => onClick(currentPage)}
          >
            {currentPage}
          </Button>
        );
      })}

      <IconButton
        icon={<FaChevronRight />}
        size="md"
        variant="ghost"
        disabled={nextDisabled}
        onClick={onNext}
      />
      {total_pages > 6 && showGoTo && renderPopover()}
    </HStack>
  );
};

export default Pagination;

/*
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
      */

import moment from 'moment';
import { HStack, Heading, Divider, Text } from '@chakra-ui/react';
import SortOrder from '../SortOrder';
import FilterSelect from '../FilterSelect';

const FilteringHeader = ({
  decades = 10,
  genreOptions = [],
  sortOptions = [],
  selectedDecade = '',
  selectedGenre = '',
  selectedSort = '',
  sortOrder = 'desc',
  onDecade = () => {},
  onGenre = () => {},
  onSortBy = () => {},
  onSortOrder = () => {},
}) => {
  const currentDecade = moment().year() - (moment().year() % 10);

  const yearsOptions = [...Array(decades)].map((_, index) => {
    const value = `${currentDecade - 10 * index}`;
    const label = value + 's';
    return {
      value,
      label,
    };
  });

  return (
    <>
      <HStack width="100%" justifyContent="space-between">
        <Heading size="sm" textTransform="uppercase" fontWeight="medium">
          Films
        </Heading>
        <HStack>
          {/* Decade */}
          <FilterSelect
            placeholder="decade"
            selected={selectedDecade}
            options={yearsOptions}
            onSelect={onDecade}
            showAll
          />
          {/* Genre */}
          <FilterSelect
            placeholder="genre"
            selected={selectedGenre}
            options={genreOptions}
            onSelect={onGenre}
            showAll
          />
          {/* Order */}
          <Text fontSize="xs" whiteSpace="nowrap">
            Sort by
          </Text>
          <FilterSelect
            selected={selectedSort}
            options={sortOptions}
            onSelect={onSortBy}
          />
          <SortOrder order={sortOrder} onClick={onSortOrder} />
        </HStack>
      </HStack>
      <Divider color="darkBeige" />
    </>
  );
};

export default FilteringHeader;

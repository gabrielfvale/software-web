import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';

const FilterSelect = ({
  placeholder = 'SELECT',
  selected = '',
  options = [],
  showAll = false,
  onSelect = () => {},
  ...rest
}) => {
  const displayText =
    (selected !== ''
      ? options.find(opt => selected === opt.value)?.label
      : placeholder) || placeholder;

  const StyledMenuItem = ({ value, label, ...props }) => (
    <MenuItem
      key={value}
      fontSize="sm"
      onClick={() => onSelect(value)}
      {...props}
    >
      {label}
    </MenuItem>
  );

  return (
    <Menu {...rest}>
      <MenuButton fontSize="xs" fontWeight="semibold">
        {displayText.toUpperCase()}
        <ChevronDownIcon fontWeight="semibold" />
      </MenuButton>
      <MenuList zIndex={3} padding={0} minW={0}>
        {showAll && (
          <>
            <StyledMenuItem value="" label="All" />
            <MenuDivider margin={0} />
          </>
        )}

        {options?.map(({ value, label }) => (
          <StyledMenuItem key={value} value={value} label={label} />
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterSelect;

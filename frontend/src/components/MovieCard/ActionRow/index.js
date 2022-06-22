import {
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { AiFillHeart } from 'react-icons/ai';

import { FaPlus, FaCheck, FaListUl } from 'react-icons/fa';

const ActionRow = ({
  lists = [],
  isOnWatchList,
  isFavorite,
  onAddToWatchList,
  onAddToList,
  onFavorite,
  onCreateList,
  onMoreLists,
}) => {
  const iterableLists = lists.slice(0, 4);
  return (
    <HStack>
      <Button
        size="sm"
        leftIcon={<Icon as={isOnWatchList ? FaCheck : FaPlus} />}
        colorScheme="m180.white"
        color="m180.pink.400"
        onClick={onAddToWatchList}
      >
        Wanna watch
      </Button>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<Icon as={FaListUl} />}
          size="sm"
          colorScheme="m180.white"
          color="m180.pink.400"
        >
          Add to list
        </MenuButton>
        <MenuList>
          {iterableLists.map(list => (
            <MenuItem
              onClick={() => onAddToList(list.list_id)}
              command={list.movies.length}
            >
              {list.name}
            </MenuItem>
          ))}
          {iterableLists.length < 4 ? (
            <MenuItem icon={<Icon as={FaPlus} />} onClick={onCreateList}>
              New list
            </MenuItem>
          ) : (
            <>
              <MenuDivider />
              <MenuItem icon={<ExternalLinkIcon />} onClick={onMoreLists}>
                Add to another list
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <Button
        size="sm"
        leftIcon={<Icon as={AiFillHeart} />}
        colorScheme={isFavorite ? 'm180.pink' : 'm180.white'}
        color={isFavorite ? 'white' : 'm180.pink.400'}
        onClick={onFavorite}
      >
        Favorite
      </Button>
    </HStack>
  );
};

export default ActionRow;

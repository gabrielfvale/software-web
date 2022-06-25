import { Box, LinkBox, HStack, Text, Icon } from '@chakra-ui/react';
import Link from '../Link';
import { AiFillHeart } from 'react-icons/ai';
import StackedPosters from '../StackedPosters';

const ListCard = ({
  list_id = -1,
  title = '',
  likes = 0,
  author = '',
  posters = [],
  ...rest
}) => {
  return (
    <Box
      backgroundColor="m180.darkBeige"
      padding="0.5rem"
      borderRadius="0.4rem"
      minWidth="15rem"
      {...rest}
    >
      <LinkBox as={Link} href={`/lists/${list_id}`}>
        <StackedPosters posters={posters} />
        <Text fontWeight="medium">{title}</Text>
      </LinkBox>

      <HStack>
        {author && (
          <Text fontSize="xs">
            by{' '}
            <Link href={`/profile/${author}`} fontWeight="semibold">
              {author}
            </Link>
          </Text>
        )}
        <Icon as={AiFillHeart} color="m180.pink.600" />
        <Text fontSize="xs">
          {likes} like{Number(likes) === 1 ? '' : 's'}
        </Text>
      </HStack>
    </Box>
  );
};

export default ListCard;

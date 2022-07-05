import { HStack, Box, VStack, Heading, Text, Icon } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import StackedPosters from '../StackedPosters';
import Link from '../Link';
import { getWord } from 'util/plural';

const DetailedListCard = ({
  list_id = -1,
  name = '',
  username = '',
  movies = [],
  likes = 0,
  description = '',
  posters = [],
  ...rest
}) => {
  return (
    <HStack
      backgroundColor="m180.darkBeige"
      padding="0.5rem"
      borderRadius="0.4rem"
      alignItems="flex-start"
      w="full"
      {...rest}
    >
      <Box
        minW="15rem"
        sx={{
          '@media (min-width: 1200px)': {
            minW: '20rem',
          },
        }}
      >
        <StackedPosters posters={posters} />
      </Box>
      <VStack alignItems="flex-start" padding="0.5rem">
        <Box>
          <Link href={`/lists/${list_id}`}>
            <Heading size="md">{name}</Heading>
          </Link>
          <HStack>
            <Text fontSize="sm">
              by{' '}
              <Link href={`/profile/${username}`} fontWeight="semibold">
                {username}
              </Link>
            </Text>

            <Text fontSize="xs" color="gray.600">
              {movies.length} {getWord('film', movies.length)}
            </Text>
            <Text fontSize="xs" color="gray.600">
              <Icon as={AiFillHeart} /> {likes} {getWord('like', likes)}
            </Text>
          </HStack>
        </Box>

        <Text noOfLines={3}>{description}</Text>
      </VStack>
    </HStack>
  );
};

export default DetailedListCard;

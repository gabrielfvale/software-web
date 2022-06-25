import { LinkBox, HStack, Text, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import StackedPosters from '../StackedPosters';

const ListCard = ({
  title = '',
  movies = [],
  likes = 0,
  redirect = '',
  ...rest
}) => {
  const moviePosters = movies.map(movie => movie.poster_path);
  return (
    <LinkBox
      as={Link}
      to={redirect}
      backgroundColor="m180.darkBeige"
      padding="0.5rem"
      borderRadius="0.4rem"
      width="20rem"
      minWidth="15rem"
      {...rest}
    >
      <StackedPosters posters={moviePosters} />
      <Text fontWeight="medium">{title}</Text>
      <HStack>
        <Icon as={AiFillHeart} color="m180.pink.500" />
        <Text fontSize="xs" fontWeight="medium">
          {likes} likes
        </Text>
      </HStack>
    </LinkBox>
  );
};

export default ListCard;

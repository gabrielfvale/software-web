import { LinkBox, Flex, Image, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;

const ClickablePoster = ({
  movie_id = -1,
  title = '',
  poster_path = '',
  w = 'w342',
  ...rest
}) => {
  return (
    <LinkBox
      as={Link}
      to={`/films/${movie_id}`}
      pos="relative"
      _hover={{
        '#title-container': {
          opacity: 1,
        },
      }}
      {...rest}
    >
      <Image src={`${mediaUrl}${w}${poster_path}`} alt={movie_id} />
      <Flex
        id="title-container"
        pos="absolute"
        top="0"
        zIndex={2}
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        bg="rgba(0,0,0,0.4)"
        opacity="0"
        padding="0.5rem"
        transition="all 0.3s ease-in-out"
      >
        <Heading size="md" w="100%" textAlign="center" color="white">
          {title}
        </Heading>
      </Flex>
    </LinkBox>
  );
};

export default ClickablePoster;

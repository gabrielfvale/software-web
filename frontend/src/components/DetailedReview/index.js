import { Box, Link, Image, Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import Stars from '../Stars';

const DetailedReview = ({ review, ...rest }) => {
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;

  const {
    score,
    movie_api_id,
    poster_path,
    title,
    release_date,
    username,
    description,
    likes,
    comments,
  } = review;

  return (
    <Flex padding="1rem" gap="1rem" width="100%" {...rest}>
      <Box>
        <Link href={`/movie/${movie_api_id}`}>
          <Image
            width="95px"
            height="141px"
            src={mediaUrl + 'w300' + poster_path}
            alt={title}
          ></Image>
        </Link>
      </Box>
      <Box>
        <Flex flexDirection="row" alignItems="center">
          <Link href={`/movie/${movie_api_id}`}>
            <Heading size="md" marginRight="0.5rem">
              {title}
            </Heading>
          </Link>
          <Heading size="xs" marginTop="0.2rem">
            {release_date}
          </Heading>
        </Flex>
        <Flex flexDirection="row">
          <Text fontSize="xs" marginRight="0.5rem">
            by {username}
          </Text>
          <Stars score={Number(score)} />
        </Flex>

        <Text fontSize="sm" marginTop="1.5rem">
          {description}
        </Text>
        <Flex flexDirection="row">
          <Flex marginTop="2.4rem" flexDirection="row">
            <Link display="flex">
              <Icon as={AiFillHeart} color="m180.darkPink" />
              <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                {likes} likes
              </Text>
            </Link>

            <Link display="flex">
              <Icon as={FaComment} color="m180.darkPink" />
              <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                {comments} comments
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DetailedReview;

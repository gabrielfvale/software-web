import { Box, Link, Image, Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const DetailedReview = ({ review }) => {
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  return (
    <Flex padding="1rem" gap="1rem" width="100%">
      <Box>
        <Link href={`/movie/${review.movie_api_id}`}>
          <Image
            width="95px"
            height="141px"
            src={mediaUrl + 'w300' + review.poster_path}
            alt={review.title}
          ></Image>
        </Link>
      </Box>
      <Box>
        <Flex flexDirection="row" alignItems="center">
          <Link href={`/movie/${review.movie_api_id}`}>
            <Heading size="md" marginRight="0.5rem">
              {review.title}
            </Heading>
          </Link>
          <Heading size="xs" marginTop="0.2rem">
            {review.release_date}
          </Heading>
        </Flex>
        <Flex flexDirection="row">
          <Text fontSize="xs" marginRight="0.5rem">
            by {review.username}
          </Text>
          <Icon as={AiFillStar} color="m180.darkPink" />
        </Flex>

        <Text fontSize="sm" marginTop="1.5rem">
          {review.description}
        </Text>
        <Flex flexDirection="row">
          <Flex marginTop="2.4rem" flexDirection="row">
            <Link display="flex">
              <Icon as={AiFillHeart} color="m180.darkPink" />
              <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                {review.likes} likes
              </Text>
            </Link>

            <Link display="flex">
              <Icon as={FaComment} color="m180.darkPink" />
              <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                {review.comments} comments
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DetailedReview;

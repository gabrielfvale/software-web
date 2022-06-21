import moment from 'moment';
import {
  Box,
  StackDivider,
  Link,
  Image,
  Heading,
  VStack,
  Flex,
  Text,
  Icon,
} from '@chakra-ui/react';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const DetailedReview = ({ data = [] }) => {
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  return (
    <Flex
      divider={<StackDivider borderColor="darkBeige" />}
      paddingTop="5rem"
      paddingBottom="5rem"
    >
      <VStack divider={<StackDivider borderColor="darkBeige" />} spacing={4}>
        {data.map(review => {
          review.release_date = moment(review.release_date).format('YYYY');
          return (
            <Flex
              key={review.review_id}
              padding="1rem"
              justifyContent="space-between"
              gap="1rem"
            >
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
                    <Link>
                      <Icon as={AiFillHeart} color="m180.darkPink" />
                    </Link>
                    <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                      {review.likes} likes
                    </Text>

                    <Link display="flex">
                      <Icon as={FaComment} color="m180.darkPink" />
                      <Text
                        marginLeft="0.2rem"
                        marginRight="2rem"
                        fontSize="xs"
                      >
                        {review.comments} comments
                      </Text>
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Flex>
  );
};

export default DetailedReview;

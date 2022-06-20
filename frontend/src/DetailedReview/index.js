import {
  Box,
  StackDivider,
  Link,
  Image,
  Heading,
  VStack,
  Flex,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineComment, AiFillStar } from 'react-icons/ai';

const DetailedReview = ({ data = [] }) => {
  const theme = useTheme();
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  return (
    <Flex
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      paddingTop="5rem"
      paddingBottom="5rem"
      display="flex"
      alignItems="center"
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {data.map(review => {
          return (
            <Box
              key={review.review_id}
              padding="1rem"
              display="flex"
              justifyContent="space-between"
              gap="1rem"
            >
              <Box>
                <Link href={`/review/${review.id}`}>
                  <Image
                    width="95px"
                    height="141px"
                    src={mediaUrl + 'w300' + review.poster_path}
                    alt={review.title}
                  ></Image>
                </Link>
              </Box>
              <Box>
                <Box display="flex" flexDirection="row">
                  <Heading size="md" marginRight="0.5rem">
                    {review.title}
                  </Heading>
                  <Heading size="sm" marginTop="0.2rem">
                    {review.release_date}
                  </Heading>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Text fontSize="xs" marginRight="0.5rem">
                    by {review.username}
                  </Text>
                  <AiFillStar
                    color={theme.colors.m180.darkPink}
                    padding="0.5rem"
                  ></AiFillStar>
                </Box>

                <Text fontSize="sm" marginTop="1.5rem">
                  {review.description}
                </Text>
                <Box display="flex" flexDirection="row">
                  <Box marginTop="2.4rem" display="flex" flexDirection="row">
                    <Link>
                      <AiFillHeart
                        color={theme.colors.m180.darkPink}
                      ></AiFillHeart>
                    </Link>

                    <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                      {review.likes} likes
                    </Text>
                    <Link>
                      <AiOutlineComment
                        color={theme.colors.m180.darkPink}
                      ></AiOutlineComment>
                    </Link>

                    <Text marginLeft="0.2rem" marginRight="2rem" fontSize="xs">
                      {review.likes} likes
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </VStack>
    </Flex>
  );
};

export default DetailedReview;

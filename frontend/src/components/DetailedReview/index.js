import { Box, Heading, Text, Icon, HStack, VStack } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import Stars from '../Stars';
import Link from '../Link';
import ClickablePoster from 'components/ClickablePoster';

import { getWord } from 'util/plural';
import { numberFormatter } from 'util/numbers';

const DetailedReview = ({ review, ...rest }) => {
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
    <HStack gap="0.5rem" w="100%" {...rest} alignItems="stretch">
      <Box w={130}>
        <ClickablePoster
          movie_id={movie_api_id}
          poster_path={poster_path}
          overlay={false}
        />
      </Box>
      <VStack alignItems="flex-start" justifyContent="space-between" w="100%">
        <Box>
          <HStack>
            <Link href={`/films/${movie_api_id}`}>
              <Heading size="md">{title}</Heading>
            </Link>
            <Heading size="xs">{release_date}</Heading>
          </HStack>
          <HStack>
            <Text fontSize="xs">
              by{' '}
              <Link href={`/profile/${username}`} fontWeight="semibold">
                {username}
              </Link>
            </Text>
            <Stars score={Number(score)} />
          </HStack>
          <Text fontSize="sm" noOfLines={3}>
            {description}
          </Text>
        </Box>

        <HStack justifySelf="flex-end">
          <HStack>
            <Icon as={AiFillHeart} color="m180.darkPink" />
            <Text fontSize="xs">
              {numberFormatter(likes)} {getWord('like', likes)}
            </Text>
          </HStack>

          <HStack>
            <Icon as={FaComment} color="m180.darkPink" />
            <Text fontSize="xs">
              {numberFormatter(comments)} {getWord('comment', comments)}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default DetailedReview;

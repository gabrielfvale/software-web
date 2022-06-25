import moment from 'moment';
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Tag,
  HStack,
  Divider,
  VStack,
  Avatar,
} from '@chakra-ui/react';

import ActionRow from './ActionRow';
const MovieCard = ({
  movie,
  lists = [],
  isOnWatchList = false,
  isFavorite = false,
  onAddToWatchList = () => {},
  onAddToList = () => {},
  onFavorite = () => {},
  onCreateList = () => {},
  onMoreLists = () => {},
}) => {
  const {
    score,
    backdrop_path,
    poster_path,
    title,
    tagline,
    overview,
    release_date,
    runtime,
    genres,
    cast,
  } = movie;

  const actionRowProps = {
    lists,
    isOnWatchList,
    isFavorite,
    onAddToWatchList,
    onAddToList,
    onFavorite,
    onCreateList,
    onMoreLists,
  };

  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  const release_year = moment(release_date).format('YYYY');
  const formattedScore = Number(score).toFixed(1);

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="1fr 4fr"
      gap={8}
      paddingX={12}
      paddingY={8}
      bg="m180.darkBeige"
      borderRadius="0.4rem"
      backgroundImage={`linear-gradient(to bottom, rgba(0,0,0,0.3) 50%, rgba(235, 232, 226, 1) 50%), url(${mediaUrl}w1280${backdrop_path})`}
    >
      <GridItem
        rowSpan={2}
        display="flex"
        flexDir="column"
        justifyContent="center"
        gap={4}
      >
        <Image src={`${mediaUrl}w342${poster_path}`} borderRadius="0.4rem" />
        <Flex gap={2} flexWrap="wrap">
          {genres.map(genre => (
            <Tag key={genre.id} bg="m180.pink.500" color="white">
              {genre.name}
            </Tag>
          ))}
        </Flex>
      </GridItem>

      <GridItem display="flex" justifyContent="space-between">
        <Flex flexDir="column" justifyContent="space-between">
          <Box>
            <HStack>
              <Heading color="white">{title}</Heading>
              <Text color="white">{release_year}</Text>
            </HStack>
            <Text color="white" fontStyle="italic">
              {tagline}
            </Text>
          </Box>
          <ActionRow {...actionRowProps} />
        </Flex>
        <Box>
          <HStack
            bgGradient="linear(to-r, m180.beige 50%, m180.darkBeige 100%)"
            borderRadius="0.4rem"
            padding="2"
            height={16}
            divider={
              <Divider orientation="vertical" borderColor="m180.navyBlue.300" />
            }
          >
            <Flex flex={1} flexDir="column" alignItems="center">
              <Heading size="md" fontWeight="semibold">
                USER
              </Heading>
              <Heading size="md" fontWeight="semibold">
                SCORE
              </Heading>
            </Flex>
            <Flex flex={1} justifyContent="center">
              <Heading size="lg" fontWeight="semibold">
                {formattedScore}
              </Heading>
            </Flex>
          </HStack>
        </Box>
      </GridItem>

      <GridItem padding={1}>
        <Flex gap={2}>
          <Box flex={2}>
            <HStack marginBottom={2}>
              <Heading size="sm" fontWeight="semibold">
                OVERVIEW
              </Heading>
              <Text fontSize="xs" fontWeight="medium">
                {runtime}min
              </Text>
            </HStack>

            <Text>{overview}</Text>
          </Box>
          <Box flex={0.6}>
            <Heading size="sm" fontWeight="semibold" marginBottom={2}>
              MAIN CAST
            </Heading>
            <VStack alignItems="flex-start">
              {cast.map(person => (
                <HStack key={person.name}>
                  <Avatar
                    name={person.name}
                    src={`${mediaUrl}w185${person.profile_path}`}
                  />
                  <Text>{person.name}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default MovieCard;

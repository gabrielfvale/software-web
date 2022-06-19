import { Grid, GridItem, Box, Text, Heading, useTheme } from '@chakra-ui/react';
import {
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineEdit,
  AiOutlineStar,
  AiOutlineCalendar,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

const HomeCards = () => {
  const theme = useTheme();
  const cards = [
    {
      text: 'Keep track of every film you’ve ever watched (or just start from the day you join)',
      icon: AiOutlineEye,
    },
    {
      text: 'Show some love for your favorite films, lists and reviews with a “like”.',
      icon: AiOutlineHeart,
    },
    {
      text: 'Write and share reviews, and review other reviews as well.',
      icon: AiOutlineEdit,
    },
    {
      text: 'Rate each film on a five-star scale (with halves) to record and share your reaction.',
      icon: AiOutlineStar,
    },
    {
      text: 'Keep a diary of your film watching.',
      icon: AiOutlineCalendar,
    },
    {
      text: 'Compile and share lists of films on any topic and keep a watchlist of films to see',
      icon: AiOutlineUnorderedList,
    },
  ];
  return (
    <Box paddingBottom="2rem">
      <Heading size="md">Filmit allows you to...</Heading>

      <Box>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          {cards.map((card, index) => (
            <GridItem
              key={index}
              bg="m180.darkBeige"
              borderRadius="0.3rem"
              padding="1rem"
              display="flex"
              alignItems="center"
              gap="1rem"
            >
              <card.icon size="2.5rem" color={theme.colors.m180.navyBlue} />

              <Text color="m180.navyBlue" fontSize="sm" flex="1">
                {card.text}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeCards;

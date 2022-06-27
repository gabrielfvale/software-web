import { Image, Box, Heading, Button, Flex } from '@chakra-ui/react';

import React from 'react';

const Hero = ({ backdrop, action }) => {
  const mediaUrl = process.env.REACT_APP_TMDB_MEDIA_URL;
  const w = 'w1280';

  return (
    <Box position="relative">
      <Image width="100%" src={`${mediaUrl}${w}${backdrop}`} />
      <Flex
        position="absolute"
        top="0"
        left="0"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        flexDirection="column"
        backgroundColor="rgba(0,0,0,0.30)"
      >
        <Box>
          <Heading
            size="xl"
            textAlign="center"
            paddingBottom="2rem"
            color="white"
          >
            Track films you’ve watched.
          </Heading>
          <Heading
            size="lg"
            textAlign="center"
            paddingBottom="4rem"
            color="white"
          >
            Save those you want to see.
          </Heading>
        </Box>

        <Button
          display="block"
          marginX="auto"
          borderRadius="2rem"
          onClick={action}
        >
          GET STARTED RIGHT NOW!
        </Button>
      </Flex>
    </Box>
  );
};
export default Hero;

import { Image, Box, Heading, Button, Flex } from '@chakra-ui/react';

const Hero = ({ src }) => {
  return (
    <Box position="relative">
      <Image width="100%" src={src} />
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
          marginLeft="auto"
          marginRight="auto"
          colorScheme="m180.pink"
          size="lg"
          width="20rem"
          borderRadius="2rem"
        >
          GET STARTED RIGHT NOW!
        </Button>
      </Flex>
    </Box>
  );
};
export default Hero;

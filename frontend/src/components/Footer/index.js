import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      width="100%"
      height={'8rem'}
      paddingX="15rem"
      paddingY="1rem"
      bg="m180.darkBeige"
    >
      <Box display="flex">
        <Text fontSize={'xs'} color={'m180.darkPink'} marginRight="1rem">
          About
        </Text>
        <Text fontSize={'xs'} color={'m180.darkPink'} marginRight="1rem">
          Help
        </Text>
        <Text fontSize={'xs'} color={'m180.darkPink'} marginRight="1rem">
          Terms
        </Text>
        <Text fontSize={'xs'} color={'m180.darkPink'} marginRight="1rem">
          Contact
        </Text>
      </Box>
      <Text fontSize={'xx-small'}>Contact</Text>
    </Box>
  );
};

export default Footer;

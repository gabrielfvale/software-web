import { Image } from '@chakra-ui/react';

const Hero = ({ src }) => {
  return <Image width="100%" top="-5rem" zIndex="-1" src={src} />;
};

export default Hero;

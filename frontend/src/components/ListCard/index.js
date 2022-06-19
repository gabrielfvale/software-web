import { Box, Image, Text } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';

const ListCard = ({ imageUrl, title, likes }) => {
  return (
    <Box
      flex={1}
      backgroundColor="m180.darkBeige"
      marginX="1rem"
      padding="0.5rem"
      borderRadius="0.4rem"
    >
      <Image
        src={imageUrl}
        borderRadius="0.4rem"
        width="100%"
        height="10rem"
        objectFit={'cover'}
      />
      <Text fontWeight={'medium'}>{title}</Text>
      <Text fontSize={'xs'} fontWeight={'medium'}>
        <AiFillHeart /> {likes} likes
      </Text>
    </Box>
  );
};

export default ListCard;

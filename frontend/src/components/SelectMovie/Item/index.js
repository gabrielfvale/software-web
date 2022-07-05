import { HStack, Image, Text, LinkBox, Box } from '@chakra-ui/react';
import moment from 'moment';

const Item = ({
  id = '',
  title = '',
  poster_path = '',
  release_date = '',
  onClick = () => {},
  ...rest
}) => {
  const mediaUrl = process.env.REACT_APP_API_URL + '/media/w92';
  const formatted_date = moment(release_date).format('YYYY');

  return (
    <LinkBox
      cursor="pointer"
      _hover={{ bg: 'rgba(0,0,0,0.2)' }}
      w="100%"
      padding={1}
      bg="transparent"
      transition="all 0.2s ease-in-out"
      {...rest}
      onClick={() => onClick({ id, title, poster_path, release_date })}
    >
      <HStack>
        <Image
          w="40px"
          src={`${mediaUrl}${poster_path}`}
          alt={title}
          fallback={<></>}
        />
        <Text fontSize="sm" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="xs">{formatted_date}</Text>
      </HStack>
    </LinkBox>
  );
};

export default Item;

import { Box, Text, useTheme } from '@chakra-ui/react';
import MyListCard from '../MyListCard';

const MyLists = ({ lists }) => {
  const theme = useTheme();

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        borderBottomColor={theme.colors.m180.darkBeige}
        borderBottomWidth={1}
        paddingBottom={'0.5rem'}
        marginBottom={'1rem'}
      >
        <Text fontSize="sm">My lists</Text>
        <Text fontSize="sm" color={'m180.darkPink'}>
          More
        </Text>
      </Box>
      <Box display="flex" justifyContent={'space-between'}>
        {lists.map(item => (
          <MyListCard
            imageUrl={item.image_url}
            likesAmount={item.likes_amount}
            title={item.title}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MyLists;

import { Box, Text, Button } from '@chakra-ui/react';

const ProfileHeader = ({ user }) => {
  return (
    <Box display={'flex'} justifyContent="space-between">
      <Box width="50%">
        <Box marginBottom="1" display="flex" alignItems="center">
          <Text fontWeight="medium">{user.name}</Text>
          <Box marginLeft={2}>
            <Button
              h="1.75rem"
              fontSize="sm"
              fontWeight="medium"
              colorScheme="m180.pink"
            >
              EDIT PROFILE
            </Button>
          </Box>
        </Box>
        <Box marginBottom="1">
          <Text fontSize="xs" fontWeight="medium">
            {user.location}
          </Text>
        </Box>
        <Text fontSize="xs">{user.description}</Text>
      </Box>
      <Box display={'flex'}>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          paddingX="1rem"
        >
          <Text fontWeight="medium">{user.film_data.lists}</Text>
          <Text fontWeight="medium">LISTS</Text>
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          paddingX="1rem"
        >
          <Text fontWeight="medium">{user.film_data.films_this_year}</Text>
          <Text fontWeight="medium">THIS YEAR</Text>
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          paddingX="1rem"
        >
          <Text fontWeight="medium">{user.film_data.films_total}</Text>
          <Text fontWeight="medium">FILMS</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;

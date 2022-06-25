import { Box, Text, Button, LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box width="50%">
        <Box marginBottom="1" display="flex" alignItems="center">
          <Text fontWeight="medium">
            {user.first_name} {user.last_name}
          </Text>
          <Box marginLeft={2}>
            <LinkBox to={'/accountSettings'} as={Link}>
              <Button
                h="1.75rem"
                fontSize="sm"
                fontWeight="medium"
                colorScheme="m180.pink"
              >
                EDIT PROFILE
              </Button>
            </LinkBox>
          </Box>
        </Box>
        <Box marginBottom="1">
          <Text fontSize="xs" fontWeight="medium">
            {user.country}
          </Text>
        </Box>
        <Text fontSize="xs">{user.bio}</Text>
      </Box>
      <Box display={'flex'}>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          paddingX="1rem"
        >
          <Text fontWeight="medium">{user.stats.lists_created}</Text>
          <Text fontWeight="medium">LISTS</Text>
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          paddingX="1rem"
        >
          <Text fontWeight="medium">{user.stats.movies_reviewed}</Text>
          <Text fontWeight="medium">REVIEWED</Text>
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          paddingX="1rem"
        >
          <Text fontWeight="medium">{user.stats.likes_received}</Text>
          <Text fontWeight="medium">LIKES</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;

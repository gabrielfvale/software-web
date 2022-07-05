import { Box, Text, Button, HStack, VStack } from '@chakra-ui/react';
import Link from 'components/Link';
import { useUser } from 'providers/UserProvider';
import { AiFillEdit } from 'react-icons/ai';

const ProfileHeader = ({ user }) => {
  const { user: authUser, authenticated } = useUser();

  return (
    <HStack justifyContent="space-between" gap="5rem">
      <Box>
        <HStack>
          <Text fontWeight="medium">
            {user.first_name} {user.last_name}
          </Text>
          {authenticated && authUser.username === user.username && (
            <Link
              href={`/profile/${user.username}/settings`}
              _hover={{ textDecoration: 'none' }}
            >
              <Button size="sm" leftIcon={<AiFillEdit />}>
                Edit
              </Button>
            </Link>
          )}
        </HStack>
        <Text fontSize="sm">{user.bio}</Text>
      </Box>
      <HStack gap={4}>
        <VStack>
          <Text fontWeight="medium">{user.stats.lists_created}</Text>
          <Text fontWeight="medium">LISTS</Text>
        </VStack>
        <VStack>
          <Text fontWeight="medium">{user.stats.movies_reviewed}</Text>
          <Text fontWeight="medium">REVIEWED</Text>
        </VStack>
        <VStack>
          <Text fontWeight="medium">{user.stats.likes_received}</Text>
          <Text fontWeight="medium">LIKES</Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default ProfileHeader;

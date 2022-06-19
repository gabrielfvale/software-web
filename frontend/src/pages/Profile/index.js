import { Box } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';

const TEMP_USER = {
  name: 'Laura Petrola',
  location: 'Brazil',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
  film_data: {
    lists: 10,
    films_this_year: 10,
    films_total: 10,
  },
};

const Profile = () => {
  return (
    <Box paddingX="15rem" paddingY="1rem">
      <ProfileHeader user={TEMP_USER} />
    </Box>
  );
};

export default Profile;

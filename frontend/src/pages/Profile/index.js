import { Box } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';
import ListingSection from '../../components/ListingSection';
import ListCard from '../../components/ListCard';

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
  lists: [
    {
      title: 'Random name',
      image_url:
        'https://is5-ssl.mzstatic.com/image/thumb/Video113/v4/78/39/16/78391672-b014-2f71-6b48-24798bf47038/BatmanBegins_H_DD_KAalt_4320x3240_300dpi_EN.png/1200x675mf.jpg',
      likes_amount: '1,234',
    },
    {
      title: 'Another list name',
      image_url:
        'https://is5-ssl.mzstatic.com/image/thumb/Video113/v4/78/39/16/78391672-b014-2f71-6b48-24798bf47038/BatmanBegins_H_DD_KAalt_4320x3240_300dpi_EN.png/1200x675mf.jpg',
      likes_amount: '47,849',
    },
    {
      title: 'A third list',
      image_url:
        'https://is5-ssl.mzstatic.com/image/thumb/Video113/v4/78/39/16/78391672-b014-2f71-6b48-24798bf47038/BatmanBegins_H_DD_KAalt_4320x3240_300dpi_EN.png/1200x675mf.jpg',
      likes_amount: '778',
    },
  ],
};

const Profile = () => {
  return (
    <Box paddingX="15rem" paddingY="1.5rem" flex={1}>
      <ProfileHeader user={TEMP_USER} />
      <Box marginBottom="1.5rem" />
      <ListingSection title="My lists" redirectTo={'/'}>
        <Box display="flex" justifyContent={'space-between'}>
          {TEMP_USER.lists.map(item => (
            <ListCard
              imageUrl={item.image_url}
              likesAmount={item.likes_amount}
              title={item.title}
            />
          ))}
        </Box>
      </ListingSection>
    </Box>
  );
};

export default Profile;

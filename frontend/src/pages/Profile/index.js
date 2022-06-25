import { Box, Flex } from '@chakra-ui/react';
import Content from '../../components/Content';
import ProfileHeader from './components/ProfileHeader';
import ListCard from '../../components/ListCard';

const mockLists = {
  results: [
    {
      list_id: 1,
      title: 'Upcoming Movies',
      posters: [
        {
          poster_path: '/vpILbP9eOQEtdQgl4vgjZUNY07r.jpg',
        },
        {
          poster_path: '/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg',
        },
        {
          poster_path: '/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg',
        },
      ],
      likes: 1234,
    },
    {
      list_id: 2,
      title: 'Animations',
      posters: [
        {
          poster_path: '/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg',
        },
        {
          poster_path: '/sgheSKxZkttIe8ONsf2sWXPgip3.jpg',
        },
        {
          poster_path: '/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg',
        },
        {
          poster_path: '/fnKCh67l2DDG9NxxIlk9IpsXQ99.jpg',
        },
      ],
      likes: 1234,
    },
    {
      list_id: 3,
      title: 'Favorites',
      posters: [
        {
          poster_path: '/vpILbP9eOQEtdQgl4vgjZUNY07r.jpg',
        },
        {
          poster_path: '/stTEycfG9928HYGEISBFaG1ngjM.jpg',
        },
        {
          poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
        },
        {
          poster_path: '/qJRB789ceLryrLvOKrZqLKr2CGf.jpg',
        },
      ],
      likes: 1234,
    },
  ],
};

const mockStats = {
  movies_reviewed: 0,
  lists_created: 0,
  likes_received: 0,
};

const mockUser = {
  user_id: 1,
  first_name: 'Usuario',
  last_name: 'Teste',
  bio: 'Usuario de teste',
  country: 'BR',
  admin: false,
  stats: mockStats,
};

const Profile = () => {
  const lists = mockLists.results;
  return (
    <Content>
      <ProfileHeader user={mockUser} />
      <Box marginBottom="1.5rem" />
      <Flex gap="5">
        {lists.map(({ list_id, title, posters, likes }, index) => (
          <ListCard
            key={title + index}
            list_id={list_id}
            title={title}
            posters={posters.map(p => p.poster_path)}
            likes={likes}
          />
        ))}
      </Flex>
    </Content>
  );
};

export default Profile;

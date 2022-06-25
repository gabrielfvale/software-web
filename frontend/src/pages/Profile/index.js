import { Box, Flex } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';
import ListCard from '../../components/ListCard';
import ReviewList from '../../components/ReviewList';
import Category from '../../components/Category';

const mockLists = {
  results: [
    {
      list_id: 1,
      title: 'Upcoming Movies',
      movies: [
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
      movies: [
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
      movies: [
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

const mockReviews = [
  {
    review_id: '1',
    user_id: '1',
    movie_api_id: '526896',
    score: '2.5',
    description: 'The most move of all time',
    created_at: '2022-06-09T03:27:33.143Z',
    updated_at: '2022-06-09T00:27:57.936Z',
    likes: '0',
    comments: '1',
    username: 'laurazona4',
    title: 'Morbius',
    release_date: '2022-03-30',
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
  },
  {
    review_id: '2',
    user_id: '2',
    movie_api_id: '526896',
    score: '5.0',
    description: 'The most move of all time',
    created_at: '2022-06-09T03:27:33.143Z',
    updated_at: '2022-06-09T00:27:57.936Z',
    likes: '0',
    comments: '1',
    username: 'laurazona4',
    title: 'Morbius',
    release_date: '2022-03-30',
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
  },
];

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
    <Box marginX="15rem" paddingY="1.5rem">
      <ProfileHeader user={mockUser} />
      <Flex gap="5" marginY="1.5rem">
        {lists.map(({ list_id, title, movies, likes }, index) => (
          <ListCard
            key={title + index}
            title={title}
            movies={movies}
            likes={likes}
            redirect={`/lists/${list_id}`}
          />
        ))}
      </Flex>
      <Category text="Recent Reviews">
        <ReviewList data={mockReviews} />
      </Category>
    </Box>
  );
};

export default Profile;

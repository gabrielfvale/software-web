import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from 'hooks/fetchData';
import { useUser } from 'providers/UserProvider';

import { getMoviePosters } from 'util/posters';

import { Flex } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';
import ListCard from 'components/ListCard';
import ReviewList from 'components/ReviewList';
import Category from 'components/Category';
import Content from 'components/Content';
import PopularMoviesRow from 'components/PopularMoviesRow';

const mockReviews = [
  {
    review_id: '1',
    user_id: '1',
    movie_api_id: '526896',
    score: '2.5',
    description: 'The most move of all time',
    created_at: '2022-06-09T03:27:33.143Z',
    updated_at: '2022-06-09T00:27:57.936Z',
    likes: 21980,
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
    likes: 2498,
    comments: '1',
    username: 'laurazona4',
    title: 'Morbius',
    release_date: '2022-03-30',
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
  },
];

const Profile = () => {
  const { username } = useParams();
  const { user, authenticated } = useUser();

  const { data: userData } = useFetchData(`/profile/${username}`);
  const { data: userStats } = useFetchData(`/profile/${username}/stats`);
  const { data } = useFetchData(`/list/user/${username}`);

  const [lists, setLists] = useState({});
  const [special, setSpecial] = useState([]);

  const fetchMoviePosters = async userLists => {
    // Get posters for regular lists
    const res = userLists?.results;
    for (let i = 0; i < res.length; i++) {
      res[i].posters = await getMoviePosters(res[i].movies);
    }
    setLists({ ...userLists, results: [...res] });

    const newSpecial = [];

    // Get posters for watch and favorite lists
    for (const special of userLists.special) {
      const posters = await getMoviePosters(special.movies);
      const formattedPoster = special.movies.map((movie, index) => ({
        id: movie,
        poster_path: posters[index],
      }));
      newSpecial.push({
        id: special.list_id,
        name: special.name,
        posters: [...formattedPoster],
      });
    }
    setSpecial([...newSpecial]);
  };

  useEffect(() => {
    if (data) fetchMoviePosters(data);
  }, [data]);

  return (
    <Content paddingY="1.5rem">
      {userData && userStats && (
        <ProfileHeader
          user={{ ...userData, username, stats: userStats }}
          onEditProfile={() => {}}
        />
      )}

      {lists && (
        <>
          <Flex gap="5">
            {lists.results?.map(({ list_id, name, posters, likes }, index) => (
              <ListCard
                key={name + index}
                list_id={list_id}
                title={name}
                posters={posters}
                likes={likes}
              />
            ))}
          </Flex>
          {special.map(({ id, name, posters }) => (
            <Category
              key={id}
              title={`${name} (${posters.length})`}
              link={posters.length > 6 ? `/lists/${id}` : ''}
            >
              <PopularMoviesRow data={posters} />
            </Category>
          ))}
        </>
      )}

      <Category title="Recent Reviews">
        <ReviewList data={mockReviews} />
      </Category>
    </Content>
  );
};

export default Profile;

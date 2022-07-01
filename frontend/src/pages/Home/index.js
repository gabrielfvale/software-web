import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

import Content from 'components/Content';
import Hero from 'components/Hero';
import PopularMoviesRow from 'components/PopularMoviesRow';
import HomeCards from 'components/HomeCards';

import Category from 'components/Category';
import SignupModal from 'components/SignupModal';
import ReviewList from 'components/ReviewList';
import useFetchData from 'hooks/fetchData';
import { useEffect, useState } from 'react';

const mockPopularReviews = [
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

const Home = () => {
  const [backdrop, _] = useState('/zvQgzyelcgSYNr4GpPXEEgl1i7O.jpg');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useFetchData('/movie/popular');
  const { data: popularReviews } = useFetchData('/review/popular');

  // useEffect(() => {
  //   if (data?.results) {
  //     const randIndex = Math.floor(Math.random() * data.results.length);
  //     setBackdrop(data.results[randIndex].backdrop_path);
  //   }
  // }, [data]);

  return (
    <Box>
      <Box>
        <Hero backdrop={backdrop} action={onOpen} />
        <SignupModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <Content>
        <PopularMoviesRow data={data?.results} />
        <HomeCards />
        <Category title="Popular Reviews" link="/popular-reviews">
          <ReviewList data={popularReviews?.results} />
        </Category>
      </Content>
    </Box>
  );
};

export default Home;

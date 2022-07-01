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
    <>
      <Box>
        <Hero backdrop={backdrop} action={onOpen} />
        <SignupModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <Content>
        <PopularMoviesRow data={data?.results} marginY="5rem" />
        <HomeCards />
        <Category title="Popular Reviews" link="/popular-reviews">
          <ReviewList data={popularReviews?.results} />
        </Category>
      </Content>
    </>
  );
};

export default Home;

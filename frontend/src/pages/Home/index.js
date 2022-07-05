import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import useFetchData from 'hooks/fetchData';
import { useUser } from 'providers/UserProvider';

import { Box } from '@chakra-ui/react';

import Content from 'components/Content';
import Hero from 'components/Hero';
import PopularMoviesRow from 'components/PopularMoviesRow';
import HomeCards from 'components/HomeCards';
import Category from 'components/Category';
import SignupModal from 'components/SignupModal';
import ReviewList from 'components/ReviewList';

const Home = () => {
  const { authenticated } = useUser();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState('/zvQgzyelcgSYNr4GpPXEEgl1i7O.jpg');
  const { data } = useFetchData('/movie/popular');
  const { data: popularReviews } = useFetchData('/review/popular');

  useEffect(() => {
    if (data?.results) {
      const randIndex = Math.floor(Math.random() * data.results.length);
      setBackdrop(data.results[randIndex].backdrop_path);
    }
  }, [data]);

  const onHeroAction = () =>
    authenticated ? navigate('/films/discover') : onOpen();

  return (
    <>
      <Box>
        <Hero
          backdrop={backdrop}
          prompt={authenticated ? 'discover films' : 'get started right now!'}
          action={onHeroAction}
        />
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

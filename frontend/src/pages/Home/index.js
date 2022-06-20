import Hero from '../../components/Hero';
import PopularMoviesRow from '../../components/PopularMoviesRow';
import HomeCards from '../../components/HomeCards';
import { Box } from '@chakra-ui/react';
import DetailedReview from '../../DetailedReview';

const mockPopularMoviesRow = [
  {
    id: 629542,
    title: 'The Bad Guys',
    genre_ids: [16, 35, 10751, 80],
    release_date: '2022-03-17',
    poster_path: '/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg',
    backdrop_path: '/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg',
  },
  {
    id: 916821,
    title: 'Gasoline Alley',
    genre_ids: [28, 53, 80, 9648],
    release_date: '2022-02-25',
    poster_path: '/ews3l3v7JYLtBS5ansZrXsXLMzl.jpg',
    backdrop_path: '/ews3l3v7JYLtBS5ansZrXsXLMzl.jpg',
  },
  {
    id: 628900,
    title: 'The Contractor',
    genre_ids: [28, 53],
    release_date: '2022-03-10',
    poster_path: '/rJPGPZ5soaG27MK90oKpioSiJE2.jpg',
    backdrop_path: '/rJPGPZ5soaG27MK90oKpioSiJE2.jpg',
  },
  {
    id: 756681,
    title: 'Veneciafrenia',
    genre_ids: [27],
    release_date: '2022-04-21',
    poster_path: '/luMC56bwZqaECYRz6X7sXjqN6nd.jpg',
    backdrop_path: '/luMC56bwZqaECYRz6X7sXjqN6nd.jpg',
  },
  {
    id: 785985,
    title: 'The Takedown',
    genre_ids: [35, 28],
    release_date: '2022-05-06',
    poster_path: '/h5hVeCfYSb8gIO0F41gqidtb0AI.jpg',
    backdrop_path: '/h5hVeCfYSb8gIO0F41gqidtb0AI.jpg',
  },
  {
    id: 406759,
    title: 'Moonfall',
    genre_ids: [878, 12, 28],
    release_date: '2022-02-03',
    poster_path: '/putDqnndrdRzRRy5sVPYMH5FTjI.jpg',
    backdrop_path: '/putDqnndrdRzRRy5sVPYMH5FTjI.jpg',
  },
  {
    id: 568124,
    title: 'Encanto',
    genre_ids: [16, 35, 10751, 14],
    release_date: '2021-11-24',
    poster_path: '/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    backdrop_path: '/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
  },
];

const mockPopularReviews = [
  {
    review_id: '1',
    user_id: '1',
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
  return (
    <Box>
      <Box>
        <Hero src="https://www.themoviedb.org/t/p/original/zvQgzyelcgSYNr4GpPXEEgl1i7O.jpg" />
      </Box>
      <Box paddingLeft="15rem" paddingRight="15rem">
        <PopularMoviesRow data={mockPopularMoviesRow} />
        <HomeCards />
        <DetailedReview data={mockPopularReviews} />
      </Box>
    </Box>
  );
};

export default Home;

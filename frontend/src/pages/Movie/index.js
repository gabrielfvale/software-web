import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

const mockMovie = {
  id: 526896,
  runtime: 197,
  score: 2.4,
  backdrop_path: '/kmCBLNHsNnlDEtghSaF2nabpG2T.jpg',
  poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
  title: 'Morbius',
  tagline: 'A new Marvel legend arrives.',
  overview:
    'Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.',
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
  ],
  release_date: '2022-03-30',
  cast: [
    {
      adult: false,
      gender: 2,
      id: 7499,
      known_for_department: 'Acting',
      name: 'Jared Leto',
      original_name: 'Jared Leto',
      popularity: 92.976,
      profile_path: '/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg',
      cast_id: 16,
      character: 'Dr. Michael Morbius / Morbius',
      credit_id: '5bf3e2400e0a26265c09c572',
      order: 0,
    },
    {
      adult: false,
      gender: 2,
      id: 136532,
      known_for_department: 'Acting',
      name: 'Matt Smith',
      original_name: 'Matt Smith',
      popularity: 27.043,
      profile_path: '/xr2GSp8Pm6fT5VGm0I9tsWVcZ8q.jpg',
      cast_id: 18,
      character: 'Milo / Lucien',
      credit_id: '5c4a972a92514105c1539627',
      order: 1,
    },
    {
      adult: false,
      gender: 1,
      id: 1371297,
      known_for_department: 'Acting',
      name: 'Adria Arjona',
      original_name: 'Adria Arjona',
      popularity: 77.551,
      profile_path: '/2xAwAxrjZrgfyrNYToBIjg1ZeRB.jpg',
      cast_id: 17,
      character: 'Martine Bancroft',
      credit_id: '5c14fefe0e0a2603853c741f',
      order: 2,
    },
    {
      adult: false,
      gender: 2,
      id: 15440,
      known_for_department: 'Acting',
      name: 'Jared Harris',
      original_name: 'Jared Harris',
      popularity: 22.022,
      profile_path: '/mGODbYpkR1NKBOV3rtTfZ7EWoIl.jpg',
      cast_id: 19,
      character: 'Dr. Emil Nicholas',
      credit_id: '5c7df8dc0e0a264310597452',
      order: 3,
    },
  ],
};

const Movie = () => {
  const { movie_id } = useParams();
  return (
    <VStack
      gap={2}
      flexDir="column"
      alignItems="center"
      paddingX="15rem"
      paddingY="1rem"
    >
      <MovieCard movie={mockMovie} />
    </VStack>
  );
};

export default Movie;

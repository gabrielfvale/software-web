import { useEffect, useState } from 'react';
import useFetchData from 'hooks/fetchData';

import { Box, Text } from '@chakra-ui/react';
import Content from 'components/Content';
import MovieGrid from 'components/MovieGrid';
import Pagination from 'components/Pagination';
import FilteringHeader from './components/FilteringHeader';

import { numberFormatter } from 'util/numbers';

const genres = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '10770', label: 'TV Movie' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

const sorters = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'release_date', label: 'Release date' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'original_title', label: 'Title' },
];

const Discover = () => {
  const [page, setPage] = useState(1);
  const [decade, setDecade] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('popularity');
  const [order, setOrder] = useState('desc');

  const [discoverURL, setDiscoverURL] = useState('/movie/discover/');

  useEffect(() => {
    let newURL = '/movie/discover/';
    newURL += `?page=${page}`;
    if (decade !== '') {
      const minDate = `${decade}-01-01`;
      const maxDate = `${Number(decade) + 9}-12-31`;
      newURL += `&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
    }
    if (genre !== '') newURL += `&with_genres=${genre}`;
    if (sort !== '') newURL += `&sort_by=${sort}.${order}`;

    setDiscoverURL(newURL);
  }, [page, decade, genre, sort, order]);

  const { data } = useFetchData(discoverURL);

  return (
    <Content>
      <FilteringHeader
        genreOptions={genres}
        sortOptions={sorters}
        selectedDecade={decade}
        selectedGenre={genre}
        selectedSort={sort}
        sortOrder={order}
        onDecade={setDecade}
        onGenre={setGenre}
        onSortBy={setSort}
        onSortOrder={setOrder}
      />
      <Box marginY="1rem">
        <Text color="m180.darkPink" mb="1rem" fontSize="xs" textAlign="center">
          {numberFormatter(data?.total_results)} films found
        </Text>
        <MovieGrid data={data?.results} loading={!data} />
      </Box>
      <Box flex={1} display="flex" justifyContent="center">
        <Pagination
          page={page}
          total_pages={data?.total_pages || 1}
          onClick={setPage}
          showGoTo
        />
      </Box>
    </Content>
  );
};

export default Discover;

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetchData from 'hooks/fetchData';

import { Box, Text } from '@chakra-ui/react';
import Content from 'components/Content';
import MovieGrid from 'components/MovieGrid';
import Pagination from 'components/Pagination';

import { numberFormatter } from 'util/numbers';
import NotFound from 'pages/NotFound';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const { data, error } = useFetchData(
    `/movie/search?query=${searchParams.get('query') || ''}&page=${page}`
  );

  if (error) {
    return <NotFound />;
  }

  return (
    <Content>
      <Box marginY="1rem">
        <Text color="m180.darkPink" mb="1rem" fontSize="xs" textAlign="center">
          {numberFormatter(data?.total_results)} films found
        </Text>
        <MovieGrid data={data?.results} loading={!data} mockCount={8} />
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

export default Search;

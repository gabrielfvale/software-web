import { useState } from 'react';
import { useFetchData } from 'hooks/fetchData';

import { Box, Text } from '@chakra-ui/react';
import Content from 'components/Content';
import MovieGrid from 'components/MovieGrid';
import Pagination from 'components/Pagination';
import FilteringHeader from './components/FilteringHeader';

const Discover = () => {
  const [page, setPage] = useState(1);
  const [data] = useFetchData(`/movie/discover/?page=${page}`);

  return (
    <Content>
      <FilteringHeader>
        <Box
          marginY="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text color="m180.darkPink" mb="1rem" fontSize="xs">
            {data?.total_results} films found
          </Text>
          <MovieGrid data={data?.results} />
        </Box>
      </FilteringHeader>
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

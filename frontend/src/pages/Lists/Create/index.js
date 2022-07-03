import { useEffect, useState } from 'react';
import { useDebounce } from 'hooks/debounce';
import SelectMovie from 'components/SelectMovie';
import useFetchData from 'hooks/fetchData';

const Create = () => {
  const [movies, setMovies] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const query = useDebounce(inputValue);

  const { data } = useFetchData(`/movie/search?query=${query}`, false);

  const onItemClick = item => {
    const newMovies = [...movies];
    newMovies.push(item);
    setMovies([...newMovies]);
    setInputValue('');
  };

  return (
    <SelectMovie
      data={data?.results || []}
      query={inputValue}
      onChange={e => setInputValue(e.target.value)}
      onClick={onItemClick}
    />
  );
};

export default Create;

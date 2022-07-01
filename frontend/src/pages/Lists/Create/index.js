import { useEffect, useState } from 'react';
import { useDebounce } from 'hooks/debounce';
import SelectMovie from 'components/SelectMovie';
import useFetchData from 'hooks/fetchData';

const Create = () => {
  const [queryUrl, setQueryUrl] = useState('');

  const [inputValue, setInputValue] = useState('');
  const query = useDebounce(inputValue);

  const { data } = useFetchData(queryUrl);

  useEffect(() => {
    if (query !== '') {
      setQueryUrl(`/movie/search?query=${query}`);
    } else {
      setQueryUrl('/');
    }
  }, [query]);

  return (
    <SelectMovie
      data={data?.results || []}
      query={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  );
};

export default Create;

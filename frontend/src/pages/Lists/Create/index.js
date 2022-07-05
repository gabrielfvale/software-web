import { useState } from 'react';
import { useDebounce } from 'hooks/debounce';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import SelectMovie from 'components/SelectMovie';
import useFetchData from 'hooks/fetchData';
import Content from 'components/Content';
import {
  Text,
  VStack,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  HStack,
  Image,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';
import moment from 'moment';
import api from 'services/api';
import { FaTimes } from 'react-icons/fa';

const Create = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const [selectOpen, setSelectOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const query = useDebounce(inputValue);

  const { data } = useFetchData(`/movie/search?query=${query}`, false);

  const onItemClick = item => {
    if (movies.findIndex(movie => movie.id === item.id) !== -1) {
      return;
    }
    const newMovies = [...movies];
    newMovies.push(item);
    setMovies([...newMovies]);
    setInputValue('');
  };

  const onSubmit = async values => {
    const { data } = await api.post('/list', {
      ...values,
      movies: movies.map(movie => movie.id),
      list_type: values.is_public ? 'public' : 'private',
    });
    navigate(`/lists/${data.list_id}`);
  };

  const onRemove = index => {
    const newMovies = [...movies];
    newMovies.splice(index, 1);
    setMovies([...newMovies]);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      is_public: false,
    },
    onSubmit,
  });
  const mediaUrl = process.env.REACT_APP_API_URL + '/media/w92';

  return (
    <Content as={Flex} align="center" justify="center">
      <Box bg="m180.darkBeige" p={6} width="100%">
        <form onSubmit={formik.handleSubmit}>
          <VStack>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                bg="white"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                bg="white"
                type="description"
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                id="is_public"
                name="is_public"
                checked={formik.values.is_public}
                onChange={formik.handleChange}
              >
                Public
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="selectMovie">Add a Film</FormLabel>
              <SelectMovie
                data={data?.results || []}
                query={inputValue}
                isOpen={selectOpen && data}
                setOpen={setSelectOpen}
                onChange={e => setInputValue(e.target.value)}
                onClick={onItemClick}
              />
            </FormControl>
            <VStack alignItems="flex-start" width="100%">
              {movies.map((movie, index) => {
                const formatted_date = moment(movie.release_date).format(
                  'YYYY'
                );
                return (
                  <HStack key={movie.title + index}>
                    <IconButton
                      icon={<FaTimes />}
                      size="sm"
                      onClick={() => onRemove(index)}
                      variant="ghost"
                    />
                    <Image
                      w="40px"
                      src={`${mediaUrl}${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <Text fontSize="sm" fontWeight="semibold">
                      {movie.title}
                    </Text>
                    <Text fontSize="xs">{formatted_date}</Text>
                  </HStack>
                );
              })}
            </VStack>
            <HStack alignSelf="flex-end">
              <Button type="submit" width="full" size="md">
                Save
              </Button>
              <Button
                type="reset"
                width="full"
                size="md"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Content>
  );
};

export default Create;

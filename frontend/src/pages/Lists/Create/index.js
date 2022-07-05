import { useEffect, useState } from 'react';
import { useDebounce } from 'hooks/debounce';
import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';
import api from 'services/api';
import { FaTimes } from 'react-icons/fa';
import NotFound from 'pages/NotFound';

const Create = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [error, setError] = useState(false);

  const [movies, setMovies] = useState([]);

  const [selectOpen, setSelectOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false);
  const query = useDebounce(inputValue);

  const mediaUrl = process.env.REACT_APP_API_URL + '/media/w92';

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
    const body = {
      ...values,
      movies: movies.map(movie => movie.id),
      list_type: values.is_public ? 'public' : 'private',
    };
    let description = 'List created';
    let status = 'success';
    try {
      if (editing) {
        const list_id = searchParams.get('list_id');
        await api.put('/list', { ...body, list_id });
        description = 'List updated';
      } else {
        const { data } = await api.post('/list', body);
        navigate(`/lists/${data.list_id}`);
      }
    } catch (e) {
      description = e.response.data.error;
      status = 'error';
    }
    toast({
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
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

  useEffect(() => {
    const fetchEditableList = async () => {
      const list_id = searchParams.get('list_id');
      if (list_id) {
        try {
          const { data } = await api.get(`/list/${list_id}`);
          formik.setValues(
            {
              name: data.name,
              description: data.description,
              is_public: data.list_type === 'public',
            },
            false
          );
          const { data: movieDetails } = await api.get(
            `/movie/many/${data.movies.join(',')}`
          );
          setEditing(true);
          setMovies([...movieDetails]);
        } catch (e) {
          setError(true);
        }
      }
    };
    fetchEditableList();
  }, [searchParams]);

  if (error) {
    return <NotFound />;
  }

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

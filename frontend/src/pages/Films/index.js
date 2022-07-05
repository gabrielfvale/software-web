import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { useDocumentTitle } from 'hooks/documentTitle';
import useFetchData from 'hooks/fetchData';
import { useUser } from 'providers/UserProvider';
import { useInfiniteScroll } from 'hooks/inifiteScroll';
import api from 'services/api';

import { VStack, Spinner } from '@chakra-ui/react';
import Content from 'components/Content';
import MovieCard from 'components/MovieCard';
import ReviewMovie from 'components/ReviewMovie';
import ReviewBox from 'components/ReviewMovie/ReviewBox';
import ScrollToTop from 'components/ScrollToTop';
import CreateListModal from 'components/CreateListModal';
import PopularMoviesRow from 'components/PopularMoviesRow';
import Category from 'components/Category';

const Movie = () => {
  const { movie_id } = useParams();
  const { user, authenticated } = useUser();
  const setTitle = useDocumentTitle();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOnWatch, setIsOnWatch] = useState(false);
  const [isOnFavorites, setIsOnFavorites] = useState(false);
  const [reviewedByMe, setReviewedByMe] = useState(false);
  const [lists, setLists] = useState([]);
  const [review, setReview] = useState(0);

  const [reviewPage, setReviewPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchingReviews, setFetchingReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { data } = useFetchData(`/movie/${movie_id}`);
  const { data: recommendations } = useFetchData(
    `/movie/${movie_id}/recommendations`
  );

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data, setTitle]);

  useEffect(() => {
    const fetchLists = async () => {
      const { data } = await api.get(`/list/user/${user.username}`);
      setLists([...data.results]);
    };
    if (authenticated) {
      fetchLists();
    }
  }, [authenticated]);

  useEffect(() => {
    if (data) {
      setIsOnWatch(data.on_watch);
      setIsOnFavorites(data.on_favorites);
      setReviewedByMe(data.reviewed_by_me);
      setReview(data.review);
    }
  }, [data]);

  const onPaginateReviews = async () => {
    if (reviewPage <= totalPages) {
      setFetchingReviews(true);
      const { data } = await api.get(
        `/review/${movie_id}?per_page=5&page=${reviewPage}`
      );
      setReviews([...reviews, ...data.results]);
      if (totalPages === 1) {
        setTotalPages(data.total_pages);
      }
      setReviewPage(value => value + 1);
      setFetchingReviews(false);
    }
  };

  const scrollRef = useInfiniteScroll(onPaginateReviews, fetchingReviews);

  const onAddToSpecial = async list_type => {
    try {
      await api.post('/list/add-special', {
        list_type,
        movie_api_id: movie_id,
      });
      list_type === 'watch'
        ? setIsOnWatch(prev => !prev)
        : setIsOnFavorites(prev => !prev);
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response.data.error,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const onEditReview = async (values, action = 'send') => {
    try {
      const body = {
        movie_api_id: movie_id,
        ...values,
      };
      if (action === 'send') {
        await api.post('/review', body);
      } else {
        await api.put('/review', body);
      }
      toast({
        description: 'Review updated',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
      setReviewedByMe(true);
      setReview({ ...body });
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response.data.error,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onAddToList = async list_id => {
    let description = 'Film added to list';
    let status = 'success';
    try {
      await api.post('/list/add-movie', { list_id, movie_api_id: movie_id });
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

  const onCreateList = async values => {
    let description = 'Movie added to a new list';
    let status = 'success';
    try {
      await api.post('/list', {
        user_id: user.user_id,
        name: values.name,
        list_type: values.is_public ? 'public' : 'private',
        movies: [movie_id],
      });
      onClose();
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

  return (
    <Content pos="relative">
      <CreateListModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onCreateList}
      />
      <MovieCard
        movie={data}
        isOnWatchList={isOnWatch}
        isFavorite={isOnFavorites}
        lists={lists}
        onAddToWatchList={() => onAddToSpecial('watch')}
        onFavorite={() => onAddToSpecial('favorites')}
        onAddToList={onAddToList}
        onCreateList={onOpen}
        loading={!data}
      />
      <Box
        padding="2rem"
        marginTop="1rem"
        bg="m180.darkBeige"
        borderRadius="0.4rem"
      >
        <Heading size="sm" fontWeight="semibold" textTransform="uppercase">
          YOU MIGHT ALSO LIKE
        </Heading>
        <PopularMoviesRow
          maxColumns={8}
          gap={4}
          data={recommendations?.results}
        />
      </Box>
      <VStack
        gap={10}
        flexDir="column"
        alignItems="center"
        padding="2rem"
        marginTop="1rem"
        bg="m180.darkBeige"
        borderRadius="0.4rem"
      >
        <ReviewBox
          authenticated={authenticated}
          loginRedirect={`/films/${movie_id}`}
          reviewedByMe={reviewedByMe}
          review={review}
          onSend={onEditReview}
          onUpdate={values => onEditReview(values, 'update')}
        />
        <ReviewMovie data={reviews} />
        <Spinner
          ref={scrollRef}
          color="m180.pink.500"
          opacity={fetchingReviews ? '1' : '0'}
        />
      </VStack>
      <ScrollToTop />
    </Content>
  );
};

export default Movie;

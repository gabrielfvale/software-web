import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from 'hooks/fetchData';
import { useDocumentTitle } from 'hooks/documentTitle';

import { getMoviePosters } from 'util/posters';

import { Grid, Skeleton } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';
import ListCard from 'components/ListCard';
import ReviewList from 'components/ReviewList';
import Category from 'components/Category';
import Content from 'components/Content';
import PopularMoviesRow from 'components/PopularMoviesRow';
import Pagination from 'components/Pagination';
import Carousel from 'components/Carousel';
import api from 'services/api';
import NotFound from 'pages/NotFound';

const Profile = () => {
  const { username } = useParams();
  const setTitle = useDocumentTitle();

  const [listPage, setListPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [lists, setLists] = useState({});
  const [special, setSpecial] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { data: userData, error } = useFetchData(`/profile/${username}`);
  const { data: userStats } = useFetchData(`/profile/${username}/stats`);
  const { data: userLists } = useFetchData(
    `/list/user/${username}?per_page=3&page=${listPage}`
  );
  const { data: userReviews } = useFetchData(
    `/review/user/${username}/?per_page=5&page=${reviewPage}`
  );

  useEffect(() => {
    setTitle(`${username}'s profile`);
  }, [username, setTitle]);

  const fetchListPosters = async userLists => {
    // Get posters for regular lists
    const res = userLists?.results;
    for (let i = 0; i < res.length; i++) {
      res[i].posters = await getMoviePosters(res[i].movies);
    }
    setLists({ ...userLists, results: [...res] });

    const newSpecial = [];

    // Get posters for watch and favorite lists
    for (const special of userLists.special) {
      const posters = await getMoviePosters(special.movies);
      const formattedPoster = special.movies.map((movie, index) => ({
        id: movie,
        poster_path: posters[index],
      }));
      newSpecial.push({
        id: special.list_id,
        name: special.name,
        posters: [...formattedPoster],
      });
    }
    setSpecial([...newSpecial]);
  };

  const fetchReviewMovies = async userReviews => {
    if (!userReviews) return;
    const movies = userReviews.map(review => review.movie_api_id).join(',');
    const { data } = await api.get(`/movie/many/${movies}`);
    const newReviews = [];
    for (let i = 0; i < userReviews.length; i++) {
      newReviews.push({ ...userReviews[i], ...data[i] });
    }
    setReviews([...newReviews]);
  };

  useEffect(() => {
    if (userLists) {
      fetchListPosters(userLists);
      if (totalPages === 1) {
        setTotalPages(userLists.total_pages);
      }
    }
  }, [userLists]);

  useEffect(() => {
    if (userReviews) {
      fetchReviewMovies(userReviews.results);
    }
  }, [userReviews]);

  const onCarouselChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setListPage(newPage);
    }
  };

  if (error) {
    return <NotFound />;
  }

  return (
    <Content paddingY="1.5rem">
      {userData && userStats && (
        <ProfileHeader
          user={{ ...userData, username, stats: userStats }}
          onEditProfile={() => {}}
        />
      )}

      {lists && (
        <>
          <Category title="Lists">
            <Carousel
              perPage={3}
              itemCount={lists?.results?.length}
              onPrev={() => onCarouselChange(listPage - 1)}
              onNext={() => onCarouselChange(listPage + 1)}
              prevDisabled={listPage === 1}
              nextDisabled={listPage === totalPages}
              itemRenderer={() =>
                lists.results?.map(
                  ({ list_id, name, posters, likes }, index) => (
                    <ListCard
                      key={name + index}
                      list_id={list_id}
                      title={name}
                      posters={posters}
                      likes={likes}
                    />
                  )
                )
              }
            />
          </Category>
          {special.map(({ id, name, posters }) => (
            <Category
              key={id}
              title={`${name} (${posters.length})`}
              link={posters.length > 6 ? `/lists/${id}` : ''}
            >
              <PopularMoviesRow data={posters} />
            </Category>
          ))}
        </>
      )}

      {!userLists &&
        [...Array(2)].map((_, i) => (
          <Category key={i}>
            <Grid templateColumns="repeat(6, 1fr)" gap={2}>
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} w="124px" h="186px" />
              ))}
            </Grid>
          </Category>
        ))}

      <Category title="Recent Reviews">
        <ReviewList data={reviews} />
        <Pagination
          page={reviewPage}
          total_pages={userReviews?.total_pages}
          onClick={setReviewPage}
        />
      </Category>
    </Content>
  );
};

export default Profile;

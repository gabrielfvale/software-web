import api from 'services/api';

export const getMoviePosters = async (movies = []) => {
  const movieList = movies.join(',');
  const { data } = await api.get(`/movie/media?movies=${movieList}`);
  return data.map(m => m.media);
};

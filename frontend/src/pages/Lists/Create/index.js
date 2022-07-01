import { useNavigate } from 'react-router-dom';
import SelectMovie from 'components/SelectMovie';

const movies = [
  {
    id: 526896,
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    title: 'Morbius',
    release_date: '2000-12-10',
  },
  {
    id: 526897,
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    title: 'Morbius',
    release_date: '2000-12-10',
  },
  {
    id: 526898,
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    title: 'Morbius',
    release_date: '2000-12-10',
  },
];

const Create = () => {
  return <SelectMovie data={movies}></SelectMovie>;
};

export default Create;

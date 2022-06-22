import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Movie from '../pages/Movie';

export const publicRoutes = [
  {
    title: 'Films',
    path: '/films',
    element: () => {},
  },
  {
    title: 'Lists',
    path: '/lists',
    element: () => {},
  },
  {
    title: 'My profile',
    path: '/profile',
    element: Profile,
  },
];
const routes = [
  ...publicRoutes,
  {
    title: 'Home',
    path: '/',
    element: Home,
  },
  {
    title: 'Movie Details',
    path: '/movie/:movie_id',
    element: Movie,
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.title}
          path={route.path}
          element={<route.element />}
        />
      ))}
    </Routes>
  );
};

export default Router;

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

import Profile from '../pages/Profile';
import Settings from '../pages/Profile/Settings';

import Movie from '../pages/Films';
import Discover from '../pages/Films/Discover';

import Lists from '../pages/Lists';
import ListById from '../pages/Lists/ById';

export const publicRoutes = [
  {
    title: 'Films',
    path: '/films',
    element: () => {},
  },
  {
    title: 'Lists',
    path: '/lists',
    element: Lists,
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
    path: '/films/:movie_id',
    element: Movie,
  },
  {
    title: 'Profile Settings',
    path: '/profile/settings',
    element: Settings,
  },
  {
    title: 'List',
    path: '/lists/:list_id',
    element: ListById,
  },
  {
    title: 'Discover',
    path: '/films/discover',
    element: Discover,
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

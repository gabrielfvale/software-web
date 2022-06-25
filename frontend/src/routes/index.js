import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Movie from '../pages/Movie';
import Lists from '../pages/Lists';
import List from '../pages/List';
import AccountSettings from '../pages/AccountSettings';
import FilmsFiltering from '../pages/FilmsFiltering';

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
    path: '/movie/:movie_id',
    element: Movie,
  },
  {
    title: 'Account Settings',
    path: '/accountSettings',
    element: AccountSettings,
  },
  {
    title: 'List',
    path: '/lists/:list_id',
    element: List,
  },
  {
    title: 'FilmsFiltering',
    path: '/films/filtering',
    element: FilmsFiltering,
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

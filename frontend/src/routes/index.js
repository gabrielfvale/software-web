import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from 'services/auth';

import NotFound from 'pages/NotFound';

import Home from 'pages/Home';

import Profile from 'pages/Profile';
import Settings from 'pages/Profile/Settings';

import Movie from 'pages/Films';
import Discover from 'pages/Films/Discover';

import Lists from 'pages/Lists';
import ListById from 'pages/Lists/ById';
import CreateList from 'pages/Lists/Create';

import SignIn from 'pages/SignIn';
import ResetPassword from 'pages/ResetPassword';

// Component for authenticated routes
const PrivateRoute = ({ redirect = '/', children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to={redirect} />;
};

export const publicRoutes = [];
const routes = [
  {
    title: 'Home',
    path: '/',
    element: Home,
  },

  {
    path: '/films',
    element: () => {},
  },
  {
    path: '/films/:movie_id',
    element: Movie,
  },
  {
    path: '/films/discover',
    element: Discover,
  },

  {
    path: '/lists',
    element: Lists,
  },
  {
    path: '/lists/create',
    element: CreateList,
  },
  {
    path: '/lists/:list_id',
    element: ListById,
  },

  {
    path: '/profile/:username',
    element: Profile,
  },
  {
    path: '/profile/:username/settings',
    element: () => (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },

  {
    path: '/sign-in',
    element: SignIn,
  },
  {
    path: '/reset-password',
    element: ResetPassword,
  },

  {
    path: '*',
    element: NotFound,
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map(route => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};

export default Router;

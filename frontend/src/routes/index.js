import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

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
    element: () => {},
  },
];
const routes = [
  {
    title: 'Home',
    path: '/',
    element: Home,
  },
  ...publicRoutes,
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

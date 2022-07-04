import { createContext, useContext, useState } from 'react';
import {
  isAuthenticated,
  getUser,
  login as authLogin,
  logout as authLogout,
} from 'services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const authenticated = isAuthenticated();

  const login = token => {
    authLogin(token);
    setUser(getUser());
  };

  const logout = () => {
    authLogout();
    setUser({});
  };

  const setUsername = username => {
    setUser({ ...user, username });
  };

  const values = { user, authenticated, login, logout, setUsername };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;

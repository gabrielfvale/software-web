import { createContext, useContext, useEffect, useState } from 'react';
import {
  isAuthenticated,
  getUser,
  login as authLogin,
  logout as authLogout,
} from 'services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const authenticated = isAuthenticated();

  const login = token => {
    authLogin(token);
    setUser(getUser());
  };

  const logout = () => {
    authLogout();
    setUser({});
  };

  useEffect(() => {
    if (authenticated) {
      setUser(getUser());
    }
  }, [authenticated]);

  const values = { user, authenticated, login, logout };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;

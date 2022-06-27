import jwt_decode from 'jwt-decode';

export const TOKEN_KEY = '@filmit-token';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => localStorage.setItem(TOKEN_KEY, token);

export const logout = () => localStorage.removeItem(TOKEN_KEY);

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  return jwt_decode(token);
};

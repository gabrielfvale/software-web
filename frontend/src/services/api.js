import axios from 'axios';
import { getToken } from './auth';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

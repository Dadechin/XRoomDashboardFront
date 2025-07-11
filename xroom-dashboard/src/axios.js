import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://194.62.43.230:8000',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

export default instance;

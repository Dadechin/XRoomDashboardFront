import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my.xroomapp.com/api/',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

export default instance;

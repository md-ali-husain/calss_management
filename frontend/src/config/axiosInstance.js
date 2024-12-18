import axios from 'axios';
import { API_URL } from '../util';

const axiosInstance = axios.create({
  baseURL: API_URL, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
     
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const isAuthRequest = config.url?.includes('/auth/login') || 
                         config.url?.includes('/auth/register');
    
    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
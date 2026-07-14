import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Runs before every request made with "api" - attaches token automatically
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');

  if (userInfo) {
    const token = JSON.parse(userInfo).token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.62:8000',
  timeout: 10000, // Optional: timeout in milliseconds
});

export default api;
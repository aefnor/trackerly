import axios from 'axios';

const api = axios.create({
  baseURL: 'http://100.86.140.32:8000',
  timeout: 10000, // Optional: timeout in milliseconds
});

export default api;

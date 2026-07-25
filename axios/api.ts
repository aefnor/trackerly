import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://100.86.140.32:8000",
  timeout: 10000,
});

export default api;

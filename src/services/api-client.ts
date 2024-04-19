import axios from "axios";
// const BASE_URL = "http://localhost:5236/api";
const BASE_URL = "https://api.e-pharm.co/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default apiClient;
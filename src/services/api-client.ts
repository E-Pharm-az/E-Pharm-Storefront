import axios from "axios";

// const BASE_URL = "https://localhost:7074/api";
const BASE_URL = "https://epharm-api.onrender.com/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default apiClient;
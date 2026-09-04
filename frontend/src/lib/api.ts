import axios from "axios";

const api = axios.create({
  // Replace process.env with import.meta.env
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;


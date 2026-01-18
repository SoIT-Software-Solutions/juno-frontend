import axios from "axios";
const BASE_URL = (import.meta.env as any).VITE_BACKEND_API;
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API;

export const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) return Promise.reject(err);
      console.log("401 issue for refresh");

      let res: any;

      try {
        res = await axios.post(`${BACKEND_URL}/auth/refresh`, {
          refreshToken,
        });
      } catch (error) {
        console.log("Error is with the /auth/refresh res " + error);
        return;
      }

      localStorage.setItem("access_token", res.data.accessToken);

      err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return apiClient(err.config);
    }

    return Promise.reject(err);
  },
);

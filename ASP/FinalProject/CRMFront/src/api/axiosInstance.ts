import axios from "axios";

const isDevelopment = import.meta.env.DEV;
const apiUrl = isDevelopment 
  ? import.meta.env.VITE_API_URL 
  : import.meta.env.VITE_PRODUCTION_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Add request interceptor for handling errors
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

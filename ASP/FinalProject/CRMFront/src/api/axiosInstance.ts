import axios from "axios";
import { toast } from 'react-toastify';

const isDevelopment = import.meta.env.DEV;
const apiUrl = isDevelopment 
  ? import.meta.env.VITE_API_URL 
  : import.meta.env.VITE_PRODUCTION_API_URL;

console.log('API URL:', apiUrl);

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    toast.error('Ошибка при отправке запроса');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (!error.response) {
      toast.error('Сервер недоступен. Пожалуйста, проверьте подключение к интернету');
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 401:
        localStorage.removeItem('isLogin');
        window.location.href = "/login";
        break;
      case 403:
        toast.error('У вас нет прав для выполнения этого действия');
        break;
      case 404:
        toast.error('Запрашиваемый ресурс не найден');
        break;
      case 500:
        toast.error('Внутренняя ошибка сервера');
        break;
      default:
        toast.error(error.response.data?.message || 'Произошла ошибка');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

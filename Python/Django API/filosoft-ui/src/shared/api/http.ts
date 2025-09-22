import axios from "axios";

const baseURL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

export const http = axios.create({
  baseURL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const lng = localStorage.getItem("i18nextLng") || "az";
  config.headers = config.headers || {};
  config.headers["Accept-Language"] = lng;
  return config;
});

export const fetcher = (url: string) => http.get(url).then((r) => r.data);

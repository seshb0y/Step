import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5241/",
  withCredentials: true, 
});

export default axiosInstance;

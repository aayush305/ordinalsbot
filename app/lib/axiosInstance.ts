import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.ORDINALSBOT_API_URL,
  timeout: 10000,
  headers: {
    "x-api-key": process.env.ORDINALSBOT_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Axios Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

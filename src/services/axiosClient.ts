import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(
      error.response || "Error: Could not make request to server"
    );
  }
);

export default axiosClient;

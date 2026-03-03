import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-backend-api-n5q7.onrender.com/api"
});

// Ця магія спрацьовує ПЕРЕД кожним запитом
API.interceptors.request.use(
  (config) => {
    // Ми беремо НАЙСВІЖІШИЙ токен прямо з пам'яті перед відправкою
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const { token } = JSON.parse(adminData);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
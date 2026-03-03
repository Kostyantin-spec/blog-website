import axios from "axios";

const API = axios.create({ 
  baseURL: 'https://blog-backend-api-n5q7.onrender.com/api' 
});

// Автоматичне додавання токена до кожного запиту
API.interceptors.request.use((config) => {
  try {
    const adminDataRaw = localStorage.getItem("adminData");
    if (adminDataRaw) {
      const adminData = JSON.parse(adminDataRaw);
      if (adminData?.token) {
        config.headers.Authorization = `Bearer ${adminData.token}`;
      }
    }
  } catch (e) {
    console.error("Помилка інтерцептора:", e);
  }
  return config;
});

export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);

export default API;
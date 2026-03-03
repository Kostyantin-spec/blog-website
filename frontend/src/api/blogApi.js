import axios from "axios";

// 1. Створюємо екземпляр
const API = axios.create({
  baseURL: "https://blog-backend-api-n5q7.onrender.com/api"
});

// 2. Додаємо інтерцептор для динамічного токена
API.interceptors.request.use(
  (config) => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        if (parsed && parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        console.error("Token parse error", e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. ПОВЕРТАЄМО ЕКСПОРТИ, ЯКИХ НЕ ВИСТАЧАЛО (для BlogContext та інших)
export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);

// 4. Дефолтний експорт для Modal.jsx та AuthContext.jsx
export default API;
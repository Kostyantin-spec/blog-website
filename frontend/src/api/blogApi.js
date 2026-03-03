import axios from "axios";

// 1. Створюємо екземпляр
const API = axios.create({
  baseURL: "https://blog-backend-api-n5q7.onrender.com/api"
});

// 2. Додаємо інтерцептор для динамічного токена
API.interceptors.request.use(
  (config) => {
    // Спочатку шукаємо в adminData
    const adminData = localStorage.getItem("adminData");
    let token = localStorage.getItem("token"); // Шукаємо також просто token

    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        if (parsed?.token) token = parsed.token;
      } catch (e) {}
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
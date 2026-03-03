import axios from "axios";

// 1. Створюємо екземпляр
const API = axios.create({
  baseURL: "https://blog-backend-api-n5q7.onrender.com/api"
});

// 2. Додаємо інтерцептор для динамічного токена
API.interceptors.request.use((config) => {
    // Спочатку пробуємо дістати з adminData, якщо не вийде — беремо "token"
    const adminDataRaw = localStorage.getItem("adminData");
    let token = localStorage.getItem("token");

    if (adminDataRaw) {
        try {
            const adminData = JSON.parse(adminDataRaw);
            token = adminData.token;
        } catch (e) {
            console.error("Помилка парсингу adminData");
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 3. ПОВЕРТАЄМО ЕКСПОРТИ, ЯКИХ НЕ ВИСТАЧАЛО (для BlogContext та інших)
export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);

// 4. Дефолтний експорт для Modal.jsx та AuthContext.jsx
export default API;
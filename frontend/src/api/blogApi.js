import axios from "axios";

const API = axios.create({ baseURL: 'https://blog-backend-api-n5q7.onrender.com/api' });

// Тільки один інтерцептор, ніяких маніпуляцій у компонентах
API.interceptors.request.use((config) => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData?.token) {
        config.headers.Authorization = `Bearer ${adminData.token}`;
    }
    return config;
});

// 3. ПОВЕРТАЄМО ЕКСПОРТИ, ЯКИХ НЕ ВИСТАЧАЛО (для BlogContext та інших)
export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);

// 4. Дефолтний експорт для Modal.jsx та AuthContext.jsx
export default API;
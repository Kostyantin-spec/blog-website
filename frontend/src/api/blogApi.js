import axios from "axios";

// 1. Створюємо екземпляр з базовими налаштуваннями
const API = axios.create({ 
  baseURL: "https://blog-backend-api-n5q7.onrender.com/api" 
});

// 2. Додаємо перехоплювач для токена
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

// 3. Іменовані експорти для конкретних функцій (Named Exports)
export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);

// 4. ДЕФОЛТНИЙ ЕКСПОРТ (те, що шукає Modal.jsx)
export default API;
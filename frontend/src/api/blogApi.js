import axios from "axios";

const API = axios.create({ baseURL: "https://blog-backend-api-n5q7.onrender.com/api" });

export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);

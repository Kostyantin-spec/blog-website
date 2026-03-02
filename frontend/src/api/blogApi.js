import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchBlogs = () => API.get("/blogs");
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);

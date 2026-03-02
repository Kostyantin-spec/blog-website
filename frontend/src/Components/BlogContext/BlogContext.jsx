
import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { fetchBlogs } from "../../api/blogApi";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchBlogs();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mappedBlogs = data.map(blog => ({
          ...blog,
          // Зберігаємо обидва варіанти, щоб нічого не відвалилося
          image: blog.blog_image, 
          blog_image: blog.blog_image,
          authorName: blog.author_name,
          authorAvatar: blog.author_image || blog.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author_name)}&background=random`
        }));

        const sorted = mappedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sorted);
      }
    } catch (err) {
      console.error("Помилка при завантаженні блогів:", err);
      setError("Не вдалося завантажити дані.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  // Мемоїзуємо значення, щоб провайдер не перемальовував дітей без потреби
  const value = useMemo(() => ({ 
    blogs, 
    setBlogs, 
    loading, 
    error,
    refreshBlogs: getBlogs 
  }), [blogs, loading, error, getBlogs]);

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
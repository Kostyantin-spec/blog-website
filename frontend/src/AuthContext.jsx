import React, { createContext, useState, useEffect } from "react";
// 1. Імпортуємо наш налаштований API замість звичайного axios
import API from "./api/blogApi.js"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedAdmin = localStorage.getItem("adminData");
      if (savedAdmin) {
        try {
          const parsedAdmin = JSON.parse(savedAdmin);
          setAdmin(parsedAdmin);
          // 2. Налаштовуємо заголовок саме в нашому API
          API.defaults.headers.common["Authorization"] = `Bearer ${parsedAdmin.token}`;
        } catch (error) {
          console.error("Помилка парсингу adminData:", error);
          localStorage.removeItem("adminData");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (data) => {
    setAdmin(data);
    localStorage.setItem("adminData", JSON.stringify(data));
    // 3. Оновлюємо заголовок в API одразу
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminData");
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};
import React, { createContext, useState, useEffect } from "react";
import API from "./api/blogApi.js"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const savedData = localStorage.getItem("adminData");
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setAdmin(data);
          // Встановлюємо заголовок, якщо токен є
          if (data.token) {
            API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          }
        } catch (error) {
          console.error("Помилка парсингу adminData:", error);
        }
      }
      // ЦЕЙ РЯДОК ОЖИВИТЬ САЙТ:
      setLoading(false); 
    };

    initAuth();
  }, []);

  const login = (data) => {
    setAdmin(data);
    localStorage.setItem("adminData", JSON.stringify(data));
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminData");
    delete API.defaults.headers.common["Authorization"];
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};
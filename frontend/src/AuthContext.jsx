
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
          axios.defaults.headers.common["Authorization"] = `Bearer ${parsedAdmin.token}`;
        } catch (error) {
          console.error("Помилка парсингу adminData:", error);
          localStorage.removeItem("adminData");
        }
      }
      setLoading(false); // Тепер роути знатимуть, що перевірка завершена
    };

    checkAuth();
  }, []);

  const login = (data) => {
  setAdmin(data);
  localStorage.setItem("adminData", JSON.stringify(data));
  // Важливо: встановлюємо заголовок ОДРАЗУ
  axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
};

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminData");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/admin/login"; // Повне очищення при виході
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};
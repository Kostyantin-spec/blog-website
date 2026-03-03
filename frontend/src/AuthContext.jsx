import React, { createContext, useState, useEffect } from "react";
import API from "./api/blogApi.js"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const savedData = localStorage.getItem("adminData");
  if (savedData) {
    const data = JSON.parse(savedData);
    setAdmin(data);
    // ВАЖЛИВО: встановлюємо заголовок при кожному завантаженні сайту
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  }
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
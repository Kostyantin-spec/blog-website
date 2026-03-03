import React, { createContext, useState, useEffect } from "react";
import API from "./api/blogApi.js"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      console.log("Checking storage for adminData...");
      const savedData = localStorage.getItem("adminData");
      
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          console.log("Admin found in storage:", data.admin?.name);
          setAdmin(data);
          if (data.token) {
            API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          }
        } catch (error) {
          console.error("Error parsing adminData:", error);
          localStorage.removeItem("adminData"); // Чистимо биті дані
        }
      } else {
        console.log("No adminData in storage.");
      }
      setLoading(false); // Включаємо сайт
    };

    initAuth();
  }, []);

  const login = (data) => {
    console.log("Login triggered with data:", data);
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
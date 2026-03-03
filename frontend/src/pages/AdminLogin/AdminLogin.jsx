
import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // 2. Імпортуй свій AuthContext
import './AdminLogin.css';
import API from '../../api/blogApi.js';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 3. Отримуємо функцію логіну з контексту
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const { data } = await API.post("/admin/login", {
      email,
      password,
    });

    if (data.token) {
      
      login(data);

      
      localStorage.setItem("adminData", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      window.location.replace("/admin/dashboard");
    }
  } catch (error) {
    console.error("Помилка авторизації:", error);
    setError(error.response?.data?.message || "Помилка входу");
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Panel</h1>
          <p>Будь ласка, авторизуйтесь</p>
        </div>
        
        {error && <p className="error-alert">{error}</p>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="admin@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-button">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
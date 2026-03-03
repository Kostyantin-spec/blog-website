
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../../api/blogApi.js';
import '../AdminLogin/AdminLogin.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/admin/register", formData);
    
    if (res.status === 201 || res.status === 200) {
      alert("Адміна створено!"); 
      navigate("/admin/login"); 
    }
  } catch (err) {
    alert(err.response?.data?.message || "Помилка реєстрації");
  }
};

  return (
    <div className="admin-login-container">
      <h2>Реєстрація нового адміна</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <input 
          type="text" 
          placeholder="Ім'я" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={formData.password} 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">Зареєструвати</button>
      </form>
    </div>
  );
};

export default AdminRegister;
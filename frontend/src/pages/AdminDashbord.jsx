
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, NavLink } from "react-router-dom";

import { 
  FaEdit, FaTrashAlt, FaPlug, FaPlus, FaComments, 
  FaFileAlt, FaStar, FaEye, FaHeart, FaTrash, FaRocket, FaChartLine
} from 'react-icons/fa';
import './AdminDashboard/AdminDashboard.css';
import { createUnifiedPayload } from "../../../backend/utils/createUnifiedPayload.js";
import API from '../api/blogApi.js';


const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const { data } = await axios.get("http://localhost:5000/api/blogs");
        const { data } = await API.get("/blogs");
        setBlogs(data);
      } catch (err) {
        console.error("Помилка отримання блогів", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

const [isProcessing, setIsProcessing] = useState(false);

const handleReshare = async ( blog) => {
  if (isProcessing) return; // Якщо вже вантажиться — ігноруємо клік
 
  // 🛡️ Захист №1: Перевіряємо чи прийшов блог
  if (!blog || !blog.slug) {
    console.error("❌ Помилка: Об'єкт блогу не отримано!");
    return;
  }
  setIsProcessing(true);
  try {
    // Оновлюємо UI локально
    setBlogs(prev => prev.map(b => 
      b.slug === blog.slug ? { ...b, reshareCount: (b.reshareCount || 0) + 1 } : b
    ));

    // Запит на сервер (база даних)
    await API.post(`/blogs/${blog.slug}/reshare`);

    // Отримуємо налаштування
    const settingsRes = await API.get('/admin/settings');
    let { makeWebhookUrl, siteName, syncNewPosts } = settingsRes.data;

    // 🛡️ Захист №2: ЛІКУЄМО URL (якщо він склеївся)
    if (makeWebhookUrl && makeWebhookUrl.includes('https://hook')) {
       // Беремо тільки першу частину до другого входу https
       const cleanUrl = makeWebhookUrl.split('https').filter(Boolean)[0];
       makeWebhookUrl = 'https' + cleanUrl;
    }


if (syncNewPosts && makeWebhookUrl) {
  // Викликаємо твою функцію
  const payload = createUnifiedPayload("reshare", blog, { siteName });

  console.log("📦 Універсальний Payload для Make:", payload);

  await axios.post(makeWebhookUrl.trim(), payload);
  // ✅ ВІЗУАЛЬНИЙ ВІДГУК
    alert(`✅ Готово! Стаття "${blog.title}" відправлена в Make.com`);
  console.log("✅ Дані відправлено через універсальний пейлоад!");
}

  } catch (error) {
    console.error("⚠️ Помилка репосту:", error.message);
  }
};


  const handleDelete = async (slug) => {
    if (!window.confirm("Видалити статтю?")) return;
    try {
      await API.delete(`/blogs/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(prev => prev.filter(blog => blog.slug !== slug));
    } catch (error) {
      alert("Помилка видалення");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  
 
const totalRating = blogs.length > 0 
  ? (blogs.reduce((acc, blog) => {
      // Перевіряємо рейтинг і в корені, і в blogDetail (на всяк випадок)
      const val = Number(blog.rating?.average || blog.blogDetail?.rating?.average) || 0;
      return acc + val;
    }, 0) / blogs.length).toFixed(1)
  : "0.0";

// Обчислюємо загальну кількість відгуків
const totalReviews = blogs.reduce((acc, blog) => {
  const count = Number(blog.rating?.count || blog.blogDetail?.rating?.count) || 0;
  return acc + count;
}, 0);

const totalViews = blogs.reduce((acc, blog) => acc + (blog.blogDetail?.views || 0), 0);

  return (
    <div className="admin-container">
     
      {/* --- ОСНОВНИЙ КОНТЕНТ --- */}
      <main className="main-content">
        <header className="content-header">
          <h1>Панель керування</h1>
          <Link to="/admin/gold-stats" className="primary-btn-gold"><FaChartLine /> Аналітика інструментів</Link>
          <Link to="/admin/add-post" className="primary-btn">
            <FaPlus /> Створити статтю
          </Link>
        </header>

  
        <section className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon"><FaFileAlt /></div>
            <div className="stat-info">
              <h3>{blogs.length}</h3>
              <p>Статей опубліковано</p>
            </div>
          </div>
          <div className="stat-card green" onClick={() => navigate('/admin/comments')}>
            <div className="stat-icon"><FaComments /></div>
            <div className="stat-info">
              <h3>Модерація</h3>
              <p>Перевірити коментарі</p>
            </div>
          </div>
          <div className="stat-card purple" onClick={() => navigate('/admin/settings')}>
            <div className="stat-icon"><FaPlug /></div>
            <div className="stat-info">
              <h3>Make.com</h3>
              <p>Статус інтеграції</p>
            </div>
          </div>
        
          <div className="stat-card orange">
              <div className="stat-icon"><FaStar /></div>
              <div className="stat-info">
             <h3>{totalRating} / 5.0</h3>
                <p>Загальний рейтинг ({totalReviews} відгуків)</p>
              </div>
           </div>

           <div className="stat-card blue">
             <div className="stat-icon"><FaEye /></div>
               <div className="stat-info">
               <h3>{totalViews}</h3>
                 <p>Усього переглядів</p>
              </div>
                </div>
        </section>

      
       <section className="table-card">
  <div className="table-header">
    <h2>Останні публікації</h2>
  </div>
  <div className="table-responsive">
   <table className="admin-table">
  <thead>
    <tr>
      <th>Заголовок</th>
      <th>Категорія</th>
      <th>Дата</th>
      <th>Статистика (👁/❤️)</th> 
      <th style={{ textAlign: 'center' }}>🚀 Поширети</th>
      <th>Рейтинг</th> 
      <th className="text-right">Дії</th>
    </tr>
  </thead>
  <tbody>
    {blogs.map((blog) => (
      <tr key={blog._id}>
        <td className="post-title">{blog.title}</td>
        <td><span className="badge">{blog.category}</span></td>
        <td className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</td>
        <td>
          <div className="admin-stats-display">
            <span title="Перегляди">
              <FaEye style={{ color: '#3b82f6' }} /> {blog.blogDetail?.views || 0}
            </span>
            <span title="Лайки" style={{ marginLeft: '12px' }}>
              <FaHeart style={{ color: '#ef4444' }} /> {blog.likes || blog.blogDetail?.likes || 0}
            </span>
          </div>
        </td>
        <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#6366f1' }}>
          {blog.reshareCount || 0}
        </td>
        <td>
          <div className="admin-rating-display">
            <FaStar className="star-icon-admin" /> 
            <span className="rating-value">
              {blog.rating?.average || blog.blogDetail?.rating?.average || "0.0"}
            </span>
            <span className="rating-count">
              ({blog.rating?.count || blog.blogDetail?.rating?.count || 0})
            </span>
          </div>
        </td>
        <td className="actions text-right">
  
          <button 
            onClick={() => handleReshare(blog)} 
            className="btn-icon reshare" 
            title="Поширити в Telegram"
            style={{ color: '#6366f1', marginRight: '8px' }}
          >
            <FaRocket />
            
          </button>

          <button onClick={() => navigate(`/admin/edit/${blog.slug}`)} className="btn-icon edit">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(blog.slug)} className="btn-icon delete">
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    {blogs.length === 0 && <p className="empty-state">Поки що немає статей...</p>}
  </div>
</section>
      </main>
    </div>
  );
};

export default AdminDashboard;
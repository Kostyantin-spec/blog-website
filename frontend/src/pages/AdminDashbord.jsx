
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, NavLink } from "react-router-dom";

import { 
  FaEdit, FaTrashAlt, FaPlug, FaPlus, FaComments, 
  FaFileAlt, FaStar, FaEye, FaHeart, FaTrash, FaRocket, FaChartLine
} from 'react-icons/fa';
import './AdminDashboard/AdminDashboard.css';
import { createUnifiedPayload } from "../../../backend/src/utils/createUnifiedPayload.js";
import API from '../api/blogApi.js';


const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Заголовок Authorization зараз:", API.defaults.headers.common["Authorization"]);
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

const handleReshare = async (blog) => {
  if (isProcessing) return;
  if (!blog || !blog.slug) return;
  
  setIsProcessing(true);
  try {
    // 1. Отримуємо токен з нашого об'єкта adminData
    const savedData = localStorage.getItem("adminData");
    const token = savedData ? JSON.parse(savedData).token : null;

    if (!token) {
      alert("⚠️ Помилка авторизації. Будь ласка, перелогіньтесь.");
      window.location.href = "/admin/login";
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // 2. Оновлення бази (через наш API з явним токеном)
    await API.post(`/blogs/${blog.slug}/reshare`, {}, config);

    // 3. Отримання налаштувань (щоб взяти актуальний makeWebhookUrl)
    const settingsRes = await API.get('/admin/settings', config);
    let { makeWebhookUrl, siteName, syncNewPosts } = settingsRes.data;

    // 4. Відправка на Make.com
    if (syncNewPosts && makeWebhookUrl) {
      const payload = createUnifiedPayload("reshare", blog, { siteName });
      
      // Для зовнішнього Make.com використовуємо звичайний axios
      // ВАЖЛИВО: сюди токен НЕ передаємо, бо Make.com його не чекає
      await axios.post(makeWebhookUrl.trim(), payload); 
      
      setBlogs(prev => prev.map(b => 
        b.slug === blog.slug ? { ...b, reshareCount: (b.reshareCount || 0) + 1 } : b
      ));
      
      alert(`✅ Статтю успішно поширено через Make.com!`);
    } else {
      alert("ℹ️ Репост у базу записано, але синхронізація Make.com вимкнена.");
    }

  } catch (error) {
    console.error("❌ Помилка решейру:", error);
    
    if (error.response?.status === 401) {
       alert("Сесія закінчилася. Потрібно увійти знову.");
       window.location.href = "/admin/login";
    } else {
       alert("Помилка: " + (error.response?.data?.message || error.message));
    }
  } finally {
    setIsProcessing(false);
  }
};


const handleDelete = async (slug) => {
  if (!window.confirm("Видалити статтю?")) return;
  
  try {
    // 1. Отримуємо свіжий токен з нашого об'єкта adminData
    const savedData = localStorage.getItem("adminData");
    const token = savedData ? JSON.parse(savedData).token : null;

    if (!token) {
      alert("Помилка авторизації. Перелогіньтесь.");
      return;
    }

    // 2. Передаємо токен ЯВНО в заголовках (це наш захист від 401)
    await API.delete(`/blogs/${slug}`, {
      headers: { Authorization: `Bearer ${token}` }
    }); 
    
    // 3. Оновлюємо список статей в інтерфейсі
    setBlogs(prev => prev.filter(blog => blog.slug !== slug));
    alert("🗑️ Статтю успішно видалено!");

  } catch (error) {
    console.error("Помилка видалення:", error);
    // Якщо сервер повернув 401 — це значить токен "прокис"
    if (error.response?.status === 401) {
      alert("Ваша сесія завершилася. Будь ласка, залогіньтесь знову.");
    } else {
      alert(error.response?.data?.message || "Помилка видалення");
    }
  }
};

 const handleLogout = () => {
  // 1. Очищаємо абсолютно все, що могло залишитися
  localStorage.removeItem("adminData");
  localStorage.removeItem("token"); // на всякий випадок, якщо десь завалявся старий ключ
  localStorage.removeItem("adminToken");

  // 2. Скидаємо заголовки API
  if (API.defaults.headers.common["Authorization"]) {
    delete API.defaults.headers.common["Authorization"];
  }

  // 3. Перенаправляємо (використовуємо replace, щоб не можна було повернутися кнопкою "Назад")
  navigate("/admin/login", { replace: true });
  
  // 4. ПЕРЕЗАВАНТАЖЕННЯ — це супер-ідея! 
  // Це повністю очистить пам'ять React від залишків статистики чи коментарів
  window.location.reload(); 
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
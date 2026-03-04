import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../../api/blogApi.js';
import { FaArrowLeft, FaChartLine, FaTrophy, FaMousePointer, FaClock } from "react-icons/fa";
import "./GoldAnalitics.css"; 

const GoldAnalytics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 const fetchStats = async () => {
  try {
    setLoading(true);
    const savedData = localStorage.getItem("adminData");
    
    if (!savedData) {
      console.error("❌ Дані adminData відсутні в localStorage");
      return;
    }

    const parsedData = JSON.parse(savedData);
    // Пробуємо дістати токен з різних можливих місць (parsedData.token або parsedData.admin.token)
    const token = parsedData.token || (parsedData.admin && parsedData.admin.token);

    if (!token) {
      console.error("❌ Токен не знайдено всередині adminData. Перевірте структуру:", parsedData);
      return;
    }

    console.log("✅ Токен знайдено, відправляю запити...");

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Виконуємо запити паралельно для швидкості
    const [statsRes, settingsRes] = await Promise.all([
      API.get("/blogs/gold-stats", config),
      API.get("/admin/settings", config)
    ]);

    setStats(statsRes.data);

    const { makeWebhookUrl, syncNewPosts } = settingsRes.data;
    if (makeWebhookUrl) {
      console.log("🔗 Webhook URL:", makeWebhookUrl);
      // Твоя логіка очищення URL, якщо потрібно
    }

  } catch (error) {
    console.error("❌ Помилка завантаження:", error.response?.status === 401 ? "Сесія завершена (401)" : error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="loader">Завантаження аналітики...</div>;

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Назад
        </button>
        <h1>
          <FaTrophy style={{ color: '#ffd700', marginRight: '10px' }} /> 
          Аналітика "Золотих" кліків
        </h1>
      </header>

      <div className="stats-summary">
        <div className="summary-card">
          <h3>Унікальних інструментів</h3>
          <p>{stats.length}</p>
        </div>
        <div className="summary-card total">
          <h3>Загальна кількість кліків</h3>
          <p>{stats.reduce((acc, curr) => acc + curr.totalClicks, 0)}</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="gold-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Назва інструменту (з Leads)</th>
              <th style={{ textAlign: 'center' }}><FaMousePointer /> Кліки</th>
              <th><FaClock /> Останній клік</th>
              <th>Тренд</th>
            </tr>
          </thead>
          <tbody>
            {stats.length > 0 ? (
              stats.map((item, index) => (
                <tr key={index}>
      <td>{index + 1}</td>
      <td className="tool-name"><strong>{item._id}</strong></td> 
      <td className="clicks-count" style={{ textAlign: 'center', color: '#6366f1', fontWeight: 'bold' }}>
        {item.totalClicks}
      </td>
      <td>{new Date(item.lastClick).toLocaleString()}</td>
    </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-msg">Даних про кліки поки що немає...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoldAnalytics;
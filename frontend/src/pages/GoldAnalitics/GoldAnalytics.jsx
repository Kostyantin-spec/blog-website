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
    // 1. Беремо актуальні дані з localStorage
    const savedData = localStorage.getItem("adminData");
    if (!savedData) {
      console.error("❌ Токен не знайдено. Перелогіньтесь.");
      setLoading(false);
      return;
    }

    const { token } = JSON.parse(savedData);
    
    // 2. Виконуємо запити БЕЗ ручних config, 
    // бо API інтерцептор автоматично додасть заголовок Authorization
    // Але якщо хочеш бути на 100% впевненою — залишаємо заголовок явним (як нижче):

    const { data: statsData } = await API.get("/blogs/gold-stats", {
        headers: { Authorization: `Bearer ${token}` }
    });
    setStats(statsData);

    const settingsRes = await API.get('/admin/settings', {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    let { makeWebhookUrl, syncNewPosts } = settingsRes.data;

    if (makeWebhookUrl && makeWebhookUrl.includes('https://hook')) {
        // Тут ми залишили твою логіку очищення URL
        const cleanUrl = makeWebhookUrl.split('https').filter(Boolean)[0];
        const finalUrl = 'https' + cleanUrl;
        console.log("🔗 Webhook статус:", syncNewPosts ? "Активний" : "Вимкнений", "URL:", finalUrl);
    }

  } catch (error) {
    console.error("❌ Помилка завантаження статистики:", error.response?.data?.message || error.message);
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
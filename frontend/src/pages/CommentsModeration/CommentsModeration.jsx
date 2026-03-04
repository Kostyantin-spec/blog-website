
import React, { useState, useEffect } from 'react';
import API from '../../api/blogApi.js';
import './CommentsModeration.css';

const CommentsModeration = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для отримання актуального токена
  const getAuthHeader = () => {
    const savedData = localStorage.getItem("adminData");
    if (!savedData) return null;
    const parsedData = JSON.parse(savedData);
    return parsedData.token || (parsedData.admin && parsedData.admin.token);
  };

  const fetchComments = async () => {
    const token = getAuthHeader();
    
    if (!token) {
      setError("Ви не авторизовані. Будь ласка, увійдіть знову.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Використовуємо наш надійний метод з явним заголовком
      const res = await API.get('/admin/comments/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setComments(res.data);
      setError(null);
    } catch (err) {
      console.error("Помилка завантаження коментарів:", err);
      if (err.response?.status === 401) {
        setError("Сесія закінчилася. Перелогіньтеся.");
      } else {
        setError("Не вдалося завантажити коментарі.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [token]);

  const handleApprove = async (id) => {
    const token = getAuthHeader();
    try {
      await API.patch(`/admin/comments/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(prev => prev.filter(c => c._id !== id));
      alert("✅ Коментар схвалено!");
    } catch (err) {
      alert("❌ Помилка при схваленні: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Видалити цей коментар остаточно?")) return;
    
    const token = getAuthHeader();
    try {
      await API.delete(`/admin/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(prev => prev.filter(c => c._id !== id));
      alert("🗑️ Коментар видалено.");
    } catch (err) {
      alert("❌ Помилка при видаленні");
    }
  };

  if (loading)
     return (
  <div className="moderation-container">
    <h1 className="page-title">Модерація коментарів</h1>
    <div className="skeleton-list">
      {[1, 2, 3].map((n) => (
        <div key={n} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-meta">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line med"></div>
            </div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-line long"></div>
            <div className="skeleton-line long"></div>
          </div>
          <div className="skeleton-actions">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  if (error) return (
    <div className="error-container">
      <p className="error-message">{error}</p>
      <button onClick={fetchComments} className="refresh-btn">Спробувати знову</button>
    </div>
  );

  return (
    <div className="moderation-container">
      <div className="moderation-header">
        <h2>Модерація коментарів <span className="count-badge">{comments.length}</span></h2>
        <button onClick={fetchComments} className="refresh-icon-btn" title="Оновити">🔄</button>
      </div>
      
      {comments.length === 0 ? (
        <div className="empty-state">
          <div className="icon">✨</div>
          <p>Нових коментарів немає. Все чисто!</p>
        </div>
      ) : (
        <div className="comments-grid">
          {comments.map(comment => (
            <div key={comment._id} className="comment-card">
              <div className="comment-info">
                <div className="user-meta">
                  <span className="user-name">{comment.name}</span>
                  <span className="user-email">{comment.email}</span>
                </div>
                <div className="article-badge">
                  {comment.articleTitle || "Стаття не вказана"}
                </div>
              </div>
              
              <div className="comment-body">
                <p>"{comment.text}"</p>
              </div>

              <div className="comment-footer">
                <span className="date">
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Дата невідома'}
                </span>
                <div className="comment-actions">
                  <button onClick={() => handleApprove(comment._id)} className="approve-btn">
                    Схвалити
                  </button>
                  <button onClick={() => handleDelete(comment._id)} className="delete-btn">
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsModeration;
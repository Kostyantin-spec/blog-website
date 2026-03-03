import React, { useState } from "react";
import "./SupportAndRating.css"; 
import API from '../../api/blogApi.js';

const SupportAndRating = ({ postId }) => {
  const [rated, setRated] = useState(false);
  const [hover, setHover] = useState(0);

  const handleRate = async (starsCount) => {
  setRated(true);
  try {
    // baseURL автоматично додасть адресу Render
    const response = await API.post(`/blogs/${postId}/rate`, { 
      rating: starsCount 
    });
    console.log("Відповідь сервера:", response.data);
    } catch (err) {
      console.error("Помилка при збереженні рейтингу:", err);
    }
  };

  if (rated) {
    return (
      <div className="support-project-card thanks-message">
        <div className="thanks-icon">❤️</div>
        <h3>Дякуємо за вашу оцінку!</h3>
        <p>
          Ваша підтримка надихає нас писати ще більше корисних матеріалів. 
          Якщо ви ще не спробували сервіс, <b>реєстрація за нашими посиланнями</b> буде найкращим способом подякувати нам!
        </p>
      </div>
    );
  }

  return (
    <div className="support-project-card">
      <div className="support-icon-wrapper">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.5-1 1-4c2 0 3 1 3 1s1 1 1 3Z"></path>
          <path d="M12 15v5s1 .5 4 1c0-2-1-3-1-3s-1-1-3-1Z"></path>
        </svg>
      </div>
      <h3>Подобається наш проект?</h3>
      <p>Ми створюємо ці гайди безкоштовно. Найкраща підтримка для нас — це ваша <b>позитивна оцінка</b>.</p>
      <div className="rating-section">
        <span className="rating-title">Оцініть статтю:</span>
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              className={`star-btn ${hover >= star ? 'active' : ''}`}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportAndRating;
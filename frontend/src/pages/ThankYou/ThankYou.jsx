import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft, FaTelegramPlane, FaNewspaper } from "react-icons/fa";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Автоматичне повернення на головну через 10 секунд
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    // Очищення таймера при розмонтуванні компонента
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you-page">
      <div className="thank-you-card">
        <div className="icon-box">
          <FaCheckCircle className="success-icon" />
        </div>
        
        <h1>Дякуємо за вашу довіру!</h1>
        <p className="main-message">
          Ваша заявка успішно надіслана. Наш менеджер (або робот-автоматизатор 🤖) вже почав її обробляти.
        </p>
        
        <div className="next-steps">
          <h3>Що робити далі?</h3>
          <div className="steps-grid">
            <Link to="/blog" className="step-item">
              <FaNewspaper className="step-icon" />
              <span>Почитати свіжі кейси</span>
            </Link>
            <a 
              href="https://t.me/your_channel" 
              target="_blank" 
              rel="noreferrer" 
              className="step-item"
            >
              <FaTelegramPlane className="step-icon" />
              <span>Зайти в наш Telegram</span>
            </a>
          </div>
        </div>

        <div className="back-home-wrap">
          <Link to="/" className="back-home-btn">
            <FaArrowLeft /> Повернутися на головну
          </Link>
          <p className="auto-redirect">
            Ви будете перенаправлені автоматично через 10 секунд...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
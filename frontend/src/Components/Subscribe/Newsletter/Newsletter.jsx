
import React, { useState } from 'react'; 
import { BsSend, BsCheckCircle } from "react-icons/bs";
import { createUnifiedPayload } from "../../../../../backend/src/utils/createUnifiedPayload.js";
import './Newsletter.css';
import API from '../../../api/blogApi.js';

const socialAvatars = [
  "https://i.pravatar.cc/150?img=47",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=5"
];

const Newsletter = () => {
  // Використовуємо локальні стани, щоб не залежати від проблемного хука
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFooterSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  setLoading(true);

  // 1. Формуємо blogData для футера
  const blogData = {
    authorEmail: email,
    title: "Підписка на розсилку",
    description: "Підписка на новини з футера",
    slug: "footer-subscription"
  };

  // 2. Використовуємо уніфікований формат
  const payload = createUnifiedPayload("footer_subscription", blogData, { siteName: "marketingkit.com" });

  try {
  // 1. Відправляємо дані на наш бекенд (Render)
  // Наш сервер сам знає актуальний URL Make.com із налаштувань у базі
  const response = await API.post("/send-to-make", payload);

  // 2. Axios вважає успішним статус 2xx (200, 201)
  if (response.status === 200 || response.status === 201) {
    setSuccess(true);
    
    // Очищаємо форму (через e.target.reset або занулення стейтів)
    if (e.target.reset) e.target.reset();
    
    console.log("Дані успішно передані на бекенд для Make.com");
  } else {
    alert("Помилка при відправці. Спробуйте пізніше.");
  }
  } catch (err) {
    console.error("Помилка:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="subscribe">
      {success ? (
        <div className="newsletter-success" style={{ padding: '60px', textAlign: 'center', width: '100%' }}>
          <BsCheckCircle size={50} color="#28a745" style={{ marginBottom: '20px' }} />
          <h3>Дякуємо за довіру! 🎉</h3>
          <p>Найцікавіше вже готується до відправки на твій Email.</p>
        </div>
      ) : (
        <>
          <div className="left">
            <h2>Приєднуйся до 5,000+ маркетологів</h2>
            <p>Раз на тиждень надсилаю добірку інструментів та кейсів, які перевірив особисто.</p>
          </div>

          <div className="social-proof">
            <div className="avatars-stack">
              {socialAvatars.map((url, index) => (
                <img key={index} src={url} alt="Subscriber" className="avatar-img" />
              ))}
            </div>
            <p className="proof-text">
              Вже підписалися: <strong>5240+ людей</strong>
            </p>
          </div>
          
          <div className="right">
            <form onSubmit={handleFooterSubmit}>
              <input 
                name="email" 
                type="email" 
                placeholder="Твій Email" 
                required 
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? (
                  <div className="spinner"></div> 
                ) : (
                  <>
                    <BsSend /> <span>Підписатися</span>
                  </>
                )}
              </button>
            </form>
            <p className="privacy-info" style={{ marginTop: '15px', fontSize: '12px', opacity: 0.6 }}>
              Натискаючи кнопку, ти погоджуєшся з політикою конфіденційності.
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default Newsletter;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

import { useNavigate } from "react-router-dom";
import createUnifiedPayload from '../../../../backend/utils/createUnifiedPayload';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState(""); 
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!agreed) {
    alert("Будь ласка, підтвердіть згоду з політикою конфіденційності.");
    return;
  }

  setLoading(true);
  setStatus("");

  // 1. Формуємо дані
  const blogData = {
    author_name: formData.name,
    authorEmail: formData.email,
    description: formData.message,
    title: "Контактна форма"
  };

  // 2. Уніфікуємо
  const payload = createUnifiedPayload("contact_form", blogData, { siteName: "marketingkit.com" });

  try {
    const webhookUrl = localStorage.getItem("makeWebhookUrl") || "http://localhost:5000/api/send-to-make";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setFormData({ name: "", email: "", message: "" });
      setAgreed(false);
      navigate("/thank-you"); 
    } else {
      setStatus("error");
      console.error("Помилка при відправці в Make.com");
    }
  } catch (err) {
    console.error("Contact error:", err);
    setStatus("error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="contact-title">Зв'яжіться з нами</h1>
          <p>
            Маєте ідею для колаборації або запитання про маркетинг? Пишіть нам!
          </p>

          <div className="info-details">
            <p><strong>Email:</strong> hello@marketingkit.com</p>
            <p><strong>Telegram:</strong> @marketingkit_admin</p>
            <p><strong>Локація:</strong> Київ, Україна </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ваше ім'я</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ваше ім'я"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Повідомлення</label>
            <textarea
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Опишіть ваше питання..."
              required
            ></textarea>
          </div>

          {/* ЧЕКБОКС ЗГОДИ */}
          <div className="legal-checkbox-group">
            <input 
              type="checkbox" 
              id="contact-agree" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)} 
            />
            <label htmlFor="contact-agree">
              Я згоден з <Link to="/privacy-policy" target="_blank">політикою конфіденційності</Link>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Відправка..." : "Надіслати"}
          </button>

          {/* ПОВІДОМЛЕННЯ ПРО СТАТУС */}
          {status === "success" && (
            <p className="success-msg">Повідомлення надіслано! Ми відповімо найближчим часом.</p>
          )}
          {status === "error" && (
            <p className="error-msg">Помилка відправки. Спробуйте через Telegram.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
import React, { useState } from "react";
import "./Advert.css";
import { useNavigate } from "react-router-dom";
import { createUnifiedPayload } from "../../../../backend/src/utils/createUnifiedPayload.js";
import API from '../../api/blogApi.js';


const Advert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const openModal = (pkgTitle) => {
    setSelectedPackage(pkgTitle);
    setIsModalOpen(true);
    setAgreed(false); 
  };

  const handleSend = async (e) => {
  e.preventDefault();

  if (!agreed) {
    alert("Будь ласка, підтвердіть згоду з політикою конфіденційності.");
    return;
  }

  setLoading(true);

  const blogData = {
    author_name: formData.name, 
    authorEmail: formData.contact, 
    description: formData.message,
    title: `Запит: ${selectedPackage}`,
   
    category: selectedPackage 
  };

  const payload = createUnifiedPayload("ads_request", blogData, { siteName: "marketingkit.com" });

  try {
  setLoading(true);

  // 1. Відправляємо дані на наш бекенд (Render)
  // Бекенд сам знає актуальний URL Make.com із бази даних
  const response = await API.post("/send-to-make", payload);

  // 2. Axios вважає успішним статус 2xx
  if (response.status === 200 || response.status === 201) {
    setFormData({ name: "", contact: "", message: "" });
    setIsModalOpen(false);
    navigate("/thank-you");
  } else {
    alert("Помилка при відправці.");
  }
} catch (err) {
  console.error("Помилка відправки форми:", err);
  
  // Якщо помилка мережі або сервера
  if (err.response?.status === 404) {
    alert("Маршрут не знайдено. Перевірте налаштування бекенду.");
  } else {
    alert("Сервер тимчасово недоступний. Будь ласка, напишіть нам у Telegram.");
  }
} finally {
  setLoading(false);
}
};

  const adPackages = [
    {
      title: "Стандарт",
      price: "1500₴",
      description: "Ідеально для SEO та впізнаваності",
      features: ["Рекламна стаття (вічно)", "До 2-х Do-follow посилань", "Адаптація під SEO-ключі", "Шерінг у соцмережах"],
      recommended: false
    },
    {
      title: "Партнерський",
      price: "4500₴",
      description: "Глибоке занурення у ваш продукт",
      features: ["Детальний огляд сервісу", "Відео-демонстрація (gif/mp4)", "Закріплення на головній (14 днів)", "Включення в розсилку", "Блок 'Розумна рекомендація'"],
      recommended: true
    },
    {
      title: "Автоматизація",
      price: "від 8000₴",
      description: "Для SaaS та складних інструментів",
      features: ["Сценарій на Make.com", "Стаття-кейс використання", "Налаштування під ключ", "Прямий лід-ген через форми"],
      recommended: false
    },
  ];

  return (
    <div className="advert-page">
      {/* HERO SECTION */}
      <section className="advert-hero">
        <div className="container">
          <span className="badge-advert">MarketingKit 2026</span>
          <h1>Масштабуйте свій бізнес разом з нами</h1>
          <p>Вашу рекламу побачать ті, хто шукає рішення для автоматизації та маркетингу.</p>
          <a href="#pricing" className="main-btn">Переглянути прайс</a>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-grid container">
        <div className="stat-item">
          <div className="stat-value">60,000+</div>
          <div className="stat-label">Унікальних візитів/міс</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">4.5 хв</div>
          <div className="stat-label">Час читання</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12,000+</div>
          <div className="stat-label">База розсилки</div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-section container">
        <h2 className="section-title">Формати розміщення</h2>
        <div className="packages-container">
          {adPackages.map((pkg, index) => (
            <div key={index} className={`package-card ${pkg.recommended ? 'featured' : ''}`}>
              {pkg.recommended && <span className="popular-label">Популярний</span>}
              <h3>{pkg.title}</h3>
              <p className="pkg-desc">{pkg.description}</p>
              <div className="price-tag">{pkg.price}</div>
              <ul className="features-list">
                {pkg.features.map((f, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="check-icon">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="order-btn" onClick={() => openModal(pkg.title)}>Замовити пакет</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner container">
        <h2>Маєте індивідуальний запит?</h2>
        <button className="secondary-btn" onClick={() => openModal("Індивідуальний запит")}>
          Зв'язатися з адміном
        </button>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay_advert" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content_advert" onClick={(e) => e.stopPropagation()}>
             <div className="modal-glow_advert"></div>

            <button className="close-modal_advert" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            {!isSent ? (
              <>
                <h2>Заявка: {selectedPackage}</h2>
                <form onSubmit={handleSend}>
                  <input 
                    type="text" 
                    placeholder="Ваше ім'я" 
                    required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Telegram або Email" 
                    required 
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                  <textarea 
                    placeholder="Ваші побажання"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>

                  {/* ЧЕКБОКС ПЕРЕНЕСЕНО СЮДИ */}
                  <div className="modal-checkbox_advert">
                    <input 
                      type="checkbox" 
                      id="modal-agree" 
                      checked={agreed} 
                      onChange={(e) => setAgreed(e.target.checked)} 
                    />
                    <label htmlFor="modal-agree_advert">
                      Згоден з <a href="/privacy-policy" target="_blank">політикою</a> та <a href="/terms" target="_blank">правилами</a>
                    </label>
                  </div>

                  <button type="submit" className="submit-form-btn_advert" disabled={loading}>
                    {loading ? "Відправка..." : "Відправити запит"}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message_advert">
                <div className="check-circle_advert">✓</div>
                <h2>Дякуємо!</h2>
                <p>Ваша заявка успішно надіслана. Очікуйте повідомлення.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Advert;
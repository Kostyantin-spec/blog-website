
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { IoClose } from "react-icons/io5";
import { BsLightningCharge, BsCheckCircle } from "react-icons/bs";
import { createUnifiedPayload } from '../../../../backend/utils/createUnifiedPayload';
import './Modal.css';
import API from '../../api/blogApi.js';

const Modal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Блокуємо прокрутку фону
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/files/top-10-tools.pdf";
    link.setAttribute("download", "Top_10_Marketing_Tools_2026.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!agreed) {
    alert("Будь ласка, підтвердіть згоду з політикою конфіденційності");
    return;
  }

  const email = e.target.email.value;
  setLoading(true);

  // 1. Формуємо дані як "блог-дані"
  const blogData = {
    authorEmail: email, 
    title: "Завантаження ТОП-10 сервісів",
    description: "Користувач завантажив PDF через попап",
    slug: "top-10-tools-download"
  };

  // 2. Використовуємо уніфікований формат payload
  const payload = createUnifiedPayload("exit_intent_popup", blogData, { 
    siteName: "marketingkit.com" 
  });

  try {
    // 3. Відправляємо через наш централізований API клієнт
    // Він автоматично постукає на твій Render (/api/send-to-make)
    const response = await API.post("/send-to-make", payload);

    // Axios вважає успішним статус 2xx
    if (response.status === 200 || response.status === 201) {
      setSuccess(true);
      downloadPDF();
      
      setTimeout(() => {
        onClose();
        setTimeout(() => setSuccess(false), 500);
      }, 3000);
    } else {
      throw new Error("Сервер не відповів");
    }
  } catch (err) {
    console.error("Помилка відправки попапа:", err);
    alert("Виникла помилка. Спробуйте пізніше або зверніться в підтримку.");
  } finally {
    setLoading(false);
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay_nav" onClick={onClose}>
  <motion.div 
    className="modal-content_nav"
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 20 }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* ДЕКОРАТИВНІ ЕЛЕМЕНТИ */}
    <div className="modal-grid-bg"></div>
    <div className="modal-glow-top"></div>
    
    <button className="close-btn_nav" onClick={onClose}><IoClose /></button>
    
    <div className="modal-inner_nav">
      <div className="modal-left_nav">
        <div className="modal-badge_nav">Ексклюзивно 2026</div>
        <h2>ТОП-10 сервісів для маркетингу</h2>
        <p>Ми протестували 150+ інструментів і відібрали найкращі для твого росту.</p>
        <ul className="modal-features_nav">
          <li><span>✓</span> Перевірені AI-інструменти</li>
          <li><span>✓</span> Аналіз вартості та ROI</li>
          <li><span>✓</span> Прямі посилання на тріали</li>
        </ul>
      </div>

      <div className="modal-right_nav">
        {!success ? (
          <form className="modal-form_nav" onSubmit={handleSubmit}>
            <h3>Куди надіслати список?</h3>
            <div className="input-group_nav">
               <input 
                name="email" 
                type="email" 
                placeholder="Твій Email" 
                required 
              />
            </div>
            
            <div className="modal-checkbox-group_nav">
              <input 
                type="checkbox" 
                id="modal-agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                required 
              />
    <label htmlFor="modal-agree">
      Згоден з <a href="/privacy-policy" target="_blank">політикою</a>
    </label>
  </div>


                  <button type="submit" className="submit-btn_nav" disabled={loading}>
                     {loading ? (
                      <div className="loader-spinner_nav"></div>
                     ) : (
                       <>Отримати PDF зараз <BsLightningCharge /></>
                     )}
                   </button>
                  <p className="privacy-text_nav">Без спаму. Тільки користь.</p>
                </form>
              ) : (
                <motion.div className="success-content_nav">
                  <BsCheckCircle size={60} color="#28a745" />
                  <h3>Дякуємо!</h3>       
                   <p>Завантаження почалося автоматично.</p>
                </motion.div>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
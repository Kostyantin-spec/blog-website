
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
// Перевір, чи цей шлях ПРАВИЛЬНИЙ (чи є файл за такою адресою)
import TestModal from "../TestModal/TestModal"; 
import './Hero.css'

const Hero = () => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero">
      <div className="hero_content">
        <h1>Тільки перевірені інструменти для вашого онлайн-проєкту.</h1>
        <p>Відкриваємо "під капот" популярних платформ. Дізнайтеся, які SaaS-рішення
           допоможуть вам автоматизувати продажі та обійти конкурентів.</p>

        <div className="hero_actions">
          <button className="cta-button primary" onClick={() => navigate('/tools')}>
            Почати з топ-рішень
          </button>
          <button className="cta-button secondary" onClick={() => setIsModalOpen(true)}>
            Як ми тестуємо
          </button>
        </div>
      </div>

      <TestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
import React from 'react';
import './FAQ.css';

const FAQ = ({ faqs }) => {
  

  if (!faqs || faqs.length === 0) {
    return null; 
  }

  return (
    <div className="faq-section-wrapper">
      <div className="faq-header">
        <h2 className="sidebar-title-glass">Відповіді на ваші запитання</h2>
        <p className="faq-subtitle">
          Ми проаналізували сотні відгуків та технічну документацію, щоб розібрати найважливіші нюанси сервісу.
        </p>
      </div>

      <div className="faq-accordion">
        {faqs.map((faq, index) => (
          <details key={index} className="faq-item-glass">
            <summary className="faq-summary">
              {faq.question || "Питання без тексту"}
              <span className="faq-chevron">↓</span>
            </summary>
            <div className="faq-answer-content">
              {faq.answer || "Відповідь відсутня"}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
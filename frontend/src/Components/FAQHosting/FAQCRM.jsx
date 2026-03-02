import React, { useState } from 'react';

const FAQCRM = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Як обрати CRM для малого бізнесу в Україні?",
      answer: "Для малого бізнесу важливо обирати CRM з легким впровадженням та інтеграцією з локальними сервісами (Нова Пошта, ПРРО, укр. банки). Зверніть увагу на KeyCRM або SalesDrive, якщо ви займаєтесь товаркою, або KeepinCRM для сфери послуг."
    },
    {
      question: "Чи є безкоштовні CRM системи?",
      answer: "Так, багато світових лідерів, як HubSpot або Zoho, мають безкоштовні тарифи з обмеженим функціоналом. Серед українських сервісів часто надається безкоштовний тестовий період від 14 до 30 днів."
    },
    {
      question: "Що краще: українська CRM чи світовий лідер?",
      answer: "Українські CRM (KeyCRM, SalesDrive) краще адаптовані під наш ринок: вони вже мають вбудовані інтеграції з Rozetka, Prom, Olx та українськими службами доставки. Світові лідери (Salesforce, HubSpot) потужніші в плані AI та глобального маркетингу."
    },
    {
      question: "Чи можна інтегрувати CRM з Make.com?",
      answer: "Більшість сучасних CRM мають відкритий API. Ви можете легко налаштувати Webhook в нашій адмінці та передавати дані з вашого сайту в будь-яку CRM через Make (Integromat) без програмування."
    },
    {
      question: "Скільки часу займає впровадження CRM?",
      answer: "Хмарні рішення (SaaS) можна налаштувати за 1-3 дні. Складніші системи для великих підприємств (наприклад, Creatio) можуть вимагати від кількох тижнів до місяців для повної автоматизації процесів."
    }
  ];

  return (
    <div className="hst-faq-section animate-fade-in">
      <div className="hst-faq-header">
        <span className="badge-advert badge-blue">Поради експертів</span>
        <h2 className='hst-faq-title'>Часті запитання про CRM</h2>
      </div>
      
      <div className="hst-faq-grid hst-faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`hst-faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <div className="hst-faq-question">
              <h3>{faq.question}</h3>
              <span className="hst-faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="hst-faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQCRM;
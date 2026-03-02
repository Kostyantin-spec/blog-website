import React, { useState } from 'react';
import './FAQHosting.css';

const FAQHosting = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Скільки коштує веб-хостинг?",
      answer: "Цінові пропозиції на веб-хостинг мають широкий асортимент: від пари доларів на місяць до кількох сотень. Ціна залежить від типу хостингу. Базовий хостинг простого веб-сайту зазвичай є найдешевшим варіантом, проте якщо вам потрібна «хмара» або VPS-хостинг, тоді ви маєте бути готові заплатити більше. Ціна також збільшується, якщо потрібні функції як SSL-захист."
    },
    {
      question: "Як обрати найкращу пропозицію від хостингів?",
      answer: "Визначте список необхідного функціоналу: тип дискового сховища, перепускна здатність, кількість сайтів. Найкраща пропозиція — це поєднання простоти, високої швидкості, безперебійної роботи, якісної підтримки та ціни. Ознайомтесь з нашим списком кращих хостингових компаній вище."
    },
    {
      question: "Чи потрібен мені промо-код для отримання знижки на хостинг?",
      answer: "Багато компаній дають знижки при оплаті за рік, але промо-код лишається найкращим способом переконатися, що ви отримаєте максимально вигідну пропозицію."
    },
    {
      question: "Як скористатися купоном для заощадження грошей?",
      answer: "Оберіть тарифний план та почніть оформлення. Введіть код купону у відповідне текстове поле при оплаті, і ви побачите розмір знижки. Завершіть оформлення та насолоджуйтесь заощадженнями!"
    },
    {
      question: "Як часто ви оновлюєте сторінку з промо-кодами?",
      answer: "Ми регулярно оновлюємо цю сторінку та додаємо найновіші промо-коди. Купони проходять прискіпливу перевірку, тому ми точно знаємо, що вони працюють. Регулярно перевіряйте нові пропозиції тут."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="hst-faq-section">
      <span className="badge-advert badge-blue">Поради експертів</span>
  <h2 className="hst-faq-title">Найчастіші питання</h2>
  <div className="hst-faq-container">
    {faqData.map((item, index) => (
      <div 
        key={index} 
        className={`hst-faq-item ${activeIndex === index ? 'hst-active' : ''}`}
        onClick={() => toggleFAQ(index)}
      >
        <div className="hst-faq-question">
          <span>{item.question}</span>
          <span className="hst-faq-icon">
            {activeIndex === index ? '−' : '+'}
          </span>
        </div>
        {activeIndex === index && (
          <div className="hst-faq-answer hst-animate-fade">
            <p>{item.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
</section>
  );
};

export default FAQHosting;
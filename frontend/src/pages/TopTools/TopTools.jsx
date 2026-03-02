import React, {useState} from 'react';
import './TopTools.css';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const PromoBanner = ({ count }) => (
  <div className="promo-info-banner">
     <div className="promo-banner-content">
    <h3>Маркетингові інструменти — Акції та сервіси 2026</h3>
    <p>
      Ми зібрали <strong>{count} професійних сервісів</strong> для просування вашого бізнесу. 
      Від SEO-аналітики до автоматизації розсилок — все, що потрібно для зростання продажів, в одному каталозі.
    </p>
  </div>
   <div className="promo-banner-glow"></div>
        </div>
);


const GoldPage = () => {

  const [selectedOffer, setSelectedOffer] = useState(null);

  const tools = [
    {
      id: 1,
      title: "NetHunt CRM — Українська Революція",
      screenshot: "../../../klaviyo.png", 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      tagline: "CRM у Gmail, яка скоротила час на управління клієнтами на 40%",
      stats: [
        { label: "Економія часу", value: "-40%" },
        { label: "Втрачених лідів", value: "0" }
      ],
      features: [
        "Вбудована у Gmail",
        "Інтеграція з Telegram/Viber",
        "Українська компанія"
      ],
      price: "від $29/міс",
      cta: "Почати безплатно (14 днів)",
      link: "https://nethunt.com/?via=your-id", // Твоє афіліат посилання
      color: "#4285F4"
    },
    {
      id: 2,
      title: "Serpstat — Потужне SEO з Києва",
      screenshot: "../../../activecampaign.png", 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00b2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      tagline: "На 33% дешевше ніж SEMrush. Збільшив трафік на 120%.",
      stats: [
        { label: "Ріст трафіку", value: "+120%" },
        { label: "Економія/рік", value: "$468" }
      ],
      features: [
        "230M+ ключових слів",
        "55+ SEO інструментів",
        "Дешевше за аналоги"
      ],
      price: "від $69/міс",
      cta: "Сканувати сайт безкоштовно",
      link: "https://serpstat.com/?ref=your-id",
      color: "#00b2ff"
    },
    {
      id: 3,
      title: "Brevo — Email + SMS + CRM",
      screenshot: "../../../klaviyo.png",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d285" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
      tagline: "На 60% дешевше ніж Mailchimp. Заощадив $200/місяць.",
      isBest: true, 
      stats: [
        { label: "Конверсія", value: "+35%" },
        { label: "Заощаджено", value: "$200/міс" }
      ],
      features: [
        "Email + SMS в одному",
        "300 email/день безкоштовно",
        "Автоматизація в 1 клік"
      ],
      price: "від $20/міс",
      cta: "Отримати безкоштовний тариф",
      link: "https://www.brevo.com/?tap_a=your-id",
      color: "#00d285"
    }
  ];

  const schemaData = {
  "@context": "https://schema.org/",
  "@type": "ItemList",
  "itemListElement": tools.map((tool, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": tool.title,
      "image": `https://marketingkit.com/${tool.screenshot.replace('../../../', 'images/')}`,
      "description": tool.tagline,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": tool.price.replace(/[^0-9.]/g, ''),
        "availability": "https://schema.org/InStock"
      },
      "brand": {
        "@type": "Brand",
        "name": tool.title.split(' — ')[0]
      }
    }
  }))
};

  const handleToolClick = async (tool) => {
  setSelectedOffer({
    name: tool.title,
    logo: tool.screenshot,
    price: tool.price,
    link: tool.link,
    color: tool.color
  });

  try {
    
    await axios.post('http://localhost:5000/api/send-to-make', {
      name: "Користувач (Клік)", 
      email: "click-tracker@marketingkit.com", 
      text: `Відкрито модалку для: ${tool.title}`,
      source: "Gold Page Modal Open", 
      articleTitle: tool.title, 
      articleSlug: "gold-page",
      contact: "n/a"
    });
    
  } catch (err) {
    console.error("Трекінг помилка:", err.message);
  }
};

  return (
    <div className="gold-page-wrapper">
      <div className="gold-container">

            <Helmet>
                <title>Маркетингові інструменти 2026 — Автоматизація та CRM</title>
                 <meta name="description" content="Збільшуйте продажі за допомогою кращих маркетингових сервісів. Email-розсилки, аналітика та автоматизація." />
                    
                      {/* JSON-LD Schema */}
                    <script type="application/ld+json">
                      {JSON.stringify(schemaData)}
                    </script>

                   {/* Open Graph / Facebook */}
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content="https://твій-сайт.com/marketing" />
                  <meta property="og:title" content="Топ інструментів для маркетингу 2026" />
                  <meta property="og:description" content="Все для вашого маркетингу в одному місці. Порівнюйте сервіси та заощаджуйте на підписках." />
                  <meta property="og:image" content="https://твій-сайт.com/images/marketing-og.jpg" />

                      {/* Twitter */}
                   <meta name="twitter:card" content="summary_large_image" />
             </Helmet>

        <header className="gold-header animate-fade-in">
          <h1>Топ-рішення для вашого бізнесу</h1>
          <p>Інструменти, які я особисто протестував та рекомендую для автоматизації та росту.</p>
        </header>

        <PromoBanner count={tools.length} />

        <div className="gold-grid">
          {tools.map(tool => (
            <div key={tool.id} className={`gold-card ${tool.isBest ? 'best-choice' : ''} animate-fade-in`}>
              <div className="card-image-wrapper">
                {tool.isBest && <div className="premium-badge">Мій вибір №1</div>}
                <div className="card-image-container">
                  <img src={tool.screenshot} alt={tool.title} className="tool-screenshot" />
                  <div className="image-overlay"></div>
                </div>
              </div>
              
              <div className="card-content">
                <div className="card-title-row">
                  <div className="tool-icon-wrapper" style={{ boxShadow: `0 0 15px ${tool.color}33` }}>
                    {tool.icon} 
                  </div>
                  <h3 className='card-title-brevo' >{tool.title}</h3>
                </div>
                <p className="tool-tagline">{tool.tagline}</p>

                <div className="stats-box">
                  {tool.stats.map((s, i) => (
                    <div key={i} className="stat-item">
                      <span className="stat-val" style={{ color: tool.color }}>{s.value}</span>
                      <span className="stat-lab">{s.label}</span>
                    </div>
                  ))}
                </div>

                <ul className="feature-list">
                  {tool.features.map((f, i) => (
                    <li key={i}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tool.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="price-info">
                  <span>Ціна: <strong>{tool.price}</strong></span>
                </div>

                {/* Афілійоване посилання: відкривається в новому вікні */}
                <button 
              onClick={() => handleToolClick(tool)} 
              className="gold-cta" 
              style={{ backgroundColor: tool.color }}
            >
                  {tool.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="gold-footer-note animate-fade-in">
          <div className="note-content">
                  <svg 
                       width="24" 
                       height="24" 
                       viewBox="0 0 24 24" 
                       fill="none" 
                       stroke="#f59e0b" 
                       strokeWidth="2" 
                       strokeLinecap="round" 
                       strokeLinejoin="round"
                       className="note-icon"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                 <path d="M10 22h4" />
                    </svg>
             <p>
                    <strong>Чому я це рекомендую?</strong> Кожен інструмент у цьому списку був перевірений мною на реальних проєктах.
             </p>
          </div>
        </div>
        {/* В КІНЦІ ПЕРЕД ОСТАННІМ </div> */}
{selectedOffer && (
  <div className="offer-modal-overlay" onClick={() => setSelectedOffer(null)}>
    <div className="gold-modal-content" onClick={e => e.stopPropagation()}>
      <button className="gold-modal-close" onClick={() => setSelectedOffer(null)}>×</button>
      <div className="gold-modal-header">
        <div className="modal-logo-circle" style={{ borderColor: selectedOffer.color }}>
          <img src={selectedOffer.logo} alt={selectedOffer.name} />
        </div>
        <div className="success-badge-mini">Пропозицію активовано</div>
      </div>
      <div className="gold-modal-body">
        <h2>{selectedOffer.name}</h2>
        <p className="modal-price-tag">Доступ: <span>{selectedOffer.price}</span></p>
        <div className="gold-promo-box">
          <div className="promo-status">
             <span className="pulse-dot-green"></span>
             Партнерська знижка активована
          </div>
          <p>Перейдіть за посиланням, щоб отримати умови для <strong>MARKETINGKIT</strong>.</p>
        </div>
      </div>
      <button 
        className="gold-confirm-btn" 
        onClick={() => {
          // Фінальний клік перед переходом
          window.open(selectedOffer.link, '_blank', 'noopener,noreferrer');
          setSelectedOffer(null);
        }}
        style={{ 
          backgroundColor: selectedOffer.color,
          boxShadow: `0 10px 25px ${selectedOffer.color}44` 
        }}
      >
        Перейти до сервісу
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default GoldPage;
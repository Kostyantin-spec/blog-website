import React, { useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import FAQCRM from '../../Components/FAQHosting/FAQCRM';
import './TopTools.css';
import axios from 'axios';


const TopToolsCRM = () => {
  const [filter, setFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const location = useLocation();

  const allCRMTools = [
  {
    id: 401,
    name: "KeyCRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://keycrm.app/favicon.ico",
    features: ["Інтеграція з Rozetka/Prom", "Всі месенджери в одному", "Складський облік"],
    price: "від $19/міс",
    discount: "Тріальний період",
    link: "https://ua.keycrm.app?join=SJQ1DBKJ",
    color: "#0066FF"
  },
  {
    id: 402,
    name: "SalesDrive",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://salesdrive.ua/favicon.ico",
    features: ["Швидка обробка замовлень", "Інтеграція з Нова Пошта", "Телефонія"],
    price: "від 539 грн/міс",
    discount: "Знижка при оплаті за рік",
    link: "https://salesdrive.ua/",
    color: "#28a745"
  },
  {
    id: 403,
    name: "OneBox OS",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://1box.pro/favicon.ico",
    features: ["Гнучка автоматизація", "Власний маркетплейс", "ERP можливості"],
    price: "Є безкоштовний тариф",
    discount: "Open source версія",
    link: "https://1box.pro/",
    color: "#000000"
  },
  {
    id: 404,
    name: "Asteril CRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://asteril.com/favicon.ico",
    features: ["Для інтернет-торгівлі", "Дропшипінг", "Інтеграція з маркетплейсами"],
    price: "від 450 грн/міс",
    discount: "Безкоштовний тест",
    link: "https://asteril.com/",
    color: "#ff4f00"
  },
  {
    id: 405,
    name: "KeepinCRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://keepincrm.com/favicon.ico",
    features: ["Простий інтерфейс", "Фінанси та склад", "Лід-менеджмент"],
    price: "Безкоштовно до 1 юзера",
    discount: "Доступна ціна",
    link: "https://keepincrm.com?sref=435",
    color: "#4c6ef5"
  },
  {
    id: 406,
    name: "NetHunt CRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://nethunt.com/favicon.ico",
    features: ["Інтеграція з Gmail", "Автоматизація продажів", "LinkedIn інтеграція"],
    price: "від $24/міс",
    discount: "Українське коріння",
    link: "https://nethunt.com/",
    color: "#33b5e5"
  },
  {
    id: 407,
    name: "Creatio (Terrasoft)",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://www.creatio.com/favicon.ico",
    features: ["No-code платформа", "Enterprise рішення", "AI інструменти"],
    price: "За запитом",
    discount: "Лідер ринку",
    link: "https://www.creatio.com/",
    color: "#f94c10"
  },
  {
    id: 408,
    name: "Uspacy",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://uspacy.ua/favicon.ico",
    features: ["Соціальна мережа компанії", "Завдання та проєкти", "Спілкування в командах"],
    price: "від 299 грн/міс",
    discount: "Є Free тариф",
    link: "https://uspacy.ua/",
    color: "#6b46ff"
  },
  {
    id: 409,
    name: "Perfectum CRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://perfectum.ua/favicon.ico",
    features: ["Хмарна та коробкова версія", "Модульна система", "Адаптація під бізнес"],
    price: "від 600 грн/міс",
    discount: "Акція на впровадження",
    link: "https://perfectum.ua/",
    color: "#00a1e4"
  },
  {
    id: 410,
    name: "HugeProfit",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://h-profit.com/favicon.ico",
    features: ["Простий облік товарів", "Для малого бізнесу", "Telegram бот"],
    price: "від 150 грн/міс",
    discount: "14 днів тесту",
    link: "https://h-profit.com/",
    color: "#2ecc71"
  },
  {
    id: 411,
    name: "LP-CRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://lp-crm.biz/favicon.ico",
    features: ["Для товарного бізнесу", "Аналітика лендінгів", "Масові розсилки"],
    price: "від $10/міс",
    discount: "Швидкий старт",
    link: "https://lp-crm.biz/",
    color: "#34495e"
  },
  {
    id: 412,
    name: "Recruitee (засновники укр)",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://recruitee.com/favicon.ico",
    features: ["HR-процеси", "Управління кандидатами", "Брендинг роботодавця"],
    price: "від $199/міс",
    discount: "Для рекрутингу",
    link: "https://recruitee.com/",
    color: "#30d5c8"
  },
  {
    id: 413,
    name: "FOKUS CRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://fokus-crm.com.ua/favicon.ico",
    features: ["Управління дзвінками", "Клієнтська база", "Звіти по менеджерах"],
    price: "від 400 грн/міс",
    discount: "Легка інтеграція",
    link: "https://fokus-crm.com.ua/",
    color: "#0052cc"
  },
  {
    id: 414,
    name: "VoiceSpin",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://voicespin.com/favicon.ico",
    features: ["Кол-центр + CRM", "AI обробка дзвінків", "Глобальний зв'язок"],
    price: "Індивідуально",
    discount: "Для великих команд",
    link: "https://voicespin.com/",
    color: "#ffc107"
  },
  {
    id: 415,
    name: "CRM Genesis",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://crm-genesis.com/favicon.ico",
    features: ["Консалтинг та впровадження", "Налаштування Amo/Pipedrive", "Підтримка"],
    price: "За проєкт",
    discount: "Експертний підхід",
    link: "https://crm-genesis.com/",
    color: "#e74c3c"
  },
  {
    id: 416,
    name: "PeopleForce",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://peopleforce.io/favicon.ico",
    features: ["HRM система", "Відпустки та KPI", "Автоматизація онбордингу"],
    price: "від $2/співробітник",
    discount: "Для IT команд",
    link: "https://peopleforce.io/",
    color: "#2b3d51"
  },
  {
    id: 417,
    name: "Torgsoft",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://torgsoft.ua/favicon.ico",
    features: ["Облік у магазині", "Склад і каса", "Робота з РРО"],
    price: "від 2000 грн (ліцензія)",
    discount: "Український стандарт",
    link: "https://torgsoft.ua/",
    color: "#8e44ad"
  },
  {
    id: 418,
    name: "Clientbase",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://clientbase.com.ua/favicon.ico",
    features: ["Конструктор таблиць", "Email/SMS маркетинг", "Права доступу"],
    price: "від 350 грн/міс",
    discount: "Безкоштовний тест",
    link: "https://clientbase.com.ua/",
    color: "#16a085"
  },
  {
    id: 419,
    name: "G-PLUS CRM",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://g-plus.com.ua/favicon.ico",
    features: ["Для нерухомості", "База об'єктів", "Інтеграція з порталами"],
    price: "від $15/міс",
    discount: "Для рієлторів",
    link: "https://g-plus.com.ua/",
    color: "#f39c12"
  },
  {
    id: 420,
    name: "Yaware",
    category: "crm-tools",
    location: "ukraine",
    logo: "https://yaware.com.ua/favicon.ico",
    features: ["Трекер продуктивності", "Тайм-менеджмент", "Звіти по роботі"],
    price: "від 180 грн/міс",
    discount: "Підвищення KPI",
    link: "https://yaware.com.ua/",
    color: "#c0392b"
  },
  {
    id: 451,
    name: "Salesforce",
    category: "crm-tools",
    location: "world",
    logo: "https://www.salesforce.com/favicon.ico",
    features: ["№1 у світі", "AI аналітика Einstein", "Екосистема додатків"],
    price: "від $25/міс",
    discount: "Для Enterprise",
    link: "https://www.salesforce.com/",
    color: "#00a1e0"
  },
  {
    id: 452,
    name: "HubSpot CRM",
    category: "crm-tools",
    location: "world",
    logo: "https://www.hubspot.com/favicon.ico",
    features: ["Краща безкоштовна версія", "Inbound маркетинг", "Зручний інтерфейс"],
    price: "Є безкоштовний тариф",
    discount: "Free Forever",
    link: "https://www.hubspot.com/",
    color: "#ff7a59"
  },
  {
    id: 453,
    name: "Zoho CRM",
    category: "crm-tools",
    location: "world",
    logo: "https://www.zoho.com/favicon.ico",
    features: ["Інтеграція з Zoho Suite", "Гнучка кастомізація", "Канбан-дошки"],
    price: "від $14/міс",
    discount: "15 днів тесту",
    link: "https://www.zoho.com/crm/",
    color: "#e3182b"
  },
  {
    id: 454,
    name: "Pipedrive",
    category: "crm-tools",
    location: "world",
    logo: "https://www.pipedrive.com/favicon.ico",
    features: ["Фокус на угодах", "Простий дизайн", "Автоматизація робочих процесів"],
    price: "від $12.50/міс",
    discount: "Спрощений старт",
    link: "https://www.pipedrive.com/",
    color: "#222222"
  },
  {
    id: 455,
    name: "Monday.com CRM",
    category: "crm-tools",
    location: "world",
    logo: "https://monday.com/favicon.ico",
    features: ["Візуальне управління", "Дуже гнучкі таблиці", "Спільна робота"],
    price: "від $10/міс",
    discount: "Візуальний тренд",
    link: "https://monday.com/",
    color: "#ff3d57"
  },
  {
    id: 456,
    name: "Freshsales (Freshworks)",
    category: "crm-tools",
    location: "world",
    logo: "https://www.freshworks.com/favicon.ico",
    features: ["Вбудована телефонія", "Відстеження email", "AI підказки Freddy"],
    price: "від $15/міс",
    discount: "21 день тесту",
    link: "https://www.freshworks.com/crm/",
    color: "#0052d2"
  },
  {
    id: 457,
    name: "Zendesk Sell",
    category: "crm-tools",
    location: "world",
    logo: "https://www.zendesk.com/favicon.ico",
    features: ["Для відділів підтримки", "Повна історія клієнта", "Мобільна CRM"],
    price: "від $19/міс",
    discount: "Зручно для Support",
    link: "https://www.zendesk.com/sell/",
    color: "#03363d"
  },
  {
    id: 458,
    name: "Copper",
    category: "crm-tools",
    location: "world",
    logo: "https://www.copper.com/favicon.ico",
    features: ["Створено для Google Workspace", "Інтеграція в Gmail", "Авто-заповнення даних"],
    price: "від $25/міс",
    discount: "Кращий для Google",
    link: "https://www.copper.com/",
    color: "#ff4a26"
  },
  {
    id: 459,
    name: "ActiveCampaign",
    category: "crm-tools",
    location: "world",
    logo: "https://www.activecampaign.com/favicon.ico",
    features: ["Маркетинг + CRM", "Потужна email автоматизація", "Сегментація"],
    price: "від $9/міс",
    discount: "Для маркетологів",
    link: "https://www.activecampaign.com/",
    color: "#3568df"
  },
  {
    id: 460,
    name: "Insightly",
    category: "crm-tools",
    location: "world",
    logo: "https://www.insightly.com/favicon.ico",
    features: ["Управління проєктами", "Глибока аналітика", "Зв'язки між контактами"],
    price: "від $29/міс",
    discount: "Project + CRM",
    link: "https://www.insightly.com/",
    color: "#ff6c00"
  }
];

const filteredTools = filter === 'all' 
    ? allCRMTools 
    : allCRMTools.filter(tool => tool.location === filter);

  const isCRM = location.pathname.includes('crm');
  const bannerContent = {
    title: isCRM 
      ? "CRM системи — Кращі рішення для бізнесу 2026" 
      : "Маркетингові інструменти — Акції та сервіси 2026",
    desc: isCRM
      ? `автоматизації ваших продажів. Від простих хмарних рішень до потужних ERP — оберіть ідеальний інструмент.`
      : `просування вашого бізнесу. Від SEO-аналітики до автоматизації розсилок — все, що потрібно для зростання.`
  };

 const handleTrackClick = async (tool, pageSource) => {
  try {
    
    const payload = {
      name: "Користувач (Клік)", 
      email: "click-tracker@marketingkit.com", 
      
      text: `Клік на інструмент: ${tool.title} (Джерело: ${pageSource})`,
      
      source: "Gold Page Modal Open", 
      articleTitle: tool.title, 
      articleSlug: tool.slug || "tool-click",
      actionType: "lead",
      site: "MARKETINGKIT",
      contact: "n/a"
    };

    
    await axios.post('http://localhost:5000/api/send-to-make', payload);
    
    console.log(`📊 Трекінг: Клік на "${tool.title}" зафіксовано.`);
  } catch (error) {
   
    console.error("Помилка трекінгу:", error.message);
  }
};

  return (
    <div className="gold-page-wrapper">
      <Helmet>
        <title>Кращі CRM системи 2026 — Рейтинг та знижки</title>
        <meta name="description" content="Порівняння українських та світових CRM для вашого бізнесу." />
      </Helmet>

      <div className="gold-container">
        <header className="gold-header animate-fade-in">
          <h1>Професійні CRM системи 2026</h1>
          <p>Керуйте продажами, автоматизуйте спілкування та зберігайте кожного клієнта.</p>

          <div className="filter-bar">
            <button 
              className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              Всі ({allCRMTools.length})
            </button>
            <button 
              className={filter === 'ukraine' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('ukraine')}
            >
              🇺🇦 Українські ({allCRMTools.filter(b => b.location === 'ukraine').length})
            </button>
            <button 
              className={filter === 'world' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('world')}
            >
              🌎 Світові ({allCRMTools.filter(b => b.location === 'world').length})
            </button>
          </div>
        </header>


      <div className="promo-info-banner animate-fade-in">
          <div className="promo-banner-content">
            <h3>{bannerContent.title}</h3>
            <p>
              <strong>{filteredTools.length} надійних сервісів</strong> для {bannerContent.desc}
            </p>
          </div>
          <div className="promo-banner-glow"></div>
        </div>

        <div className="hosting-table animate-fade-in">
          <div className="table-header">
            <span>Сервіс</span>
            <span>Можливості</span>
            <span>Вартість</span>
            <span>Дія</span>
          </div>

          {filteredTools.map((tool, index) => (
            <div key={tool.id} className="table-row" style={{ animationDelay: `${(index + 1) * 0.05}s` }}>
              <div className="provider-info">
                <div className="logo-bg">
                  <img 
                    src={tool.logo} 
                    alt={tool.name} 
                    className="provider-logo" 
                    onError={(e) => {
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/1243/1243420.png'; 
                      e.target.onerror = null; 
                    }}
                  />
                </div>
                <strong>{tool.name}</strong>
              </div>
              
              <div className="provider-features">
                {tool.features.map((f, i) => (
                  <span key={i} className="feature-tag marketing">{f}</span>
                ))}
              </div>
              
              <div className="provider-price">
                <span className="old-price">{tool.discount}</span>
                <span className="current-price" style={{ color: tool.color === '#ffffff' ? '#10b981' : tool.color }}>
                  {tool.price}
                </span>
              </div>
              
              <div className="provider-action">
                <button 
        onClick={() => {
          
          handleTrackClick({
            title: tool.name,
            slug: tool.id || 'marketing-tool'
          }, "Marketing Tools Page");

         
          setSelectedOffer(tool);
        }} 
        className="claim-btn" 
        style={{ backgroundColor: tool.color === '#ffffff' ? '#10b981' : tool.color }}
      >
        Отримати доступ
      </button>
              </div>
            </div>
          ))}
        </div>

        <FAQCRM />

        {/* МОДАЛКА (CRM) */}
        {selectedOffer && (
          <div className="offer-modal-overlay" onClick={() => setSelectedOffer(null)}>
            <div className="gold-modal-content" onClick={e => e.stopPropagation()}>
              <button className="gold-modal-close" onClick={() => setSelectedOffer(null)}>×</button>
              <div className="gold-modal-header">
                <div className="modal-logo-circle" style={{ borderColor: selectedOffer.color === '#ffffff' ? '#10b981' : selectedOffer.color }}>
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
                  <p>Отримайте спеціальні умови для вашого бізнесу при переході з нашого рейтингу.</p>
                </div>
              </div>
              <button 
                className="gold-confirm-btn" 
                onClick={() => {
                  window.open(selectedOffer.link, '_blank', 'noopener,noreferrer');
                  setSelectedOffer(null);
                }}
                style={{ 
                  backgroundColor: selectedOffer.color === '#ffffff' ? '#10b981' : selectedOffer.color,
                  boxShadow: `0 10px 25px ${selectedOffer.color === '#ffffff' ? '#10b981' : selectedOffer.color}44` 
                }}
              >
                Перейти до CRM
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopToolsCRM;
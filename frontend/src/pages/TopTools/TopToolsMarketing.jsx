import React, { useState } from "react";
import "./TopTools.css";
import FAQMarketing from "../../Components/FAQHosting/FAQMarketing";
import { Helmet } from 'react-helmet-async';
import API from '../../api/blogApi';


const allMarketingTools = [
  {
    id: 301,
    name: "Serpstat",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://serpstat.com/favicon.ico",
    features: ["SEO аналіз конкурентів", "Пошук ключових слів", "Аудит сайту"],
    price: "від $50/міс",
    discount: "Є безкоштовна версія",
    link: "https://serpstat.com/",
    color: "#3079ff"
  },
  {
    id: 302,
    name: "SendPulse",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://sendpulse.ua/favicon.ico",
    features: ["Email & SMS розсилки", "Чат-боти (TG, Viber)", "Вбудована CRM"],
    price: "від 0 грн (Free)",
    discount: "All-in-one платформа",
    link: "https://sendpulse.ua/",
    color: "#00a163"
  },
  {
    id: 303,
    name: "Snov.io",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://snov.io/favicon.ico",
    features: ["Пошук email-адрес", "Автоматизація продажів", "Перевірка лідів"],
    price: "від $39/міс",
    discount: "Free trial доступний",
    link: "https://snov.io/",
    color: "#4a90e2"
  },
  {
    id: 304,
    name: "Plerdy",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://www.plerdy.com/favicon.ico",
    features: ["Теплові карти кліків", "SEO-checker", "Аналіз конверсій (CRO)"],
    price: "від $23/міс",
    discount: "Безкоштовно до 2000 сесій",
    link: "https://www.plerdy.com/",
    color: "#f39c12"
  },
  {
    id: 305,
    name: "eSputnik",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://esputnik.com/favicon.ico",
    features: ["CDP для e-commerce", "AI-рекомендації", "Omnichannel маркетинг"],
    price: "від $15/міс",
    discount: "Українська розробка",
    link: "https://esputnik.com/",
    color: "#ff5a00"
  },
  {
    id: 306,
    name: "Ringostat",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://ringostat.com/favicon.ico",
    features: ["Колтрекінг", "Наскрізна аналітика", "Віртуальна АТС"],
    price: "від $33/міс",
    discount: "Інтеграція з CRM",
    link: "https://ringostat.com/",
    color: "#2c3e50"
  },
  {
    id: 307,
    name: "Collaborator.pro",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://collaborator.pro/favicon.ico",
    features: ["Біржа прямих рекламодавців", "Гостьові пости", "PR-просування"],
    price: "від бюджету",
    discount: "Найкраща біржа UA",
    link: "https://collaborator.pro/",
    color: "#6ab04c"
  },
  {
    id: 308,
    name: "Referr",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://referr.com.ua/favicon.ico",
    features: ["Крауд-маркетинг", "Лінкбілдінг", "Просування на форумах"],
    price: "від $100/пакет",
    discount: "Професійне SEO",
    link: "https://referr.com.ua/",
    color: "#e74c3c"
  },
  {
    id: 309,
    name: "SmartSender",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://smartsender.io/favicon.ico",
    features: ["Автоматизація месенджерів", "Прийом платежів у ботах", "LMS-модуль"],
    price: "до 1000 підписн. Free",
    discount: "Лідер у месенджер-маркетингу",
    link: "https://smartsender.io/",
    color: "#5b44ff"
  },
  {
    id: 310,
    name: "PRNEWS.IO",
    category: "marketing-tools",
    location: "ukraine",
    logo: "https://prnews.io/favicon.ico",
    features: ["Публікації у ЗМІ", "Контент-маркетинг", "Управління репутацією"],
    price: "за запитом",
    discount: "Глобальне охоплення",
    link: "https://prnews.io/",
    color: "#000000"
  }, 
  {
    id: 311,
    name: "Ahrefs",
    category: "marketing-tools",
    location: "world",
    logo: "https://ahrefs.com/favicon.ico",
    features: ["Аналіз зворотних посилань", "Site Explorer", "Аудит контенту"],
    price: "від $99/міс",
    discount: "Професійний стандарт",
    link: "https://ahrefs.com/",
    color: "#ff8c00"
  },
  {
    id: 312,
    name: "SEMrush",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.semrush.com/favicon.ico",
    features: ["SEO + PPC аналітика", "SMM трекер", "Маркетингові звіти"],
    price: "від $129/міс",
    discount: "7 днів Free Trial",
    link: "https://www.semrush.com/",
    color: "#ff642d"
  },
  {
    id: 313,
    name: "Canva",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.canva.com/favicon.ico",
    features: ["Графічний дизайн", "Шаблони для соцмереж", "AI-генератор фото"],
    price: "від $0 (Free)",
    discount: "Must have для SMM",
    link: "https://www.canva.com/",
    color: "#00c4cc"
  },
  {
    id: 314,
    name: "GetResponse",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.getresponse.com/favicon.ico",
    features: ["Email-маркетинг", "Автоматизація продажів", "Вебінари"],
    price: "від $15/міс",
    discount: "Знижка -30% на рік",
    link: "https://www.getresponse.com/",
    color: "#00a9e0"
  },
  {
    id: 315,
    name: "Jasper AI",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.jasper.ai/favicon.ico",
    features: ["Написання текстів", "AI-копірайтинг", "Блогові пости за хвилини"],
    price: "від $39/міс",
    discount: "Найкращий для SEO-текстів",
    link: "https://www.jasper.ai/",
    color: "#7e22ce"
  },
  {
    id: 316,
    name: "MailerLite",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.mailerlite.com/favicon.ico",
    features: ["Прості розсилки", "Drag & Drop редактор", "Landing Pages"],
    price: "Free до 1000 підписн.",
    discount: "Найпростіший інтерфейс",
    link: "https://www.mailerlite.com/",
    color: "#00ad50"
  },
  {
    id: 317,
    name: "HubSpot",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.hubspot.com/favicon.ico",
    features: ["Безкоштовна CRM", "Управління лідами", "Маркетинговий хаб"],
    price: "від $0 (Freemium)",
    discount: "Лідер ринку",
    link: "https://www.hubspot.com/",
    color: "#ff7a59"
  },
  {
    id: 318,
    name: "Buffer",
    category: "marketing-tools",
    location: "world",
    logo: "https://buffer.com/favicon.ico",
    features: ["Планування постів", "Аналітика соцмереж", "Командна робота"],
    price: "від $6/міс/канал",
    discount: "Free для 3 каналів",
    link: "https://buffer.com/",
    color: "#2c3e50"
  },
  {
    id: 319,
    name: "SimilarWeb",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.similarweb.com/favicon.ico",
    features: ["Аналіз трафіку сайтів", "Дослідження ринку", "Дані про конкурентів"],
    price: "за запитом",
    discount: "Найточніша статистика",
    link: "https://www.similarweb.com/",
    color: "#272ad0"
  },
  {
    id: 320,
    name: "Hotjar",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.hotjar.com/favicon.ico",
    features: ["Записи сесій", "Теплові карти", "Опитування клієнтів"],
    price: "від $32/міс",
    discount: "Free Basic план",
    link: "https://www.hotjar.com/",
    color: "#ff1c3d"
  },
  {
    id: 321,
    name: "Ubersuggest",
    category: "marketing-tools",
    location: "world",
    logo: "https://neilpatel.com/favicon.ico",
    features: ["Аналіз ключових слів", "SEO ідеї", "Перевірка посилань"],
    price: "від $12/міс",
    discount: "Доступна ціна",
    link: "https://neilpatel.com/ubersuggest/",
    color: "#f26522"
  },
  {
    id: 322,
    name: "ManyChat",
    category: "marketing-tools",
    location: "world",
    logo: "https://manychat.com/favicon.ico",
    features: ["Автоматизація Instagram", "Чат-боти у Facebook", "WhatsApp маркетинг"],
    price: "від $15/міс",
    discount: "Лідер у соцмережах",
    link: "https://manychat.com/",
    color: "#0084ff"
  },
  {
    id: 323,
    name: "SpyFu",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.spyfu.com/favicon.ico",
    features: ["Шпигунство за PPC", "Історія ключових слів", "Звіти конкурентів"],
    price: "від $39/міс",
    discount: "Знай свою конкуренцію",
    link: "https://www.spyfu.com/",
    color: "#009c2a"
  },
  {
    id: 324,
    name: "Surfer SEO",
    category: "marketing-tools",
    location: "world",
    logo: "https://surferseo.com/favicon.ico",
    features: ["Оптимізація контенту", "SEO аудит сторінки", "Аналіз видачі"],
    price: "від $59/міс",
    discount: "Найкращий для копірайтерів",
    link: "https://surferseo.com/",
    color: "#4d34f0"
  },
  {
    id: 325,
    name: "ActiveCampaign",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.activecampaign.com/favicon.ico",
    features: ["Глибока автоматизація", "CRM + Email", "Персоналізація"],
    price: "від $29/міс",
    discount: "Для складних воронок",
    link: "https://www.activecampaign.com/",
    color: "#356ae6"
  },
  {
    id: 326,
    name: "Mailchimp",
    category: "marketing-tools",
    location: "world",
    logo: "https://mailchimp.com/favicon.ico",
    features: ["Відомий бренд", "Аналітика кампаній", "Готові сегменти"],
    price: "від $13/міс",
    discount: "Класика маркетингу",
    link: "https://mailchimp.com/",
    color: "#ffe01b"
  },
  {
    id: 327,
    name: "BuzzSumo",
    category: "marketing-tools",
    location: "world",
    logo: "https://buzzsumo.com/favicon.ico",
    features: ["Популярний контент", "Пошук інфлюенсерів", "Тренди соцмереж"],
    price: "від $119/міс",
    discount: "Для вірального маркетингу",
    link: "https://buzzsumo.com/",
    color: "#1d2e3e"
  },
  {
    id: 328,
    name: "Unbounce",
    category: "marketing-tools",
    location: "world",
    logo: "https://unbounce.com/favicon.ico",
    features: ["Smart Builder", "A/B тестування", "Dynamic Text Replacement"],
    price: "від $99/міс",
    discount: "Найвища конверсія",
    link: "https://unbounce.com/",
    color: "#f20530"
  },
  {
    id: 329,
    name: "Tidio",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.tidio.com/favicon.ico",
    features: ["Live Chat + Чат-боти", "AI відповіді Lyro", "Інтеграція з Shopify"],
    price: "від $29/міс",
    discount: "Є Free план",
    link: "https://www.tidio.com/",
    color: "#0066ff"
  },
  {
    id: 330,
    name: "Moosend",
    category: "marketing-tools",
    location: "world",
    logo: "https://moosend.com/favicon.ico",
    features: ["Email автоматизація", "Tracking поведінки", "Звіти в реальному часі"],
    price: "від $9/міс",
    discount: "Вигідна ціна",
    link: "https://moosend.com/",
    color: "#000000"
  },
  {
    id: 331,
    name: "Copy.ai",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.copy.ai/favicon.ico",
    features: ["AI-генерація постів", "Брифи для контенту", "100+ шаблонів"],
    price: "від $0 (Free)",
    discount: "Для швидкого копірайтингу",
    link: "https://www.copy.ai/",
    color: "#2ecc71"
  },
  {
    id: 332,
    name: "Loomly",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.loomly.com/favicon.ico",
    features: ["SMM календар", "Ідеї для постів", "Керування брендом"],
    price: "від $26/міс",
    discount: "15 днів безкоштовно",
    link: "https://www.loomly.com/",
    color: "#3d9e3d"
  },
  {
    id: 333,
    name: "InVideo",
    category: "marketing-tools",
    location: "world",
    logo: "https://invideo.io/favicon.ico",
    features: ["AI відео-редактор", "Текст у відео", "5000+ шаблонів"],
    price: "від $15/міс",
    discount: "Для YouTube та Reels",
    link: "https://invideo.io/",
    color: "#5e42ff"
  },
  {
    id: 334,
    name: "Piktochart",
    category: "marketing-tools",
    location: "world",
    logo: "https://piktochart.com/favicon.ico",
    features: ["Інфографіка", "Звіти та презентації", "Візуалізація даних"],
    price: "від $14/міс",
    discount: "Є Free версія",
    link: "https://piktochart.com/",
    color: "#2a3b4c"
  },
  {
    id: 335,
    name: "Zapier",
    category: "marketing-tools",
    location: "world",
    logo: "https://zapier.com/favicon.ico",
    features: ["Автоматизація процесів", "6000+ інтеграцій", "No-code логіка"],
    price: "від $0 (Free)",
    discount: "З'єднує все зі всім",
    link: "https://zapier.com/",
    color: "#ff4a00"
  },
  {
    id: 336,
    name: "AdEspresso",
    category: "marketing-tools",
    location: "world",
    logo: "https://adespresso.com/favicon.ico",
    features: ["Оптимізація FB Ads", "A/B тести реклами", "Google Ads аналітика"],
    price: "від $49/міс",
    discount: "Від Hootsuite",
    link: "https://adespresso.com/",
    color: "#00b2ff"
  },
  {
    id: 337,
    name: "Klaviyo",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.klaviyo.com/favicon.ico",
    features: ["Email для Shopify", "SMS маркетинг", "Глибока сегментація"],
    price: "від $0 (до 250 конт.)",
    discount: "ТОП для e-commerce",
    link: "https://www.klaviyo.com/",
    color: "#1d1d1b"
  },
  {
    id: 338,
    name: "Screaming Frog",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.screamingfrog.co.uk/favicon.ico",
    features: ["Технічний SEO аудит", "Пошук битих посилань", "Аналіз мета-даних"],
    price: "Free / £149 рік",
    discount: "Інструмент профі",
    link: "https://www.screamingfrog.co.uk/",
    color: "#4e9a06"
  },
  {
    id: 339,
    name: "ClickFunnels",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.clickfunnels.com/favicon.ico",
    features: ["Воронки продажів", "Landing Pages", "Membership сайти"],
    price: "від $127/міс",
    discount: "Легенда маркетингу",
    link: "https://www.clickfunnels.com/",
    color: "#2a70d0"
  },
  {
    id: 340,
    name: "Typeform",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.typeform.com/favicon.ico",
    features: ["Інтерактивні форми", "Квізи та опитування", "Стильний дизайн"],
    price: "від $25/міс",
    discount: "Висока конверсія форм",
    link: "https://www.typeform.com/",
    color: "#000000"
  },
  {
    id: 341,
    name: "Hunter.io",
    category: "marketing-tools",
    location: "world",
    logo: "https://hunter.io/favicon.ico",
    features: ["Пошук корпоративних email", "Верифікація адрес", "Холодні розсилки"],
    price: "від $0 (Free)",
    discount: "Найкращий для Outreach",
    link: "https://hunter.io/",
    color: "#ff6b6b"
  },
  {
    id: 342,
    name: "Leadpages",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.leadpages.com/favicon.ico",
    features: ["Генерація лідів", "Pop-ups & Alert Bars", "Швидкі лендинги"],
    price: "від $37/міс",
    discount: "14 днів тесту",
    link: "https://www.leadpages.com/",
    color: "#1a46e5"
  },
  {
    id: 343,
    name: "Mention",
    category: "marketing-tools",
    location: "world",
    logo: "https://mention.com/favicon.ico",
    features: ["Моніторинг соцмереж", "Аналіз репутації", "Відстеження бренду"],
    price: "від $41/міс",
    discount: "Будь в курсі згадувань",
    link: "https://mention.com/",
    color: "#2d5be3"
  },
  {
    id: 344,
    name: "Bitly",
    category: "marketing-tools",
    location: "world",
    logo: "https://bitly.com/favicon.ico",
    features: ["Скорочення посилань", "QR-коди", "Аналітика кліків"],
    price: "від $0 (Free)",
    discount: "Професійні лінки",
    link: "https://bitly.com/",
    color: "#ee6123"
  },
  {
    id: 345,
    name: "CoSchedule",
    category: "marketing-tools",
    location: "world",
    logo: "https://coschedule.com/favicon.ico",
    features: ["Маркетинговий календар", "Headline Analyzer", "Планування контенту"],
    price: "від $0 (Free)",
    discount: "Для контент-команд",
    link: "https://coschedule.com/",
    color: "#f37c22"
  },
  {
    id: 346,
    name: "Instapage",
    category: "marketing-tools",
    location: "world",
    logo: "https://instapage.com/favicon.ico",
    features: ["Персоналізація лендингів", "AdMap аналітика", "A/B тестування"],
    price: "від $199/міс",
    discount: "Enterprise рівень",
    link: "https://instapage.com/",
    color: "#111111"
  },
  {
    id: 347,
    name: "KeywordTool.io",
    category: "marketing-tools",
    location: "world",
    logo: "https://keywordtool.io/favicon.ico",
    features: ["Ключові слова YouTube", "Amazon & App Store SEO", "Long-tail запити"],
    price: "від $69/міс",
    discount: "Альтернатива Google Planner",
    link: "https://keywordtool.io/",
    color: "#34495e"
  },
  {
    id: 348,
    name: "Drip",
    category: "marketing-tools",
    location: "world",
    logo: "https://www.drip.com/favicon.ico",
    features: ["Ecommerce автоматизація", "Аналіз поведінки", "CRM для магазинів"],
    price: "від $39/міс",
    discount: "14 днів Trial",
    link: "https://www.drip.com/",
    color: "#000000"
  },
  {
    id: 349,
    name: "Wistia",
    category: "marketing-tools",
    location: "world",
    logo: "https://wistia.com/favicon.ico",
    features: ["Маркетинговий відео-хостинг", "Інтерактивні заклики", "Аналітика переглядів"],
    price: "від $19/міс",
    discount: "Для B2B маркетингу",
    link: "https://wistia.com/",
    color: "#54bbff"
  },
  {
    id: 350,
    name: "AnswerThePublic",
    category: "marketing-tools",
    location: "world",
    logo: "https://answerthepublic.com/favicon.ico",
    features: ["Пошук запитань юзерів", "Ідеї для блогу", "Візуалізація трендів"],
    price: "від $9/міс",
    discount: "Від Neil Patel",
    link: "https://answerthepublic.com/",
    color: "#ff6b00"
  }
];

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

const TopToolsMarketing = () => {
  const [filter, setFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Фільтрація за локацією та категорією (якщо захочеш додати категорії SEO/Email пізніше)
  const filteredTools = allMarketingTools.filter(item => {
    if (filter === 'all') return true;
    return item.location === filter;
  });


  const handleTrackClick = async (tool, pageSource) => {
  try {
    const payload = {
      name: "Користувач (Клік)", 
      email: "click-tracker@marketingkit.com", 
      text: `Клік на: ${tool.title} (Сторінка: ${pageSource})`,
      source: "Gold Page Modal Open", 
      articleTitle: tool.title, 
      articleSlug: tool.slug || "top-tools",
      actionType: "lead",
      site: "MARKETINGKIT",
      contact: "n/a"
    };

    // Відправка на твій бекенд
    await API.post('/send-to-make', payload);
    
    console.log(`✅ Аналітика: зафіксовано клік на ${tool.title}`);
  } catch (error) {
    console.error("Помилка трекінгу:", error.message);
  }
};

  return (
    <div className="gold-page-wrapper marketing-theme">
      <div className="gold-container">

       <Helmet>
             <title>Кращі Маркетингові Інструменти 2026 — Огляд та Знижки</title>
              <meta name="description" content="Рейтинг інструментів для автоматизації маркетингу, CRM та сервісів розсилок. Порівнюйте ціни та отримуйте ексклюзивні пропозиції." />
  
                   {/* Open Graph для соцмереж (Facebook, Telegram, LinkedIn) */}
                 <meta property="og:title" content="Топ інструментів для маркетингу та автоматизації" />
                  <meta property="og:description" content="Знайдіть ідеальний сервіс для вашого бізнесу. Актуальний рейтинг та відгуки." />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content="https://твій-сайт.com/marketing" />
                  <meta property="og:image" content="https://твій-сайт.com/images/marketing-preview.jpg" />
  
                      {/* Twitter Card */}
                   <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Маркетингові сервіси 2026" />
        </Helmet>


        <header className="gold-header animate-fade-in">
          <h1>Професійні інструменти маркетингу 2026</h1>
          <p>Автоматизуйте рутину, аналізуйте конкурентів та масштабуйте свій прибуток.</p>

          <div className="filter-bar">
            <button 
              className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              Всі ({allMarketingTools.length})
            </button>
            <button 
              className={filter === 'ukraine' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('ukraine')}
            >
              🇺🇦 Українські ({allMarketingTools.filter(b => b.location === 'ukraine').length})
            </button>
            <button 
              className={filter === 'world' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('world')}
            >
              🌎 Світові ({allMarketingTools.filter(b => b.location === 'world').length})
            </button>
          </div>
        </header>

        <PromoBanner count={filteredTools.length} />

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
                  {/* <img src={tool.logo} alt={tool.name} className="provider-logo" /> */}
                  <img 
                        src={tool.logo} 
                        alt={tool.name} 
                          className="provider-logo" 
                        onError={(e) => {
                        // Вказуємо шлях до нейтральної іконки (можна використати свою або CDN)
                           e.target.src = 'https://cdn-icons-png.flaticon.com/512/1243/1243420.png'; 
                                 // Запобігаємо нескінченному циклу, якщо заглушка теж не знайдеться
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
      // 1. Відправляємо дані в аналітику (Make.com + MongoDB)
      handleTrackClick({
        title: tool.name, // беремо назву інструменту
        slug: tool.id || 'marketing-tool'
      }, "Marketing Tools Section"); // Вказуємо назву секції для Telegram

      // 2. Відкриваємо вікно з пропозицією
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


        <FAQMarketing />

        {/* МОДАЛКА (МАРКЕТИНГ) */}
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
                  <p>Просто перейдіть за посиланням, щоб отримати найкращі умови для MARKETINGKIT.</p>
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
                Перейти до сервісу
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopToolsMarketing;
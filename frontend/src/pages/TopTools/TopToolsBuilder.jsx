import React, { useState } from 'react';
import './TopTools.css';
import FAQBuilders from '../../Components/FAQHosting/FAQBuilders';
import { Helmet } from 'react-helmet-async';
import API from '../../api/blogApi.js';

const allBuilders = [
  {
    id: 1,
    name: "Weblium",
    category: "website-builder",
    location: "ukraine",
    logo: "https://weblium.com/favicon.ico",
    features: ["Розумний AI-конструктор", "Понад 300 шаблонів", "Українська підтримка"],
    price: "від $8.25/міс",
    discount: "Є Free-тариф",
    link: "https://weblium.com/",
    color: "#3062ff"
  },
  {
    id: 2,
    name: "Horoshop",
    category: "website-builder",
    location: "ukraine",
    logo: "https://horoshop.ua/favicon.ico",
    features: ["Найкращий для e-commerce", "Інтеграція з ПРРО", "Всі платіжні системи"],
    price: "від 150 грн/міс",
    discount: "Знижка на запуск",
    link: "https://horoshop.ua/",
    color: "#00c3ff"
  },
  {
    id: 3,
    name: "Shop-Express",
    category: "website-builder",
    location: "ukraine",
    logo: "https://shop-express.ua/favicon.ico",
    features: ["Брендові магазини", "Хмарна платформа", "Швидка техпідтримка"],
    price: "від 290 грн/міс",
    discount: "Знижка -20%",
    link: "https://shop-express.ua/",
    color: "#ff6b00"
  },
  {
    id: 4,
    name: "SendPulse",
    category: "website-builder",
    location: "ukraine",
    logo: "https://sendpulse.ua/favicon.ico",
    features: ["Конструктор Landing Page", "Вбудована CRM", "Чат-боти + Email"],
    price: "від 0 грн (Free)",
    discount: "All-in-one сервіс",
    link: "https://sendpulse.ua/",
    color: "#00a163"
  },
  {
    id: 5,
    name: "Recommerce",
    category: "website-builder",
    location: "ukraine",
    logo: "https://recommerce.com.ua/favicon.ico",
    features: ["Для малого бізнесу", "Легкий запуск", "Адаптивність"],
    price: "від 250 грн/міс",
    discount: "14 днів тесту",
    link: "https://recommerce.com.ua/",
    color: "#ff3366"
  },
  {
    id: 6,
    name: "WayForPay Pages",
    category: "website-builder",
    location: "ukraine",
    logo: "https://wayforpay.com/favicon.ico",
    features: ["Сторінки для оплати", "Для інфо-бізнесу", "Миттєве підключення"],
    price: "від 0 грн (комісія)",
    discount: "Безкоштовно",
    link: "https://wayforpay.com/",
    color: "#000000"
  },
  {
    id: 7,
    name: "Checkbox Page",
    category: "website-builder",
    location: "ukraine",
    logo: "https://checkbox.ua/favicon.ico",
    features: ["Міні-сайти для товарів", "Фіскалізація чеків", "Керування продажами"],
    price: "від 178 грн/міс",
    discount: "Професійний вибір",
    link: "https://checkbox.ua/",
    color: "#2ecc71"
  },
  {
    id: 8,
    name: "Kyivhost Builder",
    category: "website-builder",
    location: "ukraine",
    logo: "https://kyivhost.com/favicon.ico",
    features: ["Конструктор у панелі", "Швидкі шаблони", "SSL безкоштовно"],
    price: "від 120 грн/міс",
    discount: "При оплаті на рік",
    link: "https://kyivhost.com/",
    color: "#ffd700"
  },
  {
    id: 9,
    name: "SmartSender",
    category: "website-builder",
    location: "ukraine",
    logo: "https://smartsender.io/favicon.ico",
    features: ["Воронки продажів", "Конструктор ботів", "Лендинги"],
    price: "від €10/міс",
    discount: "Потужний маркетинг",
    link: "https://smartsender.io/",
    color: "#5b44ff"
  },
  {
    id: 10,
    name: "OneBox OS",
    category: "website-builder",
    location: "ukraine",
    logo: "https://1box.app/favicon.ico",
    features: ["CRM + Конструктор", "Повна автоматизація", "Складний функціонал"],
    price: "від $25/міс",
    discount: "Потужний функціонал",
    link: "https://1box.app/",
    color: "#1abc9c"
  },
  {
    id: 11,
    name: "HostPro SiteBuilder",
    category: "website-builder",
    location: "ukraine",
    logo: "https://hostpro.ua/favicon.ico",
    features: ["Drag & Drop", "200+ шаблонів", "SSD диски"],
    price: "від 140 грн/міс",
    discount: "Безкоштовний тест",
    link: "https://hostpro.ua/sitebuilder.html",
    color: "#e30613"
  },
  {
    id: 12,
    name: "OkayCMS",
    category: "website-builder",
    location: "ukraine",
    logo: "https://okay-cms.com/favicon.ico",
    features: ["SEO-орієнтована CMS", "Відкритий код", "Маркетплейс модулів"],
    price: "від $0 (Lite)",
    discount: "UA розробка",
    link: "https://okay-cms.com/",
    color: "#6ab04c"
  },
  {
    id: 13,
    name: "Sprosi.ua",
    category: "website-builder",
    location: "ukraine",
    logo: "https://sprosi.ua/favicon.ico",
    features: ["Сайти-візитки", "Просте налаштування", "Для фрілансерів"],
    price: "від 150 грн/міс",
    discount: "Мінімум налаштувань",
    link: "https://sprosi.ua/",
    color: "#3498db"
  },
  {
    id: 14,
    name: "Besthosting Builder",
    category: "website-builder",
    location: "ukraine",
    logo: "https://besthosting.ua/favicon.ico",
    features: ["Легкий інтерфейс", "UA сервери", "SEO оптимізація"],
    price: "від 110 грн/міс",
    discount: "-15% на рік",
    link: "https://besthosting.ua/",
    color: "#003366"
  },
  {
    id: 15,
    name: "InSales UA",
    category: "website-builder",
    location: "ukraine",
    logo: "https://www.insales.ua/favicon.ico",
    features: ["Синхронізація з маркетплейсами", "Керування замовленнями", "Готові теми"],
    price: "від 400 грн/міс",
    discount: "30 днів Free",
    link: "https://www.insales.ua/",
    color: "#4f5f6f"
  },
  {
    id: 16,
    name: "Elbuz",
    category: "website-builder",
    location: "ukraine",
    logo: "https://elbuz.com/favicon.ico",
    features: ["Для великих каталогів", "Парсинг товарів", "Авто-ціни"],
    price: "від $40/міс",
    discount: "Для профі",
    link: "https://elbuz.com/",
    color: "#f39c12"
  },
  {
    id: 17,
    name: "Solomono",
    category: "website-builder",
    location: "ukraine",
    logo: "https://solomono.net/favicon.ico",
    features: ["Надшвидкий двигун", "SEO з коробки", "Міграція з OpenCart"],
    price: "від 250 грн/міс",
    discount: "Made in UA",
    link: "https://solomono.net/",
    color: "#2980b9"
  },
  {
    id: 18,
    name: "Uspacy",
    category: "website-builder",
    location: "ukraine",
    logo: "https://uspacy.ua/favicon.ico",
    features: ["Екосистема для бізнесу", "Вбудована CRM", "Командна робота"],
    price: "від 0 грн",
    discount: "Новинка ринку",
    link: "https://uspacy.ua/",
    color: "#6c5ce7"
  },
  {
    id: 19,
    name: "TemplateMonster UA",
    category: "website-builder",
    location: "ukraine",
    logo: "https://www.templatemonster.com/favicon.ico",
    features: ["Готові шаблони", "MotoCMS конструктор", "Величезний вибір"],
    price: "від $5/міс",
    discount: "Знижки до -50%",
    link: "https://www.templatemonster.com/",
    color: "#54b2f5"
  },
  {
    id: 20,
    name: "Kasta Constructor",
    category: "website-builder",
    location: "ukraine",
    logo: "https://kasta.ua/favicon.ico",
    features: ["Продажі на Kasta", "Швидкий старт магазину", "Логістика включена"],
    price: "від комісії",
    discount: "Для партнерів",
    link: "https://kasta.ua/",
    color: "#000000"
  },
  {
    id: 21,
    name: "Wix",
    category: "website-builder",
    location: "world",
    logo: "https://www.wix.com/favicon.ico",
    features: ["Drag & Drop редактор", "800+ професійних шаблонів", "Вбудований AI-помічник"],
    price: "від $10/міс",
    discount: "Домен у подарунок",
    link: "https://www.wix.com/",
    color: "#0c0e0f"
  },
  {
    id: 22,
    name: "Shopify",
    category: "website-builder",
    location: "world",
    logo: "https://www.shopify.com/favicon.ico",
    features: ["Найкращий для магазинів", "Вбудована аналітика", "Зручні платежі"],
    price: "$1 за перші 3 міс",
    discount: "Спеціальна ціна",
    link: "https://www.shopify.com/",
    color: "#95bf47"
  },
  {
    id: 23,
    name: "Webflow",
    category: "website-builder",
    location: "world",
    logo: "https://webflow.com/favicon.ico",
    features: ["Повний дизайн-контроль", "Clean code на виході", "Потужна CMS"],
    price: "від $14/міс",
    discount: "Почніть безкоштовно",
    link: "https://webflow.com/",
    color: "#4353ff"
  },
  {
    id: 24,
    name: "Squarespace",
    category: "website-builder",
    location: "world",
    logo: "https://www.squarespace.com/favicon.ico",
    features: ["Найкращі дизайни", "Для портфоліо", "Інструменти маркетингу"],
    price: "від $16/міс",
    discount: "Знижка -10% з кодом",
    link: "https://www.squarespace.com/",
    color: "#000000"
  },
  {
    id: 25,
    name: "Framer",
    category: "website-builder",
    location: "world",
    logo: "https://www.framer.com/favicon.ico",
    features: ["AI-генерація сайтів", "Швидкість 100/100", "Для дизайнерів"],
    price: "від $5/міс",
    discount: "Free-версія",
    link: "https://www.framer.com/",
    color: "#00aaff"
  },
  {
    id: 26,
    name: "Tilda",
    category: "website-builder",
    location: "world",
    logo: "https://tilda.cc/favicon.ico",
    features: ["Zero Block", "Швидкі лендинги", "Зручна типографіка"],
    price: "від $10/міс",
    discount: "1 сайт безкоштовно",
    link: "https://tilda.cc/",
    color: "#000000"
  },
  {
    id: 27,
    name: "Zyro (by Hostinger)",
    category: "website-builder",
    location: "world",
    logo: "https://zyro.com/favicon.ico",
    features: ["Дуже дешево", "AI Writer & Logo Maker", "Простий інтерфейс"],
    price: "від $2.99/міс",
    discount: "Знижка -70%",
    link: "https://zyro.com/",
    color: "#3d4ff5"
  },
  {
    id: 28,
    name: "Weebly",
    category: "website-builder",
    location: "world",
    logo: "https://www.weebly.com/favicon.ico",
    features: ["Належить Square", "Зручна е-комерція", "App Marketplace"],
    price: "від $6/міс",
    discount: "Free тариф",
    link: "https://www.weebly.com/",
    color: "#2997ff"
  },
  {
    id: 29,
    name: "Jimdo",
    category: "website-builder",
    location: "world",
    logo: "https://www.jimdo.com/favicon.ico",
    features: ["AI-дизайнер Dolphin", "Для малого бізнесу", "Швидке створення"],
    price: "від $9/міс",
    discount: "Play тариф (0$)",
    link: "https://www.jimdo.com/",
    color: "#00214a"
  },
  {
    id: 30,
    name: "Carrd",
    category: "website-builder",
    location: "world",
    logo: "https://carrd.co/favicon.ico",
    features: ["Односторінкові сайти", "Мінімалізм", "Дуже низька ціна"],
    price: "$19/рік",
    discount: "Pro за копійки",
    link: "https://carrd.co/",
    color: "#34495e"
  },
  {
    id: 31,
    name: "Bubble",
    category: "website-builder",
    location: "world",
    logo: "https://bubble.io/favicon.ico",
    features: ["No-code додатки", "Складна логіка", "Власна база даних"],
    price: "від $29/міс",
    discount: "Для стартапів",
    link: "https://bubble.io/",
    color: "#09102b"
  },
  {
    id: 32,
    name: "Duda",
    category: "website-builder",
    location: "world",
    logo: "https://www.duda.co/favicon.ico",
    features: ["Для агентств", "White Label", "Висока швидкість"],
    price: "від $14/міс",
    discount: "Командний доступ",
    link: "https://www.duda.co/",
    color: "#f59e0b"
  },
  {
    id: 33,
    name: "Site123",
    category: "website-builder",
    location: "world",
    logo: "https://www.site123.com/favicon.ico",
    features: ["Найпростіший редактор", "Безкоштовний хостинг", "Готові макети"],
    price: "від $12.80/міс",
    discount: "-50% на перший рік",
    link: "https://www.site123.com/",
    color: "#00c1cf"
  },
  {
    id: 34,
    name: "Strikingly",
    category: "website-builder",
    location: "world",
    logo: "https://www.strikingly.com/favicon.ico",
    features: ["Фокус на лендинги", "Мобільний додаток", "Чудова підтримка"],
    price: "від $8/міс",
    discount: "Спробуйте безкоштовно",
    link: "https://www.strikingly.com/",
    color: "#4a90e2"
  },
  {
    id: 35,
    name: "Ghost",
    category: "website-builder",
    location: "world",
    logo: "https://ghost.org/favicon.ico",
    features: ["Для блогерів & ЗМІ", "Вбудовані розсилки", "Платні підписки"],
    price: "від $9/міс",
    discount: "Open Source",
    link: "https://ghost.org/",
    color: "#15171a"
  },
  {
    id: 36,
    name: "BigCommerce",
    category: "website-builder",
    location: "world",
    logo: "https://www.bigcommerce.com/favicon.ico",
    features: ["Для великих магазинів", "SEO інструменти", "Без комісій"],
    price: "від $29/міс",
    discount: "15 днів Trial",
    link: "https://www.bigcommerce.com/",
    color: "#0d52ff"
  },
  {
    id: 37,
    name: "GoDaddy Builder",
    category: "website-builder",
    location: "world",
    logo: "https://www.godaddy.com/favicon.ico",
    features: ["Все в одному", "Маркетинг інструменти", "Безкоштовний SSL"],
    price: "від $9.99/міс",
    discount: "Старт за 0 грн",
    link: "https://www.godaddy.com/websites/website-builder",
    color: "#00a63f"
  },
  {
    id: 38,
    name: "Ucraft",
    category: "website-builder",
    location: "world",
    logo: "https://www.ucraft.com/favicon.ico",
    features: ["Drag & Drop", "Лого мейкер", "Безкоштовний лендинг"],
    price: "від $10/міс",
    discount: "Є Free тариф",
    link: "https://www.ucraft.com/",
    color: "#000000"
  },
  {
    id: 39,
    name: "Elementor Cloud",
    category: "website-builder",
    location: "world",
    logo: "https://elementor.com/favicon.ico",
    features: ["WordPress + Hosting", "Повний дизайн-код", "NVMe диски"],
    price: "від $9.99/міс",
    discount: "Все включено",
    link: "https://elementor.com/",
    color: "#92003b"
  },
  {
    id: 40,
    name: "Dorik",
    category: "website-builder",
    location: "world",
    logo: "https://dorik.com/favicon.ico",
    features: ["AI Website Builder", "CMS & Blog", "Дуже швидкий"],
    price: "від $15/міс",
    discount: "Новий лідер",
    link: "https://dorik.com/",
    color: "#6c5ce7"
  },
  {
    id: 41,
    name: "Webnode",
    category: "website-builder",
    location: "world",
    logo: "https://www.webnode.com/favicon.ico",
    features: ["40+ мов підтримки", "Зручний блог", "Швидка реєстрація"],
    price: "від $4.50/міс",
    discount: "Free версія доступна",
    link: "https://www.webnode.com/r/69a22217e505d",
    color: "#00b4d8"
  },
  {
    id: 42,
    name: "Format",
    category: "website-builder",
    location: "world",
    logo: "https://www.format.com/favicon.ico",
    features: ["Для фотографів", "Продаж принтів", "Хмарне сховище"],
    price: "від $8/міс",
    discount: "14 днів тесту",
    link: "https://www.format.com/",
    color: "#000000"
  },
  {
    id: 43,
    name: "Volusion",
    category: "website-builder",
    location: "world",
    logo: "https://www.volusion.com/favicon.ico",
    features: ["E-commerce фокус", "Inventory management", "Без комісій"],
    price: "від $35/міс",
    discount: "Знижка -10% за рік",
    link: "https://www.volusion.com/",
    color: "#3b22e7"
  },
  {
    id: 44,
    name: "Mozello",
    category: "website-builder",
    location: "world",
    logo: "https://www.mozello.com/favicon.ico",
    features: ["Мультимовні сайти", "Простий магазин", "Безкоштовний SSL"],
    price: "від $7/міс",
    discount: "Безкоштовний домен",
    link: "https://www.mozello.com/",
    color: "#323232"
  },
  {
    id: 45,
    name: "1&1 IONOS Builder",
    category: "website-builder",
    location: "world",
    logo: "https://www.ionos.com/favicon.ico",
    features: ["AI дизайн-помічник", "Бізнес-пошта", "Професійні зображення"],
    price: "від $1 за 1-й місяць",
    discount: "Супер старт",
    link: "https://www.ionos.com/websites/website-builder",
    color: "#003d8f"
  },
  {
    id: 46,
    name: "Web.com",
    category: "website-builder",
    location: "world",
    logo: "https://www.web.com/favicon.ico",
    features: ["Готові шаблони", "Google Business профіль", "SEO сервіси"],
    price: "від $4.95/міс",
    discount: "Знижка -60%",
    link: "https://www.web.com/",
    color: "#1274e7"
  },
  {
    id: 47,
    name: "ReadyMag",
    category: "website-builder",
    location: "world",
    logo: "https://readymag.com/favicon.ico",
    features: ["Для онлайн-журналів", "Крута анімація", "Свобода дизайну"],
    price: "від $15/міс",
    discount: "Для творчих профі",
    link: "https://readymag.com/",
    color: "#000000"
  },
  {
    id: 48,
    name: "Brizy Cloud",
    category: "website-builder",
    location: "world",
    logo: "https://www.brizy.io/favicon.ico",
    features: ["Next-gen Visual Builder", "Швидка публікація", "Whitelabel"],
    price: "від $9/міс",
    discount: "Free Landing Page",
    link: "https://www.brizy.io/",
    color: "#e91e63"
  },
  {
    id: 49,
    name: "One.com",
    category: "website-builder",
    location: "world",
    logo: "https://www.one.com/favicon.ico",
    features: ["Хостинг включено", "Google Ads кредити", "Простий редактор"],
    price: "від $2.99/міс",
    discount: "Перший місяць Free",
    link: "https://www.one.com/",
    color: "#6eb43f"
  },
  {
    id: 50,
    name: "Simvoly",
    category: "website-builder",
    location: "world",
    logo: "https://simvoly.com/favicon.ico",
    features: ["Sales Funnels", "A/B тестування", "E-commerce & CRM"],
    price: "від $12/міс",
    discount: "White Label доступ",
    link: "https://simvoly.com/",
    color: "#212529"
  },
  {
    id: 51,
    name: "Wocode",
    category: "website-builder",
    location: "world",
    logo: "https://wocode.com/favicon.ico",
    features: ["Для професійних агенцій", "Потужний API", "Flex сектори"],
    price: "від $15/міс",
    discount: "Pro інструменти",
    link: "https://wocode.com/",
    color: "#6c5ce7"
  },
  {
    id: 52,
    name: "Yola",
    category: "website-builder",
    location: "world",
    logo: "https://www.yola.com/favicon.ico",
    features: ["Стабільність роками", "Без реклами", "Проста аналітика"],
    price: "від $5.91/міс",
    discount: "Знижка при оплаті на 2 роки",
    link: "https://www.yola.com/",
    color: "#232323"
  },
  {
    id: 53,
    name: "Universe",
    category: "website-builder",
    location: "world",
    logo: "https://univer.se/favicon.ico",
    features: ["Тільки для Mobile", "Сітковий інтерфейс", "Apple Pay інтеграція"],
    price: "від $9.99/міс",
    discount: "Найкращий в AppStore",
    link: "https://univer.se/",
    color: "#000000"
  },
  {
    id: 54,
    name: "Bookmark",
    category: "website-builder",
    location: "world",
    logo: "https://www.bookmark.com/favicon.ico",
    features: ["AI дизайн-помічник (AiDA)", "Навчальні модулі", "Безлімітне сховище"],
    price: "від $11.99/міс",
    discount: "Авто-оптимізація",
    link: "https://www.bookmark.com/",
    color: "#4285f4"
  },
  {
    id: 55,
    name: "Voog",
    category: "website-builder",
    location: "world",
    logo: "https://www.voog.com/favicon.ico",
    features: ["Багатомовність по дефолту", "Clean design", "Для розробників"],
    price: "від €8/міс",
    discount: "30 днів Free",
    link: "https://www.voog.com/",
    color: "#ffffff"
  },
  {
    id: 56,
    name: "Silex",
    category: "website-builder",
    location: "world",
    logo: "https://www.silex.me/favicon.ico",
    features: ["Open Source", "No-code але з доступом до коду", "Безкоштовно"],
    price: "Free",
    discount: "Повністю вільний",
    link: "https://www.silex.me/",
    color: "#2c3e50"
  },
  {
    id: 57,
    name: "Carbonmade",
    category: "website-builder",
    location: "world",
    logo: "https://carbonmade.com/favicon.ico",
    features: ["Для ілюстраторів", "Портфоліо в один клік", "Дуже креативно"],
    price: "від $9/міс",
    discount: "Улюблений сервіс дизайнерів",
    link: "https://carbonmade.com/",
    color: "#fa4d4d"
  },
  {
    id: 58,
    name: "Cargo Collective",
    category: "website-builder",
    location: "world",
    logo: "https://cargo.site/favicon.ico",
    features: ["Авангардний дизайн", "Для митців", "Унікальні сітки"],
    price: "від $9/міс",
    discount: "Для студентів Free",
    link: "https://cargo.site/",
    color: "#000000"
  },
  {
    id: 59,
    name: "Pabbly",
    category: "website-builder",
    location: "world",
    logo: "https://www.pabbly.com/favicon.ico",
    features: ["Email-маркетинг", "Subscription billing", "Форми захвату"],
    price: "від $25/міс",
    discount: "All-in-one suite",
    link: "https://www.pabbly.com/",
    color: "#1338be"
  },
  {
    id: 60,
    name: "Lander",
    category: "website-builder",
    location: "world",
    logo: "https://landerapp.com/favicon.ico",
    features: ["Тільки лендинги", "Інтеграція з PayPal", "A/B тестування"],
    price: "від $16/міс",
    discount: "-25% при оплаті на рік",
    link: "https://landerapp.com/",
    color: "#1abc9c"
  }
];


const PromoBanner = ({ category, count }) => {
  return (
    <div className="promo-info-banner">
       <div className="promo-banner-content">
      <h3>{category} — Купони та пропозиції, 2026</h3>
      <p>
        На сьогодні в нашому каталозі доступно <strong>{count} перевірених пропозицій</strong> для конструкторів сайтів. 
        Ваші відгуки допомагають спільноті MARKETINGKIT миттєво знаходити та видаляти застарілі коди!
      </p>
    </div>
     <div className="promo-banner-glow"></div>
        </div>
  );
};

const TopToolsBuilders = () => {
 const [filter, setFilter] = useState('all'); // Стан для кнопок: all, ukraine, world
  const [selectedOffer, setSelectedOffer] = useState(null);

  // 1. ГОЛОВНА ЛОГІКА ФІЛЬТРАЦІЇ
  const filteredBuilders = allBuilders.filter(item => {
    if (filter === 'all') return true;
    return item.location === filter;
  });


 const handleTrackClick = async (tool, pageSource = "Top Tools Page") => {
  try {
    // 1. Формуємо об'єкт для відправки
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

    // 2. Відправляємо на твій бекенд, який пересилає дані в Make.com та зберігає в Leads
    await API.post('/send-to-make', payload);
    
    console.log(`✅ Клік на ${tool.title} зафіксовано`);
  } catch (error) {
    console.error("❌ Помилка трекінгу кліку:", error.message);
  }
};


  return (
    <div className="gold-page-wrapper">
      <div className="gold-container">

        <Helmet>
                 <title>Найкращі конструктори сайтів 2026 — Створи сайт сам</title>
                    <meta name="description" content="Огляд найпростіших та найпотужніших конструкторів сайтів. Порівняння тарифів та можливостей." />
  
                    {/* Open Graph / Facebook */}
                     <meta property="og:type" content="website" />
                     <meta property="og:url" content="https://твій-сайт.com/top-tools-builders" />
                     <meta property="og:title" content="Рейтинг конструкторів сайтів 2026" />
                     <meta property="og:description" content="Не вмієте програмувати? Не проблема. Оберіть конструктор і запустіть сайт вже сьогодні." />
                     <meta property="og:image" content="https://твій-сайт.com/images/builders-og.jpg" />

                     {/* Twitter */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Конструктори сайтів 2026" />
          </Helmet>

        <header className="gold-header animate-fade-in">
          <h1>Знайдено {filteredBuilders.length} найкращих конструкторів сайтів 2026</h1>
          <p>Обирайте платформу, яка допоможе втілити ваші ідеї без жодного рядка коду.</p>

          {/* ПАНЕЛЬ ФІЛЬТРІВ */}
          <div className="filter-bar">
            <button 
              className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              Всі ({allBuilders.length})
            </button>
            <button 
              className={filter === 'ukraine' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('ukraine')}
            >
              🇺🇦 Українські ({allBuilders.filter(b => b.location === 'ukraine').length})
            </button>
            <button 
              className={filter === 'world' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('world')}
            >
              🌎 Світові ({allBuilders.filter(b => b.location === 'world').length})
            </button>
          </div>
        </header>

        <PromoBanner category="Конструктори сайтів" count={filteredBuilders.length} />

        {/* ТАБЛИЦЯ КОНСТРУКТОРІВ */}
        <div className="hosting-table animate-fade-in">
          <div className="table-header">
            <span>Платформа</span>
            <span>Можливості</span>
            <span>Вартість</span>
            <span>Дія</span>
          </div>

          {/* 2. РЕНДЕРИМО ТІЛЬКИ ВІДФІЛЬТРОВАНІ ЕЛЕМЕНТИ */}
          {filteredBuilders.map((b, index) => (
            <div key={b.id} className="table-row" style={{ animationDelay: `${(index + 1) * 0.05}s` }}>
              <div className="provider-info">
                <div className="logo-bg">
                 
                  <img 
                      src={b.logo} 
                       alt={b.name} 
                       className="provider-logo" 
                       onError={(e) => {
                             // Встановлюємо посилання на іконку-заглушку
                        e.target.src = 'https://cdn-icons-png.flaticon.com/512/1243/1243420.png'; 
                      // Вимикаємо подальші спроби завантаження, якщо заглушка теж недоступна
                             e.target.onerror = null; 
                             }}
                     />
                </div>
                <strong>{b.name}</strong>
              </div>
              
              <div className="provider-features">
                {b.features.map((f, i) => (
                  <span key={i} className="feature-tag">{f}</span>
                ))}
              </div>
              
              <div className="provider-price">
                <span className="old-price">{b.discount}</span>
                <span className="current-price" style={{ color: b.color === '#ffffff' ? '#38bdf8' : b.color }}>
                  {b.price}
                </span>
              </div>
              
              <div className="provider-action">
                {/* 🚀 Оновлена кнопка з трекінгом */}
      <button 
        onClick={() => {
          // 1. Викликаємо трекінг (передаємо об'єкт b як інструмент)
          handleTrackClick({
            title: b.name,
            slug: b.id || 'builder-tool'
          }, "Top Builders Page");

          // 2. Твоя оригінальна логіка (відкриття модалки/оффера)
          setSelectedOffer(b);
        }} 
        className="claim-btn" 
        style={{ backgroundColor: b.color === '#ffffff' ? '#38bdf8' : b.color }}
      >
        Отримати пропозицію
      </button>
              </div>
            </div>
          ))}
        </div>

        <FAQBuilders />

        {/* ФІРМОВА МОДАЛКА (КОНСТРУКТОРЫ) */}
        {selectedOffer && (
          <div className="offer-modal-overlay" onClick={() => setSelectedOffer(null)}>
            <div className="gold-modal-content" onClick={e => e.stopPropagation()}>
              
              <button className="gold-modal-close" onClick={() => setSelectedOffer(null)}>×</button>

              <div className="gold-modal-header">
                <div className="modal-logo-circle" style={{ borderColor: selectedOffer.color === '#ffffff' ? '#38bdf8' : selectedOffer.color }}>
                  <img src={selectedOffer.logo} alt={selectedOffer.name} />
                </div>
                <div className="success-badge-mini">Акцію активовано</div>
              </div>

              <div className="gold-modal-body">
                <h2>{selectedOffer.name}</h2>
                <p className="modal-price-tag">Тариф: <span>{selectedOffer.price}</span></p>
                
                <div className="gold-promo-box">
                  <div className="promo-status">
                     <span className="pulse-dot-green"></span>
                     Купон застосовано
                  </div>
                  <p>Знижка вже вшита в посилання. Просто почніть створення сайту.</p>
                </div>
              </div>

              <button 
                className="gold-confirm-btn" 
                onClick={() => {
                  window.open(selectedOffer.link, '_blank', 'noopener,noreferrer');
                  setSelectedOffer(null);
                }}
                style={{ 
                  backgroundColor: selectedOffer.color === '#ffffff' ? '#38bdf8' : selectedOffer.color,
                  boxShadow: `0 10px 25px ${selectedOffer.color === '#ffffff' ? '#38bdf8' : selectedOffer.color}44` 
                }}
              >
                Розпочати створення
              </button>

              <p className="gold-modal-footer">
                Перехід на офіційну сторінку акції {selectedOffer.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopToolsBuilders;
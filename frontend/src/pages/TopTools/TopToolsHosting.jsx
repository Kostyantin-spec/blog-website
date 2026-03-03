import React, { useState, useEffect, useCallback } from "react";
import './TopTools.css';
import FAQHosting from '../../Components/FAQHosting/FAQHosting';
import { Helmet } from 'react-helmet-async';
import API from '../../api/blogApi';

const allHostings = [{
    id: 1,
    name: "Hostinger",
    category: "world",
    logo: "https://www.hostinger.com/favicon.ico",
    features: ["Заощаджуйте до 75%", "Безкоштовний SSL", "Обмежена пропозиція"],
    price: "від €2.99/міс",
    discount: "Знижка -75%",
    link: "https://hostinger.com.ua/?referral=marina_link",
    color: "#673de6"
  },
  {
    id: 2,
    name: "IONOS",
    category: "world",
    logo: "https://www.ionos.com/favicon.ico",
    features: ["Лише €0.90 на місяць", "Річний план", "Максимальна економія"],
    price: "€0.90/міс",
    discount: "Суперціна",
    link: "https://www.ionos.com/",
    color: "#003d8f"
  },
  {
    id: 3,
    name: "SiteGround",
    category: "world",
    logo: "https://www.siteground.com/favicon.ico",
    features: ["Лише €1.79 на місяць", "Швидкий SSD", "Google Cloud Platform"],
    price: "€1.79/міс",
    discount: "Знижка -80%",
    link: "https://www.siteground.com/",
    color: "#42210b"
  },
  {
    id: 4,
    name: "HostArmada",
    category: "world",
    logo: "https://www.hostarmada.com/favicon.ico",
    features: ["Лише €1.34 на місяць", "Хмарний хостинг", "Безкоштовний домен"],
    price: "€1.34/міс",
    discount: "Найкраща пропозиція",
    link: "https://hostarmada.com/",
    color: "#2b1b9a"
  },
  {
    id: 5,
    name: "InterServer",
    category: "world",
    logo: "https://www.interserver.net/favicon.ico",
    features: ["Перший місяць за €0.01", "Код: 01CENT", "Безлімітний трафік"],
    price: "€0.01 (1-й міс)",
    discount: "Промокод",
    link: "https://www.interserver.net/",
    color: "#215393"
  },
  {
    id: 6,
    name: "GreenGeeks",
    category: "world",
    logo: "https://www.greengeeks.com/favicon.ico",
    features: ["Еко-хостинг", "Знижка на річний план", "300% Green Power"],
    price: "€1.75/міс",
    discount: "-70% Off",
    link: "https://www.greengeeks.com/",
    color: "#00704a"
  },
  {
    id: 7,
    name: "Nexcess",
    category: "world",
    logo: "https://www.nexcess.net/favicon.ico",
    features: ["Заощаджуйте до 60%", "Managed WordPress", "Висока продуктивність"],
    price: "від €15/міс",
    discount: "Знижка -60%",
    link: "https://www.nexcess.net/",
    color: "#00a9e0"
  },
  {
    id: 8,
    name: "InMotion Hosting",
    category: "world",
    logo: "https://www.inmotionhosting.com/favicon.ico",
    features: ["Заощаджуйте до 73%", "Безкоштовний домен", "90 днів гарантії"],
    price: "від €2.29/міс",
    discount: "Знижка -73%",
    link: "https://www.inmotionhosting.com/",
    color: "#ed1c24"
  },
  {
    id: 9,
    name: "Hosting.com",
    category: "world",
    logo: "https://www.hosting.com/favicon.ico",
    features: ["Знижка до 87%", "Premium Support", "Enterprise Ready"],
    price: "від €2.15/міс",
    discount: "Знижка -87%",
    link: "https://www.hosting.com/",
    color: "#00539b"
  },
  {
    id: 10,
    name: "Kinsta",
    category: "world",
    logo: "https://kinsta.com/favicon.ico",
    features: ["30 днів гарантії", "Google Cloud Tier 1", "Преміум підтримка"],
    price: "від €30/міс",
    discount: "Get Deal",
    link: "https://kinsta.com/",
    color: "#5333ed"
  },
  {
    id: 11,
    name: "Domain.com",
    category: "world",
    logo: "https://www.domain.com/favicon.ico",
    features: ["Лише €3.37 на місяць", "Найкращі домени", "Проста настройка"],
    price: "€3.37/міс",
    discount: "Hot Deal",
    link: "https://www.domain.com/",
    color: "#000000"
  },
  {
    id: 12,
    name: "ScalaHosting",
    category: "world",
    logo: "https://www.scalahosting.com/favicon.ico",
    features: ["Заощаджуйте до 81%", "SPanel Control Panel", "Managed Cloud VPS"],
    price: "від €2.95/міс",
    discount: "Знижка -81%",
    link: "https://www.scalahosting.com/",
    color: "#0093d0"
  },
  {
    id: 13,
    name: "A2 Hosting",
    category: "world",
    logo: "https://www.a2hosting.com/favicon.ico",
    features: ["20x Faster Turbo", "Знижка 87%", "Anytime Money Back"],
    price: "від €2.99/міс",
    discount: "Знижка -87%",
    link: "https://www.a2hosting.com/",
    color: "#74bb44"
  },
  {
    id: 14,
    name: "HostPapa",
    category: "world",
    logo: "https://www.hostpapa.com/favicon.ico",
    features: ["85% знижка сьогодні", "Для малого бізнесу", "Безкоштовний SSL"],
    price: "від €2.95/міс",
    discount: "Знижка -85%",
    link: "https://www.hostpapa.com/",
    color: "#61a60e"
  },
  {
    id: 15,
    name: "HostGator",
    category: "world",
    logo: "https://www.hostgator.com/favicon.ico",
    features: ["30 днів гарантії", "Unmetered Bandwidth", "Free Migration"],
    price: "від €2.75/міс",
    discount: "Get Deal",
    link: "https://www.hostgator.com/",
    color: "#ffc808"
  },
  {
    id: 16,
    name: "Veeble",
    category: "world",
    logo: "https://www.veeble.com/favicon.ico",
    features: ["Заощаджуйте 25%", "Linux & Windows VPS", "24/7 Support"],
    price: "від €5/міс",
    discount: "Код: VEE25",
    link: "https://www.veeble.com/",
    color: "#ff6c2c"
  },
  {
    id: 17,
    name: "Host Color",
    category: "world",
    logo: "https://www.hostcolor.com/favicon.ico",
    features: ["Лише €3.58 на місяць", "Dedicated Servers", "Cloud Hosting"],
    price: "€3.58/міс",
    discount: "Best Price",
    link: "https://www.hostcolor.com/",
    color: "#d0021b"
  },
  {
    id: 18,
    name: "HostWithLove",
    category: "world",
    logo: "https://www.hostwithlove.com/favicon.ico",
    features: ["Заощаджуйте до 25%", "Multi-location", "Free Backup"],
    price: "від €3.90/міс",
    discount: "Знижка -25%",
    link: "https://www.hostwithlove.com/",
    color: "#f05a28"
  },
  {
    id: 19,
    name: "Snel",
    category: "world",
    logo: "https://www.snel.com/favicon.ico",
    features: ["60% знижка на рік", "Pure SSD Hosting", "Нідерланди"],
    price: "від €4.50/міс",
    discount: "Знижка -60%",
    link: "https://www.snel.com/",
    color: "#00aed3"
  },
  {
    id: 20,
    name: "KnownSRV",
    logo: "https://www.knownsrv.com/favicon.ico",
    features: ["Лише €2.24 на місяць", "Річний план", "DDoS Protection"],
    price: "€2.24/міс",
    discount: "Hot Price",
    link: "https://www.knownsrv.com/",
    color: "#1a1a1a"
  }, 
  {
    id: 21,
    name: "MeraHost",
    category: "world",
    logo: "https://merahost.com/favicon.ico",
    features: ["Заощаджуйте 50%", "3-річний план", "Безкоштовна міграція"],
    price: "від €1.50/міс",
    discount: "Знижка -50%",
    link: "https://merahost.com/",
    color: "#ff4b2b"
  },
  {
    id: 22,
    name: "GlowHost",
    category: "world",
    logo: "https://glowhost.com/favicon.ico",
    features: ["2 Місяці БЕЗКОШТОВНО", "Reseller Hosting", "Код на реєстрацію"],
    price: "від €4.95/міс",
    discount: "2 міс. у подарунок",
    link: "https://glowhost.com/",
    color: "#ff9900"
  },
  {
    id: 23,
    name: "Niagahoster",
    category: "world",
    logo: "https://www.niagahoster.co.id/favicon.ico",
    features: ["Заощаджуйте до 75%", "WordPress Hosting", "Високий аптайм"],
    price: "від €1.20/міс",
    discount: "Знижка -75%",
    link: "https://www.niagahoster.co.id/",
    color: "#007aff"
  },
  {
    id: 24,
    name: "VodaHost",
    category: "world",
    logo: "https://www.vodahost.com/favicon.ico",
    features: ["Знижка €22.39/міс", "Reseller Specialist", "Сайт-білдер"],
    price: "€22.39 економія",
    discount: "Супер економія",
    link: "https://www.vodahost.com/",
    color: "#004a99"
  },
  {
    id: 25,
    name: "LowcHost",
    category: "world",
    logo: "https://lowchost.com/favicon.ico",
    features: ["2 місяці безкоштовно", "Річний план", "SSD диски"],
    price: "від €2.50/міс",
    discount: "2 міс. Free",
    link: "https://lowchost.com/",
    color: "#333333"
  },
  {
    id: 26,
    name: "Real IT Solution",
    category: "world",
    logo: "https://realitsolution.com/favicon.ico",
    features: ["Лише €8.98 на місяць", "Reseller Plan", "Цілодобова підтримка"],
    price: "€8.98/міс",
    discount: "Best Price",
    link: "https://realitsolution.com/",
    color: "#1d71b8"
  },
  {
    id: 27,
    name: "Liquid Web",
    category: "world",
    logo: "https://www.liquidweb.com/favicon.ico",
    features: ["Заощаджуйте до 75%", "Premium Managed Hosting", "VIP підтримка"],
    price: "від €15/міс",
    discount: "Знижка -75%",
    link: "https://www.liquidweb.com/",
    color: "#2a3d4f"
  },
  {
    id: 28,
    name: "SeedVPS",
    category: "world",
    logo: "https://www.seedvps.com/favicon.ico",
    features: ["Лише €8.98 на місяць", "Швидкі VPS", "Privacy Protected"],
    price: "€8.98/міс",
    discount: "Hot Deal",
    link: "https://www.seedvps.com/",
    color: "#6eba3d"
  },
  {
    id: 29,
    name: "HOSTLIFE",
    category: "world",
    logo: "https://hostlife.net/favicon.ico",
    features: ["20% ЗНИЖКА", "2-річний план", "Локації: UA, EU, USA"],
    price: "від €3.50/міс",
    discount: "Знижка -20%",
    link: "https://hostlife.net/",
    color: "#00a1e4"
  },
  {
    id: 30,
    name: "Cloudways",
    category: "world",
    logo: "https://www.cloudways.com/favicon.ico",
    features: ["Лише €9.87 на місяць", "Керований Cloud", "DigitalOcean/AWS"],
    price: "€9.87/міс",
    discount: "Managed Cloud",
    link: "https://www.cloudways.com/",
    color: "#2c39e1"
  },
  {
    id: 31,
    name: "Hostkey",
    category: "world",
    logo: "https://hostkey.com/favicon.ico",
    features: ["Лише €6.05 на місяць", "GPU Servers", "Dedicated Bare Metal"],
    price: "€6.05/міс",
    discount: "Best VPS Deal",
    link: "https://hostkey.com/",
    color: "#f37021"
  },
  {
    id: 32,
    name: "JaguarPC",
    category: "world",
    logo: "https://www.jaguarpc.com/favicon.ico",
    features: ["Заощаджуйте 20%", "Хмарний хостинг", "Код на реєстрацію"],
    price: "від €4.00/міс",
    discount: "Promo Code",
    link: "https://www.jaguarpc.com/",
    color: "#000000"
  },
  {
    id: 33,
    name: "WNPower",
    category: "world",
    logo: "https://wnpower.com/favicon.ico",
    features: ["Насолоджуйтесь 52% ЗНИЖКОЮ", "cPanel WordPress", "Авто-оптимізація"],
    price: "від €2.10/міс",
    discount: "Знижка -52%",
    link: "https://wnpower.com/",
    color: "#ff6600"
  },
  {
    id: 34,
    name: "ValueHosted",
    category: "world",
    logo: "https://valuehosted.com/favicon.ico",
    features: ["5% ЗНИЖКА на Linux VPS", "SSD Storage", "Безліміт трафіку"],
    price: "від €4.99/міс",
    discount: "Знижка -5%",
    link: "https://valuehosted.com/",
    color: "#004b91"
  },
  {
    id: 35,
    name: "BigRock",
    category: "world",
    logo: "https://www.bigrock.com/favicon.ico",
    features: ["Заощаджуйте до 60%", "Домени + Хостинг", "Local Support"],
    price: "від €1.50/міс",
    discount: "Знижка -60%",
    link: "https://www.bigrock.com/",
    color: "#e21e26"
  },
  {
    id: 36,
    name: "UK2",
    category: "world",
    logo: "https://www.uk2.net/favicon.ico",
    features: ["БЕЗКОШТОВНИЙ домен", "Веб-хостинг пакет", "Британська якість"],
    price: "від £2.00/міс",
    discount: "Free Domain",
    link: "https://www.uk2.net/",
    color: "#002a5c"
  },
  {
    id: 37,
    name: "Namecheap",
    category: "world",
    logo: "https://www.namecheap.com/favicon.ico",
    features: ["Заощаджуйте до 65%", "Безкоштовний SSL", "Top Security"],
    price: "від €1.98/міс",
    discount: "Знижка -65%",
    link: "https://www.namecheap.com/",
    color: "#de3723"
  },
  {
    id: 38,
    name: "ChemiCloud",
    category: "world",
    logo: "https://chemicloud.com/favicon.ico",
    features: ["Лише €3.55 на місяць", "Довічний домен", "Turbo Speed"],
    price: "€3.55/міс",
    discount: "Exclusive Offer",
    link: "https://chemicloud.com/",
    color: "#6244f9"
  },
  {
    id: 39,
    name: "DreamHost",
    category: "world",
    logo: "https://www.dreamhost.com/favicon.ico",
    features: ["Заощаджуйте до 79%", "WordPress Recommended", "Privacy Included"],
    price: "від €2.59/міс",
    discount: "Знижка -79%",
    link: "https://www.dreamhost.com/",
    color: "#198cff"
  },
  {
    id: 40,
    name: "3dcart",
    category: "world",
    logo: "https://www.shift4shop.com/favicon.ico",
    features: ["10% ЗНИЖКА на рік", "Ecommerce Platform", "All-in-one"],
    price: "від €19/міс",
    discount: "Знижка -10%",
    link: "https://www.shift4shop.com/",
    color: "#252e3d"
  }, 
  {
    id: 41,
    name: "Nominalia",
    category: "world",
    logo: "https://www.nominalia.com/favicon.ico",
    features: ["50% ЗНИЖКА", "Linux Веб-хостинги", "Європейські сервери"],
    price: "від €4.25/міс",
    discount: "Знижка -50%",
    link: "https://www.nominalia.com/",
    color: "#e30613"
  },
  {
    id: 42,
    name: "WP Engine",
    category: "world",
    logo: "https://wpengine.com/favicon.ico",
    features: ["Заощаджуйте до 20%", "Managed WordPress", "Код: WPE20"],
    price: "від €20/міс",
    discount: "Промокод",
    link: "https://wpengine.com/",
    color: "#00b3e3"
  },
  {
    id: 43,
    name: "NameHero",
    category: "world",
    logo: "https://www.namehero.com/favicon.ico",
    features: ["Заощаджуйте 45%", "Cloud VPS Hosting", "LiteSpeed Powered"],
    price: "від €4.30/міс",
    discount: "Знижка -45%",
    link: "https://www.namehero.com/",
    color: "#ff9000"
  },
  {
    id: 44,
    name: "Dinahosting",
    category: "world",
    logo: "https://dinahosting.com/favicon.ico",
    features: ["Заощаджуйте до 75%", "SSD NVMe", "24/7 Підтримка"],
    price: "від €2.50/міс",
    discount: "Знижка -75%",
    link: "https://dinahosting.com/",
    color: "#00a19a"
  },
  {
    id: 45,
    name: "Alastyr",
    category: "world",
    logo: "https://alastyr.com/favicon.ico",
    features: ["20% ЗНИЖКА", "2-річний план", "Швидка активація"],
    price: "від €3.90/міс",
    discount: "Знижка -20%",
    link: "https://alastyr.com/",
    color: "#23395b"
  },
  {
    id: 46,
    name: "ARZ HOST",
    category: "world",
    logo: "https://arzhost.com/favicon.ico",
    features: ["5% додаткова знижка", "Використовуйте код", "DDoS Protection"],
    price: "від €3.50/міс",
    discount: "Промокод -5%",
    link: "https://arzhost.com/",
    color: "#1b2d48"
  },
  {
    id: 47,
    name: "Templ.io",
    category: "world",
    logo: "https://templ.io/favicon.ico",
    features: ["2 Місяці БЕЗКОШТОВНО", "Google Cloud Platform", "Managed WP"],
    price: "2 міс. у подарунок",
    discount: "Free Trial",
    link: "https://templ.io/",
    color: "#4a90e2"
  },
  {
    id: 48,
    name: "Contabo",
    category: "world",
    logo: "https://contabo.com/favicon.ico",
    features: ["Лише €3.58 на місяць", "Німецька якість", "High-End VPS"],
    price: "€3.58/міс",
    discount: "Найкраща ціна",
    link: "https://contabo.com/",
    color: "#004e9a"
  },
  {
    id: 49,
    name: "ResellerClub",
    category: "world",
    logo: "https://www.resellerclub.com/favicon.ico",
    features: ["Заощаджуйте до 30%", "План Веб-хостинги", "Multi-brand panel"],
    price: "від €2.49/міс",
    discount: "Знижка -30%",
    link: "https://www.resellerclub.com/",
    color: "#f15a24"
  },
  {
    id: 50,
    name: "Accuweb Hosting",
    category: "world",
    logo: "https://www.accuwebhosting.com/favicon.ico",
    features: ["Заощаджуйте 15%", "Windows & Linux", "Код на VPS"],
    price: "від €5.45/міс",
    discount: "Промокод -15%",
    link: "https://www.accuwebhosting.com/",
    color: "#0073aa"
  },
  {
    id: 51,
    name: "VANGUS",
    category: "world",
    logo: "https://vangus.com/favicon.ico",
    features: ["30% знижка на рік", "Reseller Hosting", "Швидкі диски"],
    price: "від €6.99/міс",
    discount: "Знижка -30%",
    link: "https://vangus.com/",
    color: "#ffcc00"
  },
  {
    id: 52,
    name: "OVHcloud",
    category: "world",
    logo: "https://www.ovhcloud.com/favicon.ico",
    features: ["Лише €3.58 на місяць", "Глобальна мережа", "Безлімітний трафік"],
    price: "€3.58/міс",
    discount: "Hot Deal",
    link: "https://www.ovhcloud.com/",
    color: "#004494"
  },
  {
    id: 53,
    name: "Miss Hosting",
    category: "world",
    logo: "https://misshosting.com/favicon.ico",
    features: ["Заощаджуйте до 82%", "Локації по всьому світу", "SSL включено"],
    price: "від €1.00/міс",
    discount: "Знижка -82%",
    link: "https://misshosting.com/",
    color: "#e4002b"
  },
  {
    id: 54,
    name: "Jetorbit",
    category: "world",
    logo: "https://jetorbit.com/favicon.ico",
    features: ["20% ЗНИЖКА", "Веб-хостинги", "Висока швидкість"],
    price: "від €2.20/міс",
    discount: "Знижка -20%",
    link: "https://jetorbit.com/",
    color: "#00c4cc"
  },
  {
    id: 55,
    name: "Hostplay",
    category: "world",
    logo: "https://hostplay.com/favicon.ico",
    features: ["15% ЗНИЖКА на сервер", "Dedicated Servers", "Код при реєстрації"],
    price: "від €45/міс",
    discount: "Промокод -15%",
    link: "https://hostplay.com/",
    color: "#2a2a2a"
  },
  {
    id: 56,
    name: "Keliweb",
    category: "world",
    logo: "https://www.keliweb.it/favicon.ico",
    features: ["Економія €5.30/міс", "Italian Data Center", "CMS Optimize"],
    price: "€5.30 економія",
    discount: "Знижка на VPS",
    link: "https://www.keliweb.it/",
    color: "#f58220"
  },
  {
    id: 57,
    name: "Hostigger",
    category: "world",
    logo: "https://hostigger.com/favicon.ico",
    features: ["Лише €5.38 на місяць", "Місячний план", "SSD Storage"],
    price: "€5.38/міс",
    discount: "Best Price",
    link: "https://hostigger.com/",
    color: "#253b80"
  },
  {
    id: 58,
    name: "Sprinthost",
    category: "world",
    logo: "https://sprinthost.ru/favicon.ico",
    features: ["Додаткова знижка €5.83", "Код на хостинг", "Зручна панель"],
    price: "€5.83 бонус",
    discount: "Промокод",
    link: "https://sprinthost.ru/",
    color: "#ef4123"
  },
  {
    id: 59,
    name: "HOSTENS",
    category: "world",
    logo: "https://www.hostens.com/favicon.ico",
    features: ["50% ЗНИЖКА на річний план", "S10 та R10 плани", "Код: 50OFF"],
    price: "від €1.20/міс",
    discount: "Знижка -50%",
    link: "https://www.hostens.com/",
    color: "#f7b500"
  },
  {
    id: 60,
    name: "dhosting.com",
    category: "world",
    logo: "https://dhosting.com/favicon.ico",
    features: ["Заощаджуйте до 29%", "Dynamic Edge", "Авто-масштабування"],
    price: "від €3.99/міс",
    discount: "Знижка -29%",
    link: "https://dhosting.com/",
    color: "#0052cc"
  }, 
  {
    id: 61,
    name: "Database Mart",
    category: "world",
    logo: "https://www.databasemart.com/favicon.ico",
    features: ["50% знижка на VPS", "Windows/Linux VPS", "Код при реєстрації"],
    price: "від €4.99/міс",
    discount: "Знижка -50%",
    link: "https://www.databasemart.com/",
    color: "#0056b3"
  },
  {
    id: 62,
    name: "FastComet",
    category: "world",
    logo: "https://www.fastcomet.com/favicon.ico",
    features: ["Лише €1.61 на місяць", "Cloud SSD Hosting", "24/7 Support"],
    price: "€1.61/міс",
    discount: "Суперціна",
    link: "https://www.fastcomet.com/",
    color: "#f05123"
  },
  {
    id: 63,
    name: "Verpex",
    category: "world",
    logo: "https://verpex.com/favicon.ico",
    features: ["Заощаджуйте до 90%", "Безкоштовний домен", "Unlimited SSL"],
    price: "від €0.50/міс",
    discount: "Знижка -90%",
    link: "https://verpex.com/",
    color: "#6c47ff"
  },
  {
    id: 64,
    name: "tsoHost",
    category: "world",
    logo: "https://www.tsohost.com/favicon.ico",
    features: ["30 днів гарантії", "UK Data Centers", "Надійна підтримка"],
    price: "від £3.99/міс",
    discount: "Get Deal",
    link: "https://www.tsohost.com/",
    color: "#1d2b3a"
  },
  {
    id: 65,
    name: "KVC Hosting",
    category: "world",
    logo: "https://www.kvchosting.net/favicon.ico",
    features: ["50% на перший місяць", "Код: 50PERCENT", "SSD VPS"],
    price: "50% Off 1st Mo",
    discount: "Промокод",
    link: "https://www.kvchosting.net/",
    color: "#e31e24"
  },
  {
    id: 66,
    name: "Hostiso",
    category: "world",
    logo: "https://hostiso.com/favicon.ico",
    features: ["60 днів гарантії", "Managed Cloud", "Вільна міграція"],
    price: "від €3.99/міс",
    discount: "Get Deal",
    link: "https://hostiso.com/",
    color: "#1a73e8"
  },
  {
    id: 67,
    name: "Relentless Hosting",
    category: "world",
    logo: "https://relentlesshosting.com.au/favicon.ico",
    features: ["30 днів гарантії", "AU Data Centers", "Premium Hardware"],
    price: "від $4.95/міс",
    discount: "Get Deal",
    link: "https://relentlesshosting.com.au/",
    color: "#000000"
  },
  {
    id: 68,
    name: "Valcato Internet",
    category: "world",
    logo: "https://www.valcato.com/favicon.ico",
    features: ["25% на перший місяць", "Веб-хостинги", "Код: VAL25"],
    price: "25% Off 1st Mo",
    discount: "Промокод",
    link: "https://www.valcato.com/",
    color: "#27ae60"
  },
  {
    id: 69,
    name: "Crazy Domains",
    category: "world",
    logo: "https://www.crazydomains.com/favicon.ico",
    features: ["Заощаджуйте до 20%", "Домени + Хостинг", "Код: CRAZY20"],
    price: "від €2.50/міс",
    discount: "Промокод -20%",
    link: "https://www.crazydomains.com/",
    color: "#911a7a"
  },
  {
    id: 70,
    name: "Bluehost",
    category: "world",
    logo: "https://www.bluehost.com/favicon.ico",
    features: ["Лише €1.79 на місяць", "WP Recommended", "Free Domain"],
    price: "€1.79/міс",
    discount: "Top Offer",
    link: "https://www.bluehost.com/",
    color: "#1274e6"
  },
  {
    id: 71,
    name: "Network Solutions",
    category: "world",
    logo: "https://www.networksolutions.com/favicon.ico",
    features: ["Лише €3.31 на місяць", "Professional Email", "Website Builder"],
    price: "€3.31/міс",
    discount: "Business Deal",
    link: "https://www.networksolutions.com/",
    color: "#005696"
  },
  {
    id: 72,
    name: "Hostwinds",
    category: "world",
    logo: "https://www.hostwinds.com/favicon.ico",
    features: ["Заощаджуйте до 25%", "Business Hosting", "100% Satisfaction"],
    price: "від €5.24/міс",
    discount: "Знижка -25%",
    link: "https://www.hostwinds.com/",
    color: "#007bff"
  },
  {
    id: 73,
    name: "GoDaddy",
    category: "world",
    logo: "https://www.godaddy.com/favicon.ico",
    features: ["Лише €2.68 на місяць", "БЕЗКОШТОВНИЙ домен", "Код включено"],
    price: "€2.68/міс",
    discount: "Best Seller",
    link: "https://www.godaddy.com/",
    color: "#00a63f"
  },
  {
    id: 74,
    name: "Serverplan",
    category: "world",
    logo: "https://www.serverplan.com/favicon.ico",
    features: ["30% на річний план", "Italian Hosting", "NVMe Storage"],
    price: "від €2.00/міс",
    discount: "Знижка -30%",
    link: "https://www.serverplan.com/",
    color: "#f47920"
  },
  {
    id: 75,
    name: "cHosting",
    category: "world",
    logo: "https://chosting.dk/favicon.ico",
    features: ["20% ЗНИЖКА", "Код на реєстрацію", "Danish Reliability"],
    price: "від €3.50/міс",
    discount: "Промокод -20%",
    link: "https://chosting.dk/",
    color: "#000000"
  },
  {
    id: 76,
    name: "FlokiNET",
    category: "world",
    logo: "https://flokinet.is/favicon.ico",
    features: ["Заощаджуйте 15%", "Freedom of Speech", "Offshore Hosting"],
    price: "від €15/міс",
    discount: "Знижка -15%",
    link: "https://flokinet.is/",
    color: "#e30613"
  },
  {
    id: 77,
    name: "WebTuga",
    category: "world",
    logo: "https://www.webtuga.pt/favicon.ico",
    features: ["25% знижка", "Перше придбання", "Portuguese Servers"],
    price: "від €3.25/міс",
    discount: "Promo -25%",
    link: "https://www.webtuga.pt/",
    color: "#00a651"
  },
  {
    id: 78,
    name: "Hosting Marketers",
    category: "world",
    logo: "https://hostingmarketers.com/favicon.ico",
    features: ["Додаткова 10% знижка", "Код: HM10", "Marketing Tools"],
    price: "від €4.99/міс",
    discount: "Промокод",
    link: "https://hostingmarketers.com/",
    color: "#ff8c00"
  },
  {
    id: 79,
    name: "Host-Age.ro",
    category: "world",
    logo: "https://host-age.ro/favicon.ico",
    features: ["50% на 6 місяців", "Romanian Data Center", "Код при реєстрації"],
    price: "50% Off 6 Mo",
    discount: "Суперціна",
    link: "https://host-age.ro/",
    color: "#002e5d"
  },
  {
    id: 80,
    name: "Super Byte Hosting",
    category: "world",
    logo: "https://superbytehosting.com/favicon.ico",
    features: ["Знижка на SSL", "10% на сертифікати", "Secure Web"],
    price: "від €9.99/рік",
    discount: "SSL Promo",
    link: "https://superbytehosting.com/",
    color: "#34495e"
  }, 
  {
    id: 81,
    name: "Duplika",
    category: "world",
    logo: "https://www.duplika.com/favicon.ico",
    features: ["Отримайте 80% знижку", "Аргентинський хостинг", "Код при реєстрації"],
    price: "від €1.50/міс",
    discount: "Знижка -80%",
    link: "https://www.duplika.com/",
    color: "#00a8e1"
  },
  {
    id: 82,
    name: "Swiss-Vps",
    category: "world",
    logo: "https://swiss-vps.com/favicon.ico",
    features: ["10% ЗНИЖКА на плани", "Швейцарська приватність", "Код: SWISS10"],
    price: "від €9.99/міс",
    discount: "Промокод -10%",
    link: "https://swiss-vps.com/",
    color: "#d52b1e"
  },
  {
    id: 83,
    name: "ScalaHosting",
    category: "world",
    logo: "https://www.scalahosting.com/favicon.ico",
    features: ["Managed Cloud VPS", "SPanel Control Panel", "Знижка до 81%"],
    price: "від €2.95/міс",
    discount: "Знижка -81%",
    link: "https://www.scalahosting.com/",
    color: "#0093d0"
  },
  {
    id: 84,
    name: "KnownSRV",
    category: "world",
    logo: "https://www.knownsrv.com/favicon.ico",
    features: ["Лише €2.24 на місяць", "DDoS Protection", "Швидка активація"],
    price: "€2.24/міс",
    discount: "Річний план",
    link: "https://www.knownsrv.com/",
    color: "#1a1a1a"
  },
  {
    id: 85,
    name: "HostPapa",
    category: "world",
    logo: "https://www.hostpapa.com/favicon.ico",
    features: ["85% знижка сьогодні", "Малий бізнес хостинг", "Безкоштовний SSL"],
    price: "від €2.95/міс",
    discount: "Знижка -85%",
    link: "https://www.hostpapa.com/",
    color: "#61a60e"
  },
  {
    id: 86,
    name: "Veeble",
    category: "world",
    logo: "https://www.veeble.com/favicon.ico",
    features: ["Заощаджуйте 25%", "Linux & Windows VPS", "Код: VEE25"],
    price: "від €5.00/міс",
    discount: "Знижка -25%",
    link: "https://www.veeble.com/",
    color: "#ff6c2c"
  },
  {
    id: 87,
    name: "VodaHost",
    category: "world",
    logo: "https://www.vodahost.com/favicon.ico",
    features: ["Сплачуйте на €22.39 менше", "Професійний реселлер", "Цілодобова підтримка"],
    price: "€22.39 економія",
    discount: "Best Offer",
    link: "https://www.vodahost.com/",
    color: "#004a99"
  },
  {
    id: 88,
    name: "Hostigger",
    category: "world",
    logo: "https://hostigger.com/favicon.ico",
    features: ["Лише €5.38 на місяць", "Місячний план", "SSD Storage"],
    price: "€5.38/міс",
    discount: "Best Price",
    link: "https://hostigger.com/",
    color: "#253b80"
  },
  {
    id: 89,
    name: "Jetorbit",
    category: "world",
    logo: "https://jetorbit.com/favicon.ico",
    features: ["20% ЗНИЖКА на хостинг", "NVMe SSD", "Безкоштовна міграція"],
    price: "від €2.20/міс",
    discount: "Знижка -20%",
    link: "https://jetorbit.com/",
    color: "#00c4cc"
  },
  {
    id: 90,
    name: "ValueHosted",
    category: "world",
    logo: "https://valuehosted.com/favicon.ico",
    features: ["5% ЗНИЖКА на VPS", "Linux VPS хостинг", "Висока стабільність"],
    price: "від €4.99/міс",
    discount: "Знижка -5%",
    link: "https://valuehosted.com/",
    color: "#004b91"
  },
  {
    id: 91,
    name: "InMotion Hosting",
    category: "world",
    logo: "https://www.inmotionhosting.com/favicon.ico",
    features: ["Знижка до 73%", "90 днів гарантії", "Для WordPress"],
    price: "від €2.29/міс",
    discount: "Знижка -73%",
    link: "https://www.inmotionhosting.com/",
    color: "#ed1c24"
  },
  {
    id: 92,
    name: "Hostwinds",
    category: "world",
    logo: "https://www.hostwinds.com/favicon.ico",
    features: ["Заощаджуйте до 25%", "Managed VPS", "Цілодобовий моніторинг"],
    price: "від €5.24/міс",
    discount: "Знижка -25%",
    link: "https://www.hostwinds.com/",
    color: "#007bff"
  },
  {
    id: 93,
    name: "A2 Hosting",
    category: "world",
    logo: "https://www.a2hosting.com/favicon.ico",
    features: ["Turbo Speed 20x Faster", "Anytime Money Back", "SSD NVMe"],
    price: "від €2.99/міс",
    discount: "Знижка -87%",
    link: "https://www.a2hosting.com/",
    color: "#74bb44"
  },
  {
    id: 94,
    name: "Cloudways",
    category: "world",
    logo: "https://www.cloudways.com/favicon.ico",
    features: ["Лише €9.87 на місяць", "Managed Hosting", "AWS & Google Cloud"],
    price: "€9.87/міс",
    discount: "Super Deal",
    link: "https://www.cloudways.com/",
    color: "#2c39e1"
  },
  {
    id: 95,
    name: "MeraHost",
    category: "world",
    logo: "https://merahost.com/favicon.ico",
    features: ["Заощаджуйте 50%", "3-річний план", "Для блогів"],
    price: "від €1.50/міс",
    discount: "Знижка -50%",
    link: "https://merahost.com/",
    color: "#ff4b2b"
  },
  {
    id: 96,
    name: "Hostiso",
    category: "world",
    logo: "https://hostiso.com/favicon.ico",
    features: ["60 днів гарантії", "Вільна міграція", "High Performance"],
    price: "від €3.99/міс",
    discount: "Get Deal",
    link: "https://hostiso.com/",
    color: "#1a73e8"
  },
  {
    id: 97,
    name: "NameHero",
    category: "world",
    logo: "https://www.namehero.com/favicon.ico",
    features: ["Заощаджуйте 45%", "LiteSpeed Web Server", "Cloud VPS"],
    price: "від €4.30/міс",
    discount: "Знижка -45%",
    link: "https://www.namehero.com/",
    color: "#ff9000"
  },
  {
    id: 98,
    name: "GreenGeeks",
    category: "world",
    logo: "https://www.greengeeks.com/favicon.ico",
    features: ["Eco-Friendly Hosting", "Швидкий SSD", "Цілодобова підтримка"],
    price: "€1.75/міс",
    discount: "-70% Off",
    link: "https://www.greengeeks.com/",
    color: "#00704a"
  },
  {
    id: 99,
    name: "ChemiCloud",
    category: "world",
    logo: "https://chemicloud.com/favicon.ico",
    features: ["Лише €3.55 на місяць", "Довічний домен", "World-class Support"],
    price: "€3.55/міс",
    discount: "Exclusive Offer",
    link: "https://chemicloud.com/",
    color: "#6244f9"
  },
  {
    id: 100,
    name: "GoDaddy",
    category: "world",
    logo: "https://www.godaddy.com/favicon.ico",
    features: ["Лише €2.68 на місяць", "Безкоштовний домен", "Маркетингові інструменти"],
    price: "€2.68/міс",
    discount: "Best Seller",
    link: "https://www.godaddy.com/",
    color: "#00a63f"
  },
  {
    id: 101,
    name: "Hostiq",
    category: "ukraine",
    logo: "https://hostiq.ua/favicon.ico",
    features: ["Найкраща підтримка в UA", "Безкоштовний SSL", "30 днів тесту"],
    price: "від 149 грн/міс",
    discount: "Знижка -40%",
    link: "https://hostiq.ua/clients/aff.php?aff=7869",
    color: "#ff6c00"
  },
  {
    id: 102,
    name: "FreeHost",
    category: "ukraine",
    logo: "https://freehost.com.ua/favicon.ico",
    features: ["Дата-центр у Києві", "Unix/Windows хостинг", "Домен .UA у подарунок"],
    price: "від 98 грн/міс",
    discount: "Акція 2026",
    link: "https://freehost.com.ua/",
    color: "#2a5da8"
  },
  {
    id: 103,
    name: "CityHost",
    category: "ukraine",
    logo: "https://cityhost.ua/favicon.ico",
    features: ["NVMe диски", "Автоматична установка CMS", "Власна панель"],
    price: "від 115 грн/міс",
    discount: "Знижка до -50%",
    link: "https://cityhost.ua/",
    color: "#00a0e3"
  },
  {
    id: 104,
    name: "Україна (UAHesting)",
    category: "ukraine",
    logo: "https://www.ukraine.com.ua/favicon.ico",
    features: ["Найпопулярніший в Україні", "Хмарний хостинг", "Техпідтримка 24/7"],
    price: "від 160 грн/міс",
    discount: "Надійний вибір",
    link: "https://www.ukraine.com.ua/",
    color: "#1e3050"
  },
  {
    id: 105,
    name: "HostPro",
    category: "ukraine",
    logo: "https://hostpro.ua/favicon.ico",
    features: ["Turbo-хостинг", "CDN безкоштовно", "Професійний перенос"],
    price: "від 180 грн/міс",
    discount: "Знижка -30%",
    link: "https://hostpro.ua/",
    color: "#e30613"
  },
  {
    id: 106,
    name: "Parkovka",
    category: "ukraine",
    logo: "https://parkovka.ua/favicon.ico",
    features: ["Швидкий запуск", "Захист від DDoS", "Безкоштовний SSL"],
    price: "від 89 грн/міс",
    discount: "Знижка -25%",
    link: "https://parkovka.ua/",
    color: "#fbba00"
  },
  {
    id: 107,
    name: "TheHost",
     category: "ukraine",
    logo: "https://thehost.ua/favicon.ico",
    features: ["Низькі ціни", "Власне залізо", "Локація: Україна/Європа"],
    price: "від 75 грн/міс",
    discount: "Найнижча ціна",
    link: "https://thehost.ua/partner/260132",
    color: "#0072bc"
  },
  {
    id: 108,
    name: "Tuthost",
    category: "ukraine",
    logo: "https://tuthost.ua/favicon.ico",
    features: ["LiteSpeed Web Server", "Backups щодня", "Пошта безкоштовно"],
    price: "від 130 грн/міс",
    discount: "Знижка -35%",
    link: "https://my.tuthost.ua/aff.php?aff=1269",
    color: "#ff4e00"
  },
  {
    id: 109,
    name: "HyperHost",
    category: "ukraine",
    logo: "https://hyperhost.ua/favicon.ico",
    features: ["Безкоштовне адміністрування", "VDS/VPS", "Супершвидкість"],
    price: "від 120 грн/міс",
    discount: "Акція -45%",
    link: "https://hyperhost.ua/client/aff.php?aff=2270",
    color: "#2ecc71"
  },
  {
    id: 110,
    name: "RX-Name",
    category: "ukraine",
    logo: "https://rx-name.ua/favicon.ico",
    features: ["Дата-центр рівня Tier III", "Хмарна інфраструктура", "SSL-сертифікати"],
    price: "від 150 грн/міс",
    discount: "Pro Хостинг",
    link: "https://rx-name.ua/",
    color: "#34495e"
  },
  {
    id: 111,
    name: "GigaCloud",
    category: "ukraine",
    logo: "https://gigacloud.ua/favicon.ico",
    features: ["Корпоративна хмара", "Для великих проектів", "PCI DSS"],
    price: "за запитом",
    discount: "Enterprise",
    link: "https://gigacloud.ua/",
    color: "#00aed9"
  },
  {
    id: 112,
    name: "UaHosting",
    category: "ukraine",
    logo: "https://uahosting.com.ua/favicon.ico",
    features: ["Стабільність роками", "Домен у подарунок", "PHP 8.x підтримка"],
    price: "від 95 грн/міс",
    discount: "Знижка -15%",
    link: "https://uahosting.com.ua/",
    color: "#ffcc00"
  },
  {
    id: 113,
    name: "Best-Host",
    category: "ukraine",
    logo: "https://best-host.com.ua/favicon.ico",
    features: ["SSD накопичувачі", "Захист від атак", "Зручна Cpanel"],
    price: "від 60 грн/міс",
    discount: "Економ",
    link: "https://best-host.com.ua/",
    color: "#27ae60"
  },
  {
    id: 114,
    name: "Besthosting",
    category: "ukraine",
    logo: "https://besthosting.ua/favicon.ico",
    features: ["Українські сервери", "Щоденний бекап", "Безкоштовний перенос"],
    price: "від 110 грн/міс",
    discount: "Знижка -20%",
    link: "https://besthosting.ua/",
    color: "#003366"
  },
  {
    id: 115,
    name: "Deltahost",
    category: "ukraine",
    logo: "https://deltahost.ua/favicon.ico",
    features: ["Оренда серверів", "Локація Київ/Нідерланди", "Швидка підтримка"],
    price: "від 200 грн/міс",
    discount: "VDS Pro",
    link: "https://deltahost.ua/",
    color: "#000000"
  },
  {
    id: 116,
    name: "Gmhost",
    category: "ukraine",
    logo: "https://gmhost.ua/favicon.ico",
    features: ["Хмарні сервери", "Colocation", "Тестовий період"],
    price: "від 105 грн/міс",
    discount: "Cloud Promo",
    link: "https://gmhost.ua/",
    color: "#5c2d91"
  },
  {
    id: 117,
    name: "MiraHost",
    category: "ukraine",
    logo: "https://mirahost.ua/favicon.ico",
    features: ["Оптимізовано під WP", "SSD диски", "Локальна підтримка"],
    price: "від 130 грн/міс",
    discount: "Hot Deal",
    link: "https://mirahost.ua/",
    color: "#3498db"
  },
  {
    id: 118,
    name: "XServer",
    category: "ukraine",
    logo: "https://xserver.ua/favicon.ico",
    features: ["Виділені сервери", "Власний ДЦ", "Високий аптайм"],
    price: "від 250 грн/міс",
    discount: "Server Expert",
    link: "https://xserver.ua/",
    color: "#e67e22"
  },
  {
    id: 119,
    name: "Zomro",
    category: "ukraine",
    logo: "https://zomro.com/favicon.ico",
    features: ["Дуже дешеві VPS", "Швидка установка", "Цілодобовий чат"],
    price: "від €2.00/міс",
    discount: "Супер економ",
    link: "https://zomro.com/",
    color: "#4caf50"
  },
  {
    id: 120,
    name: "WPHost",
    category: "ukraine",
    logo: "https://wphost.me/favicon.ico",
    features: ["Тільки для WordPress", "Надшвидка робота", "Security Shield"],
    price: "від 199 грн/міс",
    discount: "WP Speed",
    link: "https://wphost.me/",
    color: "#21759b"
  },
  {
    id: 121,
    name: "HV.ua",
    category: "ukraine",
    logo: "https://hv.ua/favicon.ico",
    features: ["Безлімітний трафік", "Конструктор сайтів", "NVMe SSD"],
    price: "від 110 грн/міс",
    discount: "Sale -20%",
    link: "https://hv.ua/",
    color: "#0052cc"
  },
  {
    id: 122,
    name: "S-Host",
    category: "ukraine",
    logo: "https://s-host.com.ua/favicon.ico",
    features: ["Домен у подарунок", "PHP 5.6 - 8.2", "Знижки до 50%"],
    price: "від 85 грн/міс",
    discount: "Знижка -50%",
    link: "https://s-host.com.ua/",
    color: "#e74c3c"
  },
  {
    id: 123,
    name: "Ukraine.com.ua (ВПС)",
    category: "ukraine",
    logo: "https://www.ukraine.com.ua/favicon.ico",
    features: ["Хмарні VDS", "Власний дата-центр", "Миттєве налаштування"],
    price: "від 240 грн/міс",
    discount: "VDS Pro",
    link: "https://www.ukraine.com.ua/vps/",
    color: "#1e3050"
  },
  {
    id: 124,
    name: "Domen-ua",
    category: "ukraine",
    logo: "https://domen-ua.com.ua/favicon.ico",
    features: ["Дешеві домени", "SSD хостинг", "24/7 підтримка"],
    price: "від 75 грн/міс",
    discount: "Best Price",
    link: "https://domen-ua.com.ua/",
    color: "#2ecc71"
  },
  {
    id: 125,
    name: "AvaHost",
    category: "ukraine",
    logo: "https://avahost.ua/favicon.ico",
    features: ["Локація: UA/EU/USA", "WordPress Auto-install", "SSL безкоштовно"],
    price: "від 140 грн/міс",
    discount: "Знижка -30%",
    link: "https://avahost.ua/",
    color: "#2980b9"
  },
  {
    id: 126,
    name: "TanHost",
    category: "ukraine",
    logo: "https://tanhost.ua/favicon.ico",
    features: ["Бюджетний хостинг", "Безкоштовний перенос", "cPanel"],
    price: "від 65 грн/міс",
    discount: "Економ",
    link: "https://tanhost.ua/",
    color: "#8e44ad"
  },
  {
    id: 127,
    name: "RealHOST",
    category: "ukraine",
    logo: "https://realhost.pro/favicon.ico",
    features: ["Хмарні сервери", "Автоматичні бекапи", "Захист DDoS"],
    price: "від 190 грн/міс",
    discount: "Cloud Start",
    link: "https://realhost.pro/",
    color: "#27ae60"
  },
  {
    id: 128,
    name: "ZooHost",
    category: "ukraine",
    logo: "https://zoohost.ua/favicon.ico",
    features: ["Швидка робота БД", "Відсутність лімітів", "Безкоштовна пошта"],
    price: "від 125 грн/міс",
    discount: "Знижка -15%",
    link: "https://zoohost.ua/",
    color: "#f39c12"
  },
  {
    id: 129,
    name: "Adamant",
    category: "ukraine",
    logo: "https://adamant.ua/favicon.ico",
    features: ["Власний Дата-центр", "Широкі канали зв'язку", "Colocation"],
    price: "від 210 грн/міс",
    discount: "Enterprise",
    link: "https://adamant.ua/",
    color: "#c0392b"
  },
  {
    id: 130,
    name: "EuroHoster",
    category: "ukraine",
    logo: "https://eurohoster.ua/favicon.ico",
    features: ["Оптимізовано під Bitrix", "Високий аптайм", "VDS у Європі"],
    price: "від 175 грн/міс",
    discount: "Premium",
    link: "https://eurohoster.ua/",
    color: "#34495e"
  },
  {
    id: 131,
    name: "HostLife UA",
    category: "ukraine",
    logo: "https://hostlife.net/favicon.ico",
    features: ["Преміум підтримка", "Захист SiteLock", "CDN"],
    price: "від 155 грн/міс",
    discount: "-25% Рік",
    link: "https://hostlife.net/ua/",
    color: "#00a1e4"
  },
  {
    id: 132,
    name: "Web-Host",
    category: "ukraine",
    logo: "https://web-host.ua/favicon.ico",
    features: ["PHP Selector", "SSH доступ", "Безлімітні БД"],
    price: "від 99 грн/міс",
    discount: "Акція",
    link: "https://web-host.ua/",
    color: "#16a085"
  },
  {
    id: 133,
    name: "G-Host",
    category: "ukraine",
    logo: "https://g-host.ua/favicon.ico",
    features: ["Авто-інсталятор CMS", "Щоденні бекапи", "SSD RAID 10"],
    price: "від 105 грн/міс",
    discount: "Hot Price",
    link: "https://g-host.ua/",
    color: "#2c3e50"
  },
  {
    id: 134,
    name: "UaUnit",
    category: "ukraine",
    logo: "https://uaunit.com/favicon.ico",
    features: ["Managed VPS", "Моніторинг 24/7", "Допомога з кодом"],
    price: "від 350 грн/міс",
    discount: "Managed",
    link: "https://uaunit.com/",
    color: "#d35400"
  },
  {
    id: 135,
    name: "TopHost",
    category: "ukraine",
    logo: "https://tophost.ua/favicon.ico",
    features: ["Швидкі сервери", "Гарантія повернення", "SSL включено"],
    price: "від 135 грн/міс",
    discount: "-20% OFF",
    link: "https://tophost.ua/",
    color: "#7f8c8d"
  },
  {
    id: 136,
    name: "Cloud.ua",
    category: "ukraine",
    logo: "https://cloud.ua/favicon.ico",
    features: ["IaaS рішення", "Бізнес хмара", "Кіберзахист"],
    price: "від 500 грн/міс",
    discount: "Business",
    link: "https://cloud.ua/",
    color: "#2980b9"
  },
  {
    id: 137,
    name: "Skydom",
    category: "ukraine",
    logo: "https://skydom.ua/favicon.ico",
    features: ["Для невеликих сайтів", "Проста панель", "Низький пінг"],
    price: "від 80 грн/міс",
    discount: "Starter",
    link: "https://skydom.ua/",
    color: "#1abc9c"
  },
  {
    id: 138,
    name: "Hosty.com.ua",
    category: "ukraine",
    logo: "https://hosty.com.ua/favicon.ico",
    features: ["LiteSpeed Web", "LSCache", "Безкоштовний тест"],
    price: "від 115 грн/міс",
    discount: "Turbo",
    link: "https://hosty.com.ua/",
    color: "#f1c40f"
  },
  {
    id: 139,
    name: "Inhost",
    category: "ukraine",
    logo: "https://inhost.ua/favicon.ico",
    features: ["SSD NVMe", "Захист від спаму", "Пошта на домені"],
    price: "від 145 грн/міс",
    discount: "Sale",
    link: "https://inhost.ua/",
    color: "#3498db"
  },
  {
    id: 140,
    name: "ProHoster",
    category: "ukraine",
    logo: "https://prohoster.info/favicon.ico",
    features: ["Конструктор сайтів", "Анонімність", "DDoS фільтрація"],
    price: "від 120 грн/міс",
    discount: "Promo",
    link: "https://prohoster.info/",
    color: "#e67e22"
  }
];

const PromoBanner = ({ category, count }) => {
  return (
    <div className="promo-info-banner">
      <div className="promo-banner-content">
      <h3>{category} — Купони та пропозиції, 2026</h3>
      <p>
        Ми моніторимо Інтернет на щоденній основі і видаляємо фальшиві купони. 
        Крім того, ми додаємо найновіші пропозиції, які знаходимо в мережі. 
        Наразі ми маємо <strong>{count} купонів та промокодів</strong> для {category}. 
        Натисніть на купон, щоб дізнатися більше, і повідомте нам, якщо він спрацював!
      </p>
    </div>
    <div className="promo-banner-glow"></div>
        </div>
  );
};

const TopToolsHosting = () => {
 
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
   const [selectedOffer, setSelectedOffer] = useState(null);

  // Фільтруємо дані з твого зовнішнього файлу
  const filteredTools = allHostings.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  // Функція для підвантаження при скролі
 const handleScroll = useCallback(() => {
  if (isLoading) return; // Якщо вже вантажимо — ігноруємо нові події

  const scrollTop = window.innerHeight + document.documentElement.scrollTop;
  const offsetHeight = document.documentElement.offsetHeight;

  // Спрацьовує, коли до футера залишилось 300px
  if (scrollTop >= offsetHeight - 300) {
    if (visibleCount < filteredTools.length) {
      setIsLoading(true); // Включаємо "паузу"
      
      // Імітуємо невелику затримку для стабільності
      setTimeout(() => {
        setVisibleCount(prev => prev + 20);
        setIsLoading(false); // Вимикаємо паузу
      }, 100); 
    }
  }
}, [visibleCount, filteredTools.length, isLoading]);

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [handleScroll]);

  // Беремо лише ту частину даних, яку треба показати
  const toolsToShow = filteredTools.slice(0, visibleCount);

  const handleOpenModal = (item) => {
    setSelectedOffer(item);
  };


  const handleTrackClick = async (item, pageSource) => {
  try {
    // Формуємо дані для відправки
    const payload = {
      name: "Користувач (Клік)", 
      email: "click-tracker@marketingkit.com", 
      text: `Клік на: ${item.name} (Сторінка: ${pageSource})`,
      source: "Gold Page Modal Open", 
      articleTitle: item.name, 
      articleSlug: item.id || "tool-click",
      actionType: "lead",
      site: "MARKETINGKIT",
      contact: "n/a"
    };

    // Відправка на твій бекенд (який потім шле в Make.com)
    await API.post('/send-to-make', payload);
    
    console.log(`📊 Статистика оновлена: ${item.name}`);
  } catch (error) {
    console.error("Помилка при збереженні кліку:", error.message);
  }
};

  return (
    <div className="gold-page-wrapper">
      <div className="gold-container">

           <Helmet>
            <title>Топ-хостинги 2026 — Рейтинг надійних сервісів</title>
             <meta name="description" content="Порівняння найкращих хостингів для вашого сайту. Отримайте знижки на українські та світові сервіси." />
             <meta property="og:title" content="Топ-хостинги 2026" />
             <meta property="og:image" content="посилання_на_картинку_для_соцмереж.jpg" />
           </Helmet>

        <header className="gold-header animate-fade-in">
          <h1>Топ-хостинги для ваших проєктів</h1>
          <p>Рейтинг найнадійніших сервісів, які забезпечать швидку роботу вашого сайту 24/7.</p>
        </header>

        {/* Кнопки Фільтрів */}
        <div className="filter-container">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'} 
            onClick={() => setFilter('all')}
          >
            Всі пропозиції
          </button>
          <button 
            className={filter === 'ukraine' ? 'filter-btn active' : 'filter-btn'} 
            onClick={() => setFilter('ukraine')}
          >
            🇺🇦 Українські
          </button>
          <button 
            className={filter === 'world' ? 'filter-btn active' : 'filter-btn'} 
            onClick={() => setFilter('world')}
          >
            🌎 Світові
          </button>
        </div>

        <PromoBanner category="Веб-хостинг" count={allHostings.length} />

       {/* ТАБЛИЦЯ ХОСТИНГІВ */}
        <div className="hosting-table animate-fade-in">
          <div className="table-header">
            <span>Сервіс</span>
            <span>Ключові переваги</span>
            <span>Вартість</span>
            <span>Дія</span>
          </div>

          {toolsToShow.map((item) => (
            <div key={item.id} className="table-row animate-fade-in">
              <div className="provider-info">
                <div className="logo-bg">
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="provider-logo" 
                    onError={(e) => {
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/1243/1243420.png'; 
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <strong>{item.name}</strong>
              </div>
              
              <div className="provider-features">
                {item.features.map((f, i) => (
                  <span key={i} className="feature-tag">{f}</span>
                ))}
              </div>
              
              <div className="provider-price">
                <span className="old-price">{item.discount}</span>
                <span className="current-price" style={{ color: item.color }}>{item.price}</span>
              </div>
              
              <div className="provider-action">
                <button 
    onClick={() => {
      // 1. Фіксуємо клік (передаємо дані з item)
      handleTrackClick({
        title: item.name,
        slug: item.id || 'service-tool'
      }, "Services List Page"); // Назву сторінки можеш змінити на свою

      // 2. Відкриваємо модалку, як і було раніше
      handleOpenModal(item);
    }} 
    className="claim-btn" 
    style={{ backgroundColor: item.color }}
  >
    Отримати пропозицію
  </button>
              </div>
            </div>
          ))}

          {/* Індикатор завантаження має бути ВСЕРЕДИНІ або одразу ПІСЛЯ таблиці */}
          {visibleCount < filteredTools.length && (
            <div className="loading-indicator">Завантаження ще 20 сервісів...</div>
          )}
        </div> {/* КІНЕЦЬ ТАБЛИЦІ */}

        {/* ПИТАННЯ - тепер вони будуть чітко під таблицею */}
        <div className="faq-wrapper" style={{ marginTop: '50px' }}>
           <FAQHosting />
        </div>

        {/* МОДАЛКА */}
        {selectedOffer && (
          <div className="offer-modal-overlay" onClick={() => setSelectedOffer(null)}>
            <div className="gold-modal-content" onClick={e => e.stopPropagation()}>
              <button className="gold-modal-close" onClick={() => setSelectedOffer(null)}>×</button>

              <div className="gold-modal-header">
                <div className="modal-logo-circle" style={{ borderColor: selectedOffer.color }}>
                  <img src={selectedOffer.logo} alt={selectedOffer.name} />
                </div>
                <div className="success-badge-mini">Пропозиція активована</div>
              </div>

              <div className="gold-modal-body">
                <h2>{selectedOffer.name}</h2>
                <p className="modal-price-tag">Доступно за <span>{selectedOffer.price}</span></p>
                <div className="gold-promo-box">
                  <div className="promo-status">
                     <span className="pulse-dot-green"></span>
                     Код не потрібен
                  </div>
                  <p>Знижка активується автоматично при переході</p>
                </div>
              </div>

              <button 
                className="gold-confirm-btn" 
                onClick={() => {
                  window.open(selectedOffer.link, '_blank', 'noopener,noreferrer');
                  setSelectedOffer(null);
                }}
                style={{ 
                  backgroundColor: selectedOffer.color,
                  boxShadow: `0 10px 20px ${selectedOffer.color}44` 
                }}
              >
                Перейти та отримати знижку
              </button>
              <p className="gold-modal-footer">
                Ви будете перенаправлені на офіційний сайт {selectedOffer.name}
              </p>
            </div>
          </div>
        )}

        
      </div>
      
    </div>
  );
};

export default TopToolsHosting;
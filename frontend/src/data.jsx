// Визначаємо категорії як константи, щоб не було помилок при друкуванні
export const CATEGORIES = {
  AI: "AI",
  EMAIL: "Email Marketing",
  HOSTING: "Hosting & Infrastructure",
  CRM: "CRM & Sales",
  CMS: "CMS",
  AUTOMATION: "Chatbots & Automation",
  MARKETING_TOOLS: "Marketing Tools",
  COMPARISONS: "Comparisons",
  GUIDES: "Guides & Tutorials",
  WEBSITE_BUILDER: "Website Builder",
  AFFILIATE: "Affiliate Marketing",
  SEO: "SEO",
  MARKETING: "Marketing"
};

// Тепер твій blog_topic стає масивом об'єктів на основі категорій
export const blog_topic = Object.values(CATEGORIES).map(cat => ({
  blog_title: cat
}));

// Категорії — тепер просто масив значень
export const blog_categories = Object.values(CATEGORIES);

// Теги — групуємо за призначенням (опціонально, але це дуже профі)
export const blog_tags = [
  { name: "Mailchimp", category: CATEGORIES.EMAIL },
  { name: "SendPulse", category: CATEGORIES.EMAIL },
  { name: "HubSpot", category: CATEGORIES.CRM },
  { name: "ManyChat", category: CATEGORIES.AUTOMATION },
  { name: "SiteGround", category: CATEGORIES.HOSTING },
  { name: "Bluehost", category: CATEGORIES.HOSTING },
  { name: "WordPress", category: CATEGORIES.CMS },
  { name: "Hostinger", category: CATEGORIES.HOSTING },
  { name: "Claude.ai", category: CATEGORIES.AI },
  { name: "V0.app", category: CATEGORIES.AI },
  { name: "lovable.dev", category: CATEGORIES.AI }
];


 export const TEAM_MEMBERS = [
  { 
    name: "Костянтин", 
    avatar: "../../../avatars/avatar-admin.png", 
    role: "Admin",
    bio: "Поєдную 20-річний досвід управління бізнесом із експертизою у Fullstack-розробці та AI. Допомагаю розібратися у світі сучасних технологій, де автоматизація та штучний інтелект стають фундаментом для успіху. У своїх статтях ділюся лише перевіреними рішеннями, інструментами та сервісами, які дійсно працюють, допомагаючи вам економити час та оптимізувати процеси без зайвих зусиль.",
    shortBio: "Fullstack-розробник та експерт з AI. 20 років досвіду в автоматизації бізнесу.",
    skills: ["Fullstack", "AI Strategy", "Business Automation"]
  },
  { 
    name: "Марина", 
    avatar: "../../../avatars/9610.jpg", 
    role: "Editor", 
    bio: "Допомагаю перетворювати хаос на якісний контент. Спеціалізуюсь на SEO-оптимізації та автоматизації редакційних процесів, щоб наші статті завжди досягали цілей.",
    shortBio: "Редактор та SEO-стратег. Автоматизую редакційні процеси для максимального охоплення.",
    skills: ["SEO", "Content Strategy", "Editing"]
  },
  { 
    name: "Ігор", 
    avatar: "../../../avatars/1081.jpg", 
    role: "Editor", 
    bio: "Вірю, що автоматизація — ключ до якості. Маю глибокий досвід у налаштуванні email-кампаній (Brevo) та CRM-маркетингу, оптимізую потоки для кращої конверсії.",
    shortBio: "Експерт з CRM-маркетингу та email-автоматизації. Працюю над підвищенням конверсії.",
    skills: ["CRM", "Email Marketing", "Conversion Rate"]
  },
  { 
    name: "Олексій", 
    role: "Tech Lead", 
    avatar: "../../../avatars/43574.jpg",
    bio: "Будую технічний фундамент наших проектів. Експерт з API-інтеграцій та автоматизації складних систем (Make/n8n), гарантую стабільність кожного нашого продукту.",
    shortBio: "Tech Lead. Експерт з API-інтеграцій, Make та n8n. Будую надійні автоматизовані системи.",
    skills: ["Make", "n8n", "API Integration", "Tech Lead"]
  }
];

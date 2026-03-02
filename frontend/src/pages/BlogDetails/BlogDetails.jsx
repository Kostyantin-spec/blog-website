
import React, { useEffect, useState, useContext } from "react";
import "./BlogDetails.css";
import { useParams, Link } from "react-router-dom";
import { fetchBlogBySlug } from "../../api/blogApi"; 
import { BlogContext } from "../../Components/BlogContext/BlogContext"; 
import ReactMarkdown from "react-markdown";
import ShareButtons from "../../Components/ShareButtons/ShareButtons";
import SidebarSocial from "../../Components/SidebarSocial/SidebarSocial";
import SidebarSearch from "../../Components/SidebarSearch/SidebarSearch";
import RelatedPosts from "../../Components/RelatedPosts/RelatedPosts";
import Skeleton from "../../Components/Skeleton/Skeleton";
import { Helmet } from 'react-helmet-async';
import { FaRegCalendarAlt, FaRegClock, FaRegEye, FaRegHeart, FaHeart } from "react-icons/fa";
import parse from 'html-react-parser';
import '../../Components/Typography/Typography.css'
import { FaHome } from 'react-icons/fa';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import SupportAndRating from "../../Components/SupportAndRating/SupportAndRating";
import FAQ from "../../Components/FAQ/FAQ";
import ReadingProgressBar from '../../Components/ReadingProgressBar/ReadingProgressBar';
import createUnifiedPayload from '../../../../backend/utils/createUnifiedPayload';
import {TEAM_MEMBERS} from '../../data';

// Функція для пошуку заголовків h2 у тексті
const getTableOfContents = (content) => {
  if (!content) return [];
  
  // Шукаємо і h2, і h3 (символ [23] означає "2 або 3")
  const regexp = /<h(2|3)[^>]*>(.*?)<\/h(2|3)>/gi;
  const matches = [...content.matchAll(regexp)];
  
  return matches.map((match, index) => ({
    level: match[1], // запам'ятовуємо, це h2 чи h3
    text: match[2].replace(/<[^>]*>/g, '').trim(),
    index: index
  }));
};


const BlogDetails = () => {
  const { slug } = useParams();
  const { blogs } = useContext(BlogContext); 

  // Ініціалізуємо стан значенням з об'єкта blog

   const [liked, setLiked] = useState(false);
   const [likesCount, setLikesCount] = useState(0);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [agreedComments, setAgreedComments] = useState(false);
  const [agreedCommunity, setAgreedCommunity] = useState(false);
  const navigate = useNavigate();
  const [showScrollButton, setShowScrollButton] = useState(false);
  // Ініціалізуємо стан значенням з об'єкта blog
  

  // соментарі
  const [commentStatus, setCommentStatus] = useState("idle"); // idle, sending, success, error
  const [commentData, setCommentData] = useState({ name: "", email: "", text: "" });
  
  // 1. Створюємо змінну з посиланням
  const currentUrl = window.location.href;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [approvedComments, setApprovedComments] = useState([]);

  useEffect(() => {
    const getBlogData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchBlogBySlug(slug);
        setBlog(data);

        setLikesCount(data.blogDetail?.likes || 0);

        if (localStorage.getItem(`liked_${data._id}`)) {
          setLiked(true);
        }


        setError(false);
      } catch (err) {
        console.error("Помилка завантаження статті:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getBlogData();
    }
    
  }, [slug]);

useEffect(() => {
  if (blog) {
    // Як тільки стаття завантажилася, беремо лайки з неї
    setLikesCount(blog.likes || 0);
    
    // Перевіряємо, чи ми вже лайкали її (зберігаємо в пам'яті браузера)
    const wasLiked = localStorage.getItem(`liked_${blog._id}`) === 'true';
    setLiked(wasLiked);
  }
}, [blog]); // Цей код спрацює автоматично, коли blog змінить значення з null на дані з бази

// Слідкуємо за скролом, щоб показати/сховати кнопку
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 400) { 
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
  

useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/comments/${slug}`);
      setApprovedComments(res.data);
    } catch (err) {
      
      console.error("Помилка завантаження коментарів:", err.message);
    }
  };

  if (slug) {
    fetchComments();
  }
}, [slug]);
  
  // SEO ЕФЕКТ
  useEffect(() => {
  if (!blog) return;

  // 1. Оновлюємо Title
  const prevTitle = document.title;
  document.title = `${blog.title} | MarketingKit`;

  // 2. Функція для керування мета-тегами
  const updateMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? "property" : "name";
    let el = document.querySelector(`meta[${attr}='${name}']`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content || "";
    return el;
  };

  // Підготовка значень
const desc = (blog.description || blog.blogDetail?.description || "Маркетинг блог про актуальні стратегії").slice(0, 160);
const image = blog.blog_image || "../../../MarketingKit__logo.png"; // Замініть на реальне посилання на лого

// Оновлення мета-тегів
updateMeta("description", desc);
updateMeta("og:title", blog.title, true);
updateMeta("og:description", desc, true);
updateMeta("og:image", image, true);

  // 3. Додаємо Schema.org
  let schemaScript = document.getElementById("blog-schema");
  if (!schemaScript) {
    schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "blog-schema";
    document.head.appendChild(schemaScript);
  }
  

  // --- ФУНКЦІЯ ОЧИЩЕННЯ (Cleanup) ---
  return () => {
    document.title = prevTitle;
  
    if (schemaScript) schemaScript.remove();
     
  };
}, [blog]);

  const latestPosts = blogs ? blogs.filter((b) => b.slug !== slug).slice(0, 5) : [];

 if (loading) {
    return (
      <div className="blog-details-container container">
        <div className="blog-main">
          <Skeleton type="details" />
        </div>
        <aside className="blog-sidebar">
          <Skeleton type="sidebar" />
        </aside>
      </div>
    );
  }
  if (error || !blog) return (
    <main className="blog_not_found">
      <h1>404 — Стаття не знайдена</h1>
      <Link to="/blog" className="back_btn">← До всіх статей</Link>
    </main>
  );

 // Очищення тексту від HTML-тегів для точного розрахунку часу
  const getReadingTime = (html) => {
    if (!html) return 0;
    const text = html.replace(/<[^>]*>?/gm, ''); // Видаляємо теги
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s+/).length;
    return Math.ceil(noOfWords / wordsPerMinute);
  };

  const transformContent = (htmlContent) => {
  if (!htmlContent) return '';

  // Створюємо віртуальний елемент для обробки тексту
  const div = document.createElement('div');
  div.innerHTML = htmlContent;

  // Знаходимо всі посилання в тексті
  const links = div.querySelectorAll('a');

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    
    // Якщо посилання веде на зовнішній ресурс (починається з http)
    if (href.startsWith('http')) {
      link.setAttribute('rel', 'sponsored nofollow'); // Додаємо атрибути реклами
      link.setAttribute('target', '_blank');         // Відкриваємо в новій вкладці
      
      // (Опціонально) Можна додати клас для стилю партнерської кнопки, 
      // якщо ти хочеш, щоб вони виглядали як кнопки
       link.classList.add('affiliate-link'); 
    }
  });

  return div.innerHTML;
};


  const handleCommentSubmit = async (e) => {
  e.preventDefault();
// Валідація перед відправкою
  if (!commentData.name.trim() || !commentData.email.trim() || !commentData.text.trim()) {
    toast.error("Будь ласка, заповніть всі обов'язкові поля: Ім'я, Email та Текст.");
    return;
  }


 if (!agreedComments) {
    toast.error("Будь ласка, підтвердіть згоду з політикою конфіденційності.");
    return;
  }

  setCommentStatus("sending");

  try {
    const response = await fetch("http://localhost:5000/api/send-to-make", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: commentData.name,
        email: commentData.email,
        text: commentData.text,
        source: "Article Comment",
        articleTitle: blog.title, // Беремо з об'єкта blog
        articleSlug: slug      // ОБО'ВЯЗКОВО ДОДАЙ ЦЕ!
      }),
    });

    if (response.ok) {
      setCommentStatus("success");
      toast.success("Дякуємо! Коментар з'явиться після модерації.");
      setCommentData({ name: "", email: "", text: "" });
      setTimeout(() => setCommentStatus("idle"), 3000);
    } else {
      setCommentStatus("error");
    }
  } catch (err) {
    setCommentStatus("error");
  }
};

const handleCommunitySubmit = async (e) => {
  e.preventDefault();
  if (!agreedCommunity) {
    alert("Потрібно погодитися з правилами.");
    return;
  }

  // 1. Формуємо blogData для уніфікатора
  const blogData = {
    authorEmail: email, // Функція перетворить це на "email" для Mongoose
    title: document.title,
    description: `Підписка на ком'юніті зі статті: ${document.title}`,
    slug: window.location.pathname.split('/').pop()
  };

  // 2. Використовуємо універсальний payload
  const payload = createUnifiedPayload("community_subscription", blogData, { siteName: "marketingkit.com" });

  try {
    // 3. Беремо URL динамічно
    const webhookUrl = localStorage.getItem("makeWebhookUrl") || "http://localhost:5000/api/send-to-make";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setIsSubscribed(true);
      navigate("/thank-you");
    } else {
      alert("Помилка при відправці.");
    }
  } catch (err) {
    console.error("Помилка мережі:", err);
  }
};

const handleLike = async () => {
  // Створюємо або беремо існуючий ID пристрою/користувача
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = Math.random().toString(36).substring(7);
    localStorage.setItem('deviceId', deviceId);
  }

  try {
    const { data } = await axios.post(`http://localhost:5000/api/blogs/${blog._id}/like`, {
      userId: deviceId // Передаємо цей ID
    });

    setLikesCount(data.likes);
    setLiked(data.isLiked); // Сервер сам каже, став лайк чи ні

    // ДОДАЙ ЦЕ: Запам'ятовуємо статус локально, щоб після оновлення сторінки серце не скидалося
    if (data.isLiked) {
      localStorage.setItem(`liked_${blog._id}`, 'true');
    } else {
      localStorage.removeItem(`liked_${blog._id}`);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleCpaClick = () => {
  ReactGA.event({
    category: "CPA",
    action: "Click",
    label: blog.cpaTitle
  });
};


// Функція для плавного переходу до заголовка
 const scrollToHeading = (index) => {
  // Шукаємо ВСІ h2 на сторінці
  const headings = document.querySelectorAll('h2');
  
  // Якщо такий заголовок існує — скролимо до нього
  if (headings[index]) {
    headings[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setTimeout(() => {
      window.scrollBy(0, -100); 
    }, 500);
  }
};

const toc = getTableOfContents(blog?.content);

const authorData = TEAM_MEMBERS.find(member => member.name === blog.author_name) || {
    shortBio: "Автор статті.",
    skills: []
  };

  return (
    <div className="blog_details_container container">
      <ReadingProgressBar />
      <div className="blog_details_main">
        <article className="blog_details_right">

         <Helmet>
        <title>{blog.title} | MARKETINGKIT</title>
        <meta name="description" content={blog.description} />
        
        {/* Open Graph для соцмереж (Facebook, Telegram) */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.blog_image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />

                 <script
                          type="application/ld+json"
                           dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                            "@context": "https://schema.org",
                             "@type": "BlogPosting",
                             "headline": blog.title,
                               "image": blog.blog_image,
                               "publisher": {
                               "@type": "Organization",
                                 "name": "MARKETINGKIT",
                                "logo": {
                                "@type": "ImageObject",
                                 "url": "../../../Marketingkit_bg.png"
                                 } },
                             "author": {
                              "@type": "Person",
                              "name": blog.author_name || "Костянтин"
                               },
                                   "datePublished": blog.createdAt,
                                     "description": blog.description
                               })
                               }}
                                />


      </Helmet>
           <nav className="breadcrumb">
             <Link to="/">
               <FaHome /> 
              </Link>
                <span className="separator">/</span>
                <Link to="/blog">Блог</Link>
                     <span className="separator">/</span>

                      <span className="current-category">{blog.category || 'Загальне'}</span>
                    </nav>
          <h1 className="blog_title">{blog.title}</h1>

            <div className="blog-meta">
  <div className="meta-left">
    <span className="category-badge">{blog.category}</span>
    <span className="meta-item">
      <FaRegCalendarAlt className="meta-icon" /> 
      {blog.createdAt ? (
        new Date(blog.createdAt).toLocaleDateString('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      ) : "Нещодавно"}
    </span>
    <span className="meta-item">
      <FaRegClock className="meta-icon" /> 
      {getReadingTime(blog.content)} хв читання
    </span>
  </div>

  

                        <div className="meta-right">
                        {/* Перегляди: заходимо в blogDetail */}
                           <span className="meta-item views">
                              <FaRegEye className="meta-icon" /> 
                                  {blog.blogDetail?.views || 0}
                            </span>
  
                               {/* Лайки: беремо прямо з blog.likes або зі стейту likesCount */}
                             <span 
                                   className={`meta-item likes-button ${liked ? 'active' : ''}`} 
                                   onClick={handleLike}
                               >
                                  {liked ? (
                               <FaHeart className="meta-icon animated" style={{ color: '#ff4b2b' }} />
                               ) : (
                               <FaRegHeart className="meta-icon" />
                                  )}
                                      {/* Використовуй likesCount, який ми ініціалізували з blog.likes */}
                                <span className="likes-count">{likesCount}</span>
                                </span>
                         </div>
                                </div>

                 <div className="author_date">
            <div className="author">
              <img 
                src={blog.author_image || `https://ui-avatars.com/api/?name=${blog.author_name || "Admin"}`} 
                alt="Avatar" 
                className="avatar-class"
              />
              <div className="author-info-text">
              <p className="author-name">Автор: <strong>{blog.author_name || "Адмін"}</strong></p>
              </div>
            </div>
          </div>


           <img className="blog_image"
                 src={blog.blog_image || "https://via.placeholder.com/800x400?text=No+Image"} 
                 alt={blog.title} 
                 onError={(e) => { e.target.src = "https://via.placeholder.com/800x400?text=Error+Loading"; }}
            />


  {toc.length > 0 && (
  <div className="toc-glass-card" >
    <h3 className="toc-title">
      <span className="toc-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  </span>
      Зміст:
    </h3>
    <div className="toc-list" >
      {toc.map((item, index) => (
        <div
          key={index}
          onClick={() => scrollToHeading(index)}
         className="toc-item"
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {index + 1}. {item.text}
        </div>
      ))}
    </div>

  </div>
)}

          {/* Виводимо опис */}
          <div className="blog_intro_text">
            <div className="icon-wrapper">
                <svg 
                   width="24" 
                   height="24" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                    stroke="#2563eb" 
                   stroke-width="2" 
                   stroke-linecap="round" 
                   stroke-linejoin="round"
               >
                 <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
                  <path d="M12 19v3" />
                     <path d="M8 22h8" />
                 </svg>
            </div>
                  {blog.description}
             </div>
{/* =========================================================== */}
          
         

             <div className="blog-content-view ql-snow blog-content glass-text">
                    <div 
                         className="ql-editor" 
                            dangerouslySetInnerHTML={{ 
                           __html: transformContent(blog.content) 
                        }} 
                              />
                     </div>
                

             {blog.code_snippet && (
                  <div className="dynamic-injected-component" style={{ marginTop: '30px' }}>
                  
                     <div dangerouslySetInnerHTML={{ __html: blog.code_snippet }} />
                  </div>
             )}

              
                   <FAQ faqs={blog.faqs} />
            
             
{/* ================================================ */}

       {/* --- РОЗУМНИЙ БЛОК (CPA) --- */}
{blog.cpaLink && (
  <div className="native-cpa-container">
    <div className="native-cpa-badge">Мій вибір</div>
    <div className="native-cpa-content">
      
      <div className="native-cpa-icon">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
    <line x1="9" y1="18" x2="15" y2="18"></line>
    <line x1="10" y1="22" x2="14" y2="22"></line>
  </svg>
</div>
      <div className="native-cpa-info">
        <h4>{blog.cpaTitle}</h4>
        <p>{blog.cpaText}</p>
      </div>
      <a onClick={handleCpaClick}
        href={blog.cpaLink} 
        target="_blank" 
        rel="sponsored nofollow noopener"
        className="native-cpa-button"
      >
        Перейти
      </a>
    </div>
  </div>
)}


    {/* =============== */}
 <div className="affiliate-disclosure">
  <div className="disclosure-header">
    <div className="native-cpa-icon-small">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </div>
    <span>Розкриття інформації</span>
  </div>
  <p>
   Наші оцінки базуються на незалежних дослідженнях. Ми враховуємо відгуки користувачів
    та комерційні угоди з партнерами. Ця сторінка містить партнерські посилання, що 
   дозволяє нам підтримувати проект, не створюючи додаткових витрат для вас.
  </p>
</div>

          <section className="author-bio-card">
  <div className="author-card-main">
    {/* <img 
      src={blog.author_image || `https://ui-avatars.com/api/?name=${blog.author_name}`} 
      alt={blog.author_name} 
      className="author-main-avatar" 
    /> */}

     <img 
      src={authorData.avatar || `https://ui-avatars.com/api/?name=${authorData.name}`} 
      alt={authorData.name} 
      className="author-main-avatar" 
    />

    <div className="author-bio-text">
      {/* <span className="author-label">Автор статті</span>
      <h4>{blog.author_name || "Костянтин"}</h4>
      <p className="author-description">
         {blog.author_bio || "Експерт з автоматизації та бізнес-стратегій."}
      </p> */}

      <span className="author-label">{authorData.role || "Автор статті"}</span>
      <h4>{authorData.name}</h4>
      
      {/* Виводимо повну біографію */}
      <p className="author-description">
        {authorData.bio}
      </p>
      
      
      {/* <div className="skills-tags">
             {authorData.skills.map(s => <span className="skill-tag">{s}</span>)}
       </div> */}
           <div className="skills-container">
       <div className="skills-tags">
        {authorData.skills?.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
      </div>

      <div className="author-trust-shield">
        <span className="shield-icon">🛡️</span>
        <p className="shield-text">
          <strong>Принцип автора:</strong> Рекомендую лише ті сервіси та інструменти, які протестували особисто або впровадили у реальні бізнес-процеси.
        </p>
      </div>
      
      <div className="author-footer">
        <div className="author-social-links">
          <a href="https://t.me/your_channel" target="_blank" rel="noreferrer" className="social-btn telegram">
            Telegram
          </a>
          <a href="https://linkedin.com/in/your_profile" target="_blank" rel="noreferrer" className="social-btn linkedin">
            LinkedIn
          </a>
        </div>
        <button className="subscribe-btn-main" onClick={() => setIsModalOpen(true)}>
  Підписатися
</button>
      </div>
    </div>
  </div>
</section>
            <SupportAndRating postId={blog._id} />
              
                   {/* Кнопки "Поділитися" ПІД статтею */}
                <ShareButtons url={currentUrl} title={blog.title} />

                 {/* Новий блок */}
                 <RelatedPosts category={blog.category} currentId={blog._id} />

                <div className="back-to-category-container">
                     <span className="back-label">Більше статей у категорії:</span>
                    <a href={`/category/${blog.category}`} className="category-badge-link">
                      {blog.category}
                        <span className="arrow">→</span>
                    </a>
                </div>
              
      {/* ================= ВСТАВКА: ВИВІД КОМЕНТАРІВ ================= */}
                    <section className="approved-comments-section">
                       <h3 className="comments-display-title">
                            Обговорення ({approvedComments.length})
                       </h3>
  
  <div className="comments-list-wrapper">
    {approvedComments.length > 0 ? (
      approvedComments.map((c) => (
        <div key={c._id} className="comment-item-glass">
          <div className="comment-user-header">
            <img 
              src={`https://ui-avatars.com/api/?name=${c.name}&background=764ba2&color=fff`} 
              alt="avatar" 
            />
            <div className="comment-user-info">
              <span className="commenter-name">{c.name}</span>
              <span className="commenter-date">
                {new Date(c.createdAt).toLocaleDateString('uk-UA')}
              </span>
            </div>
          </div>
          <p className="comment-content-text">{c.text}</p>
        </div>
      ))
    ) : (
      <p className="no-comments-msg">Ще немає коментарів. Станьте першим!</p>
    )}
  </div>
</section>
{/* =========================================================== */}

           <section className="comment-section">
  <h2 className="comment-title">Залишити коментар</h2>
  
  <form className="comment-form" onSubmit={handleCommentSubmit}>
    <div className="input-group">
      <input 
        type="text" 
        placeholder="Ваше ім'я" 
        required 
        value={commentData.name}
        onChange={(e) => setCommentData({...commentData, name: e.target.value})}
      />
      <input 
        type="email" 
        placeholder="Email" 
        required 
        value={commentData.email}
        onChange={(e) => setCommentData({...commentData, email: e.target.value})}
      />
    </div>
    <textarea 
      placeholder="Напишіть свій коментар..." 
      required
      value={commentData.text}
      onChange={(e) => setCommentData({...commentData, text: e.target.value})}
    ></textarea>

     <div className="legal-checkbox-group">
  <input 
    type="checkbox" 
    id="agree-comments" 
    checked={agreedComments} 
    onChange={(e) => setAgreedComments(e.target.checked)} 
  />
  <label htmlFor="agree-comments">
    Я згоден з <Link to="/privacy-policy" target="_blank">політикою конфіденційності</Link>
  </label>
</div>
    
    <button 
      type="submit" 
      className={`submit-comment-btn ${commentStatus}`}
      disabled={commentStatus === "sending"}
    >
      {commentStatus === "sending" ? "Відправка..." : 
       commentStatus === "success" ? "Відправлено! ✓" : 
       "Відправити коментар"}
    </button>
    
    {commentStatus === "error" && (
      <p className="error-msg">Упс! Щось пішло не так. Спробуйте ще раз.</p>
    )}
  </form>
</section>

            </article>

        <aside className="blog_details_left">
          <div className="sidebar_sticky">
            <SidebarSearch /> {/* Пошук завжди краще ставити зверху */}
             <SidebarSocial />
            <h2>ОСТАННІ ПУБЛІКАЦІЇ</h2>
            <div className="popular_posts_list">
              {latestPosts.map((b) => (
                <div className="popular_post" key={b.slug}>
                  <Link to={`/blog/${b.slug}`} className="post_link">
                    <img src={b.blog_image} alt={b.title} />
                    <div className="post_info">
                      <h3>{b.title}</h3>
                      <p>{new Date(b.createdAt).toLocaleDateString('uk-UA')}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
           {/* МОДАЛКА - ТІЛЬКИ ОДИН РАЗ ТА ПРАВИЛЬНО ЗАКРИТА */}
    {isModalOpen && (
      <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal-content community-glass" onClick={(e) => e.stopPropagation()}>
          <div className="glow-bg"></div>
          <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
          {!isSubscribed ? (
            <div className="modal-inner-community">
              <div className="community-icon">
                <div className="community-icon">
                   {/* <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                   <polyline points="22,6 12,13 2,6"></polyline>
                   </svg> */}

                   <div className="community-icon">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
</div>

                
                </div>
              </div>
              <h3>Приєднуйся до ком'юніті!</h3>
              <form onSubmit={handleCommunitySubmit} className="community-form">
                <input type="email" placeholder="Твій Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="community-input" />
                <div className="legal-checkbox-group-modal">
                  <input type="checkbox" id="agree-community" checked={agreedCommunity} onChange={(e) => setAgreedCommunity(e.target.checked)} />
                  <label htmlFor="agree-community">Згоден з правилами</label>
                </div>
                <button type="submit" className="subscribe-confirm-btn">Підписатися</button>
              </form>
            </div>
          ) : (
            <div className="success-message-community">
              <div className="check-ring">✓</div>
              <h3>Дякую! Ви підписалися.</h3>
            </div>
          )}
        </div>
      </div>
    )}

    {/* КНОПКА ВГОРУ */}
    {showScrollButton && (
      <button onClick={scrollToTop} className="scroll-to-top-glass">↑</button>
    )}
  </div>
);

  
};

export default BlogDetails;




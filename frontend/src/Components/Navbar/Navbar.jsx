import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"; 
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import "./Navbar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";


const Navbar = ({ onOpenModal }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  
useEffect(() => {
    setIsMobile(false);
    setIsDropdownOpen(false);
  }, [location]);
  // Блокування прокрутки при відкритому меню
  useEffect(() => {
    document.body.style.overflow = isMobile ? "hidden" : "auto";
  }, [isMobile]);

  const toggleDropdown = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="nav_logo">
        <Link to="/" onClick={() => setIsMobile(false)}>
          <h2>
            <img src="../../../Marketingkit_bg.png" alt="logo" className="logo_img" />
            MARKETINGKIT
          </h2>
        </Link>
      </div>

      {/* Меню */}
      <div className={isMobile ? "navbar_menu open" : "navbar_menu"}>
        <ul onClick={() => setIsMobile(false)}>
          <li>
            <NavLink to="/blog">Блог</NavLink>
          </li>
          <li>
            <NavLink to="/about">Про Нас</NavLink>
          </li>

          {/* Дропдаун ТОП Інструменти */}
          <li className={`navbar-item dropdown ${isDropdownOpen ? "active" : ""}`}>
  <button className="navbar-gold-link dropdown-toggle navbar-gold-trigger">
    <span className="emoji-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </span> 
    Топ Інструменти <span className="arrow">▾</span>
  </button>
  
  <ul className="dropdown-menu">
     {/*1. Конструктори сайтів */}
<li>
  <NavLink 
    className={({ isActive }) => isActive ? "navbar-item active-neon" : "navbar-item"} 
    to="/builders" 
    onClick={() => setIsMobile(false)}
  >
   
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{marginRight: '10px'}}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
    Конструктори сайтів
  </NavLink>
</li>

   

    {/* 2. Маркетинг */}
    <li >
      <NavLink className={({ isActive }) => isActive ? "navbar-item active-neon" : "navbar-item"} to="/top-tools" onClick={() => setIsMobile(false)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
        </svg>
        Маркетингові сервіси
      </NavLink>
    </li>


     {/* 3. Хостинги */}
    <li >
      <NavLink className={({ isActive }) => isActive ? "navbar-item active-neon" : "navbar-item"} to="/top-tools-hosting" onClick={() => setIsMobile(false)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}>
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        Хостинги
      </NavLink>
    </li>

    {/* 4. CRM СИСТЕМИ (ТЕПЕР ТУТ) */}
    <li >
      <NavLink className={({ isActive }) => isActive ? "navbar-item active-neon" : "navbar-item"} to="/crm" onClick={() => setIsMobile(false)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        CRM системи
      </NavLink>
    </li>

    {/* 5. Конструктори сайтів */}
    <li >
      <NavLink className={({ isActive }) => isActive ? "navbar-item active-neon " : "navbar-item"} to="/top-tools-builders" onClick={() => setIsMobile(false)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}>
          <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
        </svg>
        Конструктори сайтів
      </NavLink>
    </li>
    <li >
  <NavLink className={({ isActive }) => isActive ? "navbar-item active-neon " : "navbar-item"} to="/marketing" onClick={() => setIsMobile(false)}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}>
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    TOP-50 Маркетинг
  </NavLink>
</li>
  </ul>
</li>

          <li>
            <NavLink to="/contact">Контакти</NavLink>
          </li>
          <li>
            <NavLink to="/advert">Реклама</NavLink>
          </li>

          <li className="navbar-btn-container"> {/* Огорнув кнопку в li для валідності списку */}
            <button className="navbar-top10-btn" onClick={onOpenModal}>
              <div className="btn-content">
                <HiOutlineSparkles className="spark-icon" />
                <span>ТОП-10 сервісів</span>
              </div>
              <div className="btn-badge">NEW</div>
            </button>
          </li>
        </ul>
      </div>

      <div className="navbar_actions">
        <ThemeToggle />
        <Link to="/admin/dashboard" className="admin_icon_link" title="Панель адміністратора">
          <FaUserShield />
        </Link>
        <button className="mobile_toggle" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  </nav>
);
};

export default Navbar;
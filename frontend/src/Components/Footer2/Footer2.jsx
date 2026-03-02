import React from "react";
import "./Footer2.css";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { blog_categories } from '../../data';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        {/* Колонка 1: Лого та опис */}
        <div className="footer_about">
          <div className="footer_logo">
            {/* Шлях до фото з public зазвичай пишеться від / */}
            <img src="../../../Marketingkit_bg.png" alt="logo" className="footer_logo-img" />
            <span>MARKETINGKIT</span>
          </div>
          <p>
            Ваш провідник у світі цифрового маркетингу. Тільки актуальні кейси
            та стратегії зростання.
          </p>
          <div className="footer_socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>

        {/* Колонка 2: Навігація */}
        <div className="footer_links">
          <h3>Навігація</h3>
          <ul>
            <li><NavLink to="/" end>Головна</NavLink></li>
            <li><NavLink to="/blog">Блог</NavLink></li>
            <li><NavLink to="/about">Про Нас</NavLink></li>
            <li><NavLink to="/contact">Контакти</NavLink></li>
            <li><NavLink to="/advert">Реклама</NavLink></li>
            <li><NavLink to="/privacy-policy">Політика конфіденційності</NavLink></li>
            <li><NavLink to="/terms">Правила користування</NavLink></li>
          </ul>
        </div>

        {/* Колонка 3: Категорії */}
       <div className="footer_links">
  <h3>Категорії</h3>
  <ul>
    {blog_categories.map((category) => (
      <li key={category}>
        <Link to={`/blog?category=${encodeURIComponent(category)}`}>
          {category}
        </Link>
      </li>
    ))}
  </ul>
</div>
      </div>

      <div className="footer_bottom">
        <p>&copy; {new Date().getFullYear()} MARKETINGKIT. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTelegram, 
  FaYoutube, 
  FaLinkedin 
} from "react-icons/fa6";
import "./SidebarSocial.css";

const SidebarSocial = () => {
  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook />, link: "https://facebook.com/yourpage", color: "#1877F2", count: "5K+" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com/yourpage", color: "#E4405F", count: "12K+" },
    { name: "Telegram", icon: <FaTelegram />, link: "https://t.me/yourchannel", color: "#26A5E4", count: "3K+" },
    { name: "YouTube", icon: <FaYoutube />, link: "https://youtube.com/yourchannel", color: "#FF0000", count: "8K+" },
  ];

  return (
    <div className="sidebar-widget">
      <h3 className="widget-title">Ми в соцмережах</h3>
      <div className="sidebar-social-list">
        {socialLinks.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            className="sidebar-social-item"
            target="_blank"
            rel="noopener noreferrer"
            style={{ "--brand-color": item.color }}
          >
            <span className="social-icon">{item.icon}</span>
            <span className="social-name">{item.name}</span>
            <span className="social-count">{item.count}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidebarSocial;
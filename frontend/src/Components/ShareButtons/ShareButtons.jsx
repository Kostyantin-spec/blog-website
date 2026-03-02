import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaTelegramPlane, 
  FaWhatsapp 
} from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import "./ShareButtons.css";

const ShareButtons = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    {
      icon: <FaFacebookF />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2",
      name: "Facebook"
    },
    {
      icon: <FaTwitter />,
      link: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#1DA1F2",
      name: "Twitter"
    },
    {
      icon: <FaLinkedinIn />,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
      color: "#0A66C2",
      name: "LinkedIn"
    },
    {
      icon: <FaTelegramPlane />,
      link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#0088CC",
      name: "Telegram"
    },
    {
      icon: <FaWhatsapp />,
      link: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366",
      name: "WhatsApp"
    }
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Посилання скопійовано!");
  };

  return (
    <div className="share-section">
      <p className="share-title">Поділитися статтею:</p>
      <div className="share-list">
        {shareOptions.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="share-icon-btn"
            style={{ "--brand-color": item.color }}
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
        <button className="share-icon-btn copy-btn" onClick={copyLink} title="Копіювати">
          <IoMdCopy />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
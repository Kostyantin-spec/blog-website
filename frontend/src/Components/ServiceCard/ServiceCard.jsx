import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ logo, title, description, features, link }) => {
  return (
    <div className="service-card">
      <div className="card-badge">Рекомендовано</div>
      
      <div className="card-header">
        <img src={logo} alt={title} className="service-logo" />
        <div className="title-area">
          <h3>{title}</h3>
          <div className="rating">⭐⭐⭐⭐⭐ <span>(5.0)</span></div>
        </div>
      </div>

      <p className="service-description">{description}</p>

      <ul className="service-features">
        {features.map((feature, index) => (
          <li key={index}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <a href={link} target="_blank" rel="noopener noreferrer" className="card-btn">
        Спробувати безкоштовно
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  );
};

export default ServiceCard;
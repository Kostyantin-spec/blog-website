import React from 'react';
import './TestModal.css';

const TestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay_testmodal" onClick={onClose}>
      <div className="modal-content_testmodal" onClick={(e) => e.stopPropagation()}>
         <div className="modal-grid-bg"></div>
            <div className="modal-glow-center"></div>

        <button className="close-btn_testmodal" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="modal-header_testmodal">
          <div className="header-icon_testmodal">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          </div>
          <h2>Як ми тестуємо</h2>
          <p>Наші принципи відбору інструментів для вашого бізнесу</p>
        </div>
        
        <div className="features-list_testmodal">
          <div className="feature-item_testmodal">
            <div className="icon-wrapper_testmodal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div className="feature-text_testmodal">
              <h4>Глибокий аналіз</h4>
              <p>Ми реєструємось у кожному сервісі та проходимо шлях клієнта від А до Я.</p>
            </div>
          </div>
          
          <div className="feature-item_testmodal">
            <div className="icon-wrapper_testmodal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div className="feature-text_testmodal">
              <h4>Чесні огляди</h4>
              <p>Відкрито говоримо про приховані платежі та технічні обмеження платформ.</p>
            </div>
          </div>
          
          <div className="feature-item_testmodal">
            <div className="icon-wrapper_testmodal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <div className="feature-text_testmodal">
              <h4>Практичне впровадження</h4>
              <p>Тестуємо інтеграції через Make.com та API, щоб переконатись у стабільності.</p>
            </div>
          </div>
        </div>

        <button className="modal-cta_testmodal" onClick={onClose}>Зрозуміло, до справ!</button>
      </div>
    </div>
  );
};

export default TestModal;
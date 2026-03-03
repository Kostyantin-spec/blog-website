
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Subscribe.css";
import API from '../../api/blogApi.js';


const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Будь ласка, погодьтеся з політикою конфіденційності.");
      return;
    }

    setLoading(true);

    try {
  // 1. Використовуємо наш API клієнт (він сам знає адресу Render)
  // Відправляємо дані на універсальний роут форм
  const response = await API.post("/forms/universal", {
    email: email,
    name: "Підписник", 
    source: "newsletter_footer", 
    text: "Підписка на розсилку маркетингових кейсів"
  });

  // 2. Axios вважає успішним статус 2xx
  if (response.status === 200 || response.status === 201) {
    console.log("Успішно! Готуємо редірект...");
    setEmail("");
    setAgreed(false);
        
        // Додаємо невелику затримку, щоб стан встиг оновитися
        setTimeout(() => {
            navigate("/thank-you");
        }, 100); 
    } else {
        const errorData = await response.json();
        console.error("Помилка від сервера:", errorData);
        setStatus("Упс, сталася помилка. Спробуйте пізніше.");
    }
    } catch (err) {
      console.error("Помилка підписки:", err);
      setStatus("Сервер не відповідає. Спробуйте пізніше.");
    } finally {
      setLoading(false);
      // Очищення статусу помилки через 5 сек
      if (status) setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section className="subscribe">
      <div className="left">
        <h2>Підпишіться на розсилку</h2>
        <p>Отримуйте найкращі маркетингові кейси щотижня.</p>
      </div>
      <div className="right">
        <form onSubmit={handleSubscribe}>
          <div className="input-row">
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={loading ? "loading" : ""}
            >
              {loading ? <span className="spinner"></span> : "Підписатися"}
            </button>
          </div>

          <div className="subscribe-agreement">
            <input 
              type="checkbox" 
              id="sub-agree" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)} 
            />
            <label htmlFor="sub-agree">
              Згоден з <Link to="/privacy-policy">політикою конфіденційності</Link>
            </label>
          </div>
        </form>
        {status && <p className="status-msg">{status}</p>}
      </div>
    </section>
  );
};

export default Subscribe;
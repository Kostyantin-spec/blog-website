import { useState } from 'react';

export const useSubscribe = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email, source) => {
    const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbzo8yMwxGWmOFSd6AzjPG2b3Q7OeQquhTiCPHMXrLGhMtBnpBsm59Oob7-QhyrsUpi4BA/exec";
    
    setLoading(true); // 1. Включаємо індикатор завантаження

    try {
      // Використовуємо fetch для відправки даних у Google Таблицю
      await fetch(GOOGLE_URL, {
        method: "POST",
        mode: "no-cors", // Google Scripts потребує no-cors для швидкої відправки
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      // Оскільки mode: "no-cors", ми не отримаємо JSON-відповідь, 
      // тому просто вважаємо, що якщо не вилетіла помилка — все добре.
      setSuccess(true); // 2. Активуємо стан успіху
      return true; 
    } catch (error) {
      console.error("Помилка підписки:", error);
      return false;
    } finally {
      setLoading(false); // 3. Вимикаємо завантаження в будь-якому випадку
    }
  };

  return { subscribe, loading, success, setSuccess };
};
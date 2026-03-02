
import React from "react";
import "./Topic.css";
import { blog_topic } from "../../data";

const Topic = ({ category, setCategory }) => {
  return (
    <section className="topic">
      <h2 className="topic_title">Популярні теми</h2>
      <div className="search_container">
  
</div>

      <div className="topic_list">
  {blog_topic.map((item, index) => {
    // Нормалізуємо для логіки порівняння
    const currentItem = item.blog_title.trim().toLowerCase();
    const currentCategory = category ? category.trim().toLowerCase() : "all";

    return (
      <div
        key={index}
        onClick={() => {
          // Якщо клікаємо на вже обрану — скидаємо в "All"
          setCategory(
            currentCategory === currentItem ? "All" : item.blog_title
          );
        }}
        // Перевіряємо активність через нормалізовані рядки
        className={`topic_list_item ${
          currentCategory === currentItem ? "active" : ""
        }`}
      >
        <span>{item.blog_title}</span>
      </div>
    );
  })}
</div>
    </section>
  );
};

export default Topic;

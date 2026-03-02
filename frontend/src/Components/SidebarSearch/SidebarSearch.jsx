import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import { FaSearch } from "react-icons/fa";
import "./SidebarSearch.css";

const SidebarSearch = () => {
  const [searchParams] = useSearchParams();
  // Ініціалізуємо запит значенням з URL, або порожнім рядком
  const [query, setQuery] = useState(searchParams.get('q') || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
  e.preventDefault();
  if (query.trim()) {
    // Переконайся, що тут шлях відповідає тому, що в тебе в Routes (наприклад, /search)
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }
};

  return (
    <div className="sidebar-widget search-widget">
      <h3 className="widget-title">Пошук по блогу</h3>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Шукати статті..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-submit-btn">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SidebarSearch;
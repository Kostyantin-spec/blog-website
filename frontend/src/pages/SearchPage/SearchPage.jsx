import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import API from '../../api/blogApi.js';
import Skeleton from "../../Components/Skeleton/Skeleton"; 
import "./SearchPage.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await API.get(`/blogs/search?q=${encodeURIComponent(query)}`);
        setResults(res.data);
      } catch (err) {
        console.error("Помилка пошуку", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="archive-container">

            <Helmet>
              <title>Пошук: {query} | MARKETINGKIT</title>
              <meta name="description" content={`Результати пошуку для запиту: ${query}`} />
              <meta name="robots" content="noindex, follow" /> 
            </Helmet>


      <div className="archive-header">
        <h1>Результати пошуку: <span>"{query}"</span></h1>
        <p className="results-count">Знайдено статей: {results.length}</p>
      </div>
      
      <div className="blog-grid">
        {loading ? (
          // Використовуємо твій компонент Skeleton для ефекту "живого" завантаження
          Array(6).fill(0).map((_, i) => <Skeleton key={i} />)
        ) : results.length > 0 ? (
          results.map((blog) => (
            <Link to={`/blog/${blog.slug}`} key={blog._id} className="blog-link">
              <div className="blog-card">
                <img src={blog.blog_image} alt={blog.title} loading="lazy" />
                <div className="blog-card-content">
                  <h3>{blog.title}</h3>
                  <p>{blog.description?.substring(0, 120)}...</p>
                  <span className="read-more">Читати далі</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results-message">
            <h3>Нічого не знайдено</h3>
            <p>Спробуйте інший запит або поверніться на <Link to="/blog">головну блогу</Link>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
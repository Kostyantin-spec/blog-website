import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/blogApi.js';
import './RelatedPosts.css';

const RelatedPosts = ({ category, currentId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await API.get(`/blogs/related?category=${category}&currentId=${currentId}`);
        setRelated(res.data);
      } catch (err) {
  // Виведемо саме ТЕКСТ помилки від сервера
  console.log("Текст помилки від сервера:", err.response?.data); 
  console.error("Помилка схожих статей", err);
}
    };
    if (category) fetchRelated();
  }, [category, currentId]);

  if (related.length === 0) return null;

  return (
    <div className="related-section">
      <h3>Схожі статті</h3>
      <div className="related-grid">
        {related.map(post => (
          <Link to={`/blog/${post.slug}`} key={post._id} className="related-card">
           
            <div className="related-post-image-container">
              {post.blog_image && post.blog_image !== "" ? (
               <img src={post.blog_image} alt={post.title} />
                 ) : (
                <div className="image-placeholder">
                     <span>{post.title.charAt(0)}</span> 
           </div>
            )}
          </div>
            <h4>{post.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; 
import { BlogContext } from '../../Components/BlogContext/BlogContext';
import Blog from '../../Components/Blog/Blog'; 
import './BlogPage.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Pagination from '../../Components/Pagination/Pagination'
import Skeleton from '../../Components/Skeleton/Skeleton';

const BlogPage = () => {
  const { blogs, loading } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

 
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredBlogs = blogs.filter(blog => 
  blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="archive-container">
      {/* --- SEO БЛОК --- */}
      <Helmet>
        <title>Блог | Всі публікації про автоматизацію</title>
        <meta name="description" content="Читайте останні новини та гайди з автоматизації, Make.com та розробки на нашому блозі." />
        <link rel="canonical" href="https://yourdomain.com/blog" />
        
        {/* Open Graph (Facebook, LinkedIn, Telegram) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Блог | Світ автоматизації" />
        <meta property="og:description" content="Архів усіх корисних статей в одному місці." />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/blog" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Блог | Світ автоматизації" />
        <meta name="twitter:description" content="Читайте наші останні статті." />
      </Helmet>

      <div className="archive-header">
        <nav className="breadcrumb">
          <Link to="/" className="home-link"><FaHome /></Link>
          <span className="separator">/</span>
          <span className="current-page">Блог</span>
        </nav>
        <h1>Всі публікації</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Пошук статей..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="blog-grid">
        {loading ? (
          Array(postsPerPage).fill(0).map((_, index) => <Skeleton key={index} />)
        ) : currentPosts.length > 0 ? (
          currentPosts.map(blog => (
            <Link to={`/blog/${blog.slug}`} key={blog._id || blog.slug} className="blog-link">
              <Blog blog={blog} />
            </Link>
          ))
        ) : (
          <p className="no-results">Нічого не знайдено за запитом "{searchTerm}"</p>
        )}
      </div>

      {!loading && filteredBlogs.length > postsPerPage && (
        <Pagination 
          postsPerPage={postsPerPage} 
          totalPosts={filteredBlogs.length} 
          paginate={paginate} 
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default BlogPage;
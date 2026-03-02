import React, { useContext, useEffect } from "react";
import { BlogContext } from "../BlogContext/BlogContext";
import { Link, useSearchParams } from "react-router-dom";
import Blog from "../Blog/Blog";
import "./BlogList.css";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "../../Components/Skeleton/Skeleton";

const POSTS_PER_PAGE = 6;

const BlogList = ({ category }) => {
  const { blogs, loading, error } = useContext(BlogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = category || "All";

  
  const filteredBlogs = blogs ? blogs.filter(
    (blog) => currentCategory === "All" || blog.category === currentCategory
  ) : [];

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  
  
  const urlPage = parseInt(searchParams.get("page")) || 
                  parseInt(localStorage.getItem(`blog_page_${currentCategory}`)) || 1;

  
  const safePage = urlPage > totalPages && totalPages > 0 ? 1 : urlPage;

  
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  
  const finalSidebarPosts = blogs ? blogs
    .filter((b) => !paginatedBlogs.some(p => p.slug === b.slug))
    .slice(0, 5) : [];
  
  useEffect(() => {
    if (!loading && blogs?.length > 0) {
      setSearchParams({ page: safePage }, { replace: true });
      localStorage.setItem(`blog_page_${currentCategory}`, safePage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.title = `Блог — ${currentCategory} | Сторінка ${safePage}`;
    }
  }, [safePage, currentCategory, loading, blogs?.length, setSearchParams]);

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  //
  if (loading) {
    return (
      <div className="blog-list-container container">
        <div className="skeleton-grid">
          {[...Array(POSTS_PER_PAGE)].map((_, i) => <Skeleton key={i} type="card" />)}
        </div>
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="blog-list-wrapper">
      <header className="blog-header">
        <p className="blog-intro">
          Ми аналізуємо популярні маркетингові сервіси та допомагаємо обрати найкращі рішення для бізнесу.
        </p>
      </header>

      <div className="blog-main-layout">
        {/* ЛІВА ЧАСТИНА: СІТКА */}
        <main className="blog-list-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCategory}-${safePage}`}
              className="blog_grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {paginatedBlogs.length === 0 ? (
                <p className="no-blogs">Немає статей у цій категорії.</p>
              ) : (
                paginatedBlogs.map((blog) => (
                  <motion.div variants={cardVariants} key={blog.slug} whileHover={{ y: -5 }}>
                    <Link to={`/blog/${blog.slug}`} className="blog-link">
                      <Blog blog={blog} />
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* ПАГІНАЦІЯ */}
          {totalPages > 1 && (
            <nav className="pagination">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                disabled={safePage === 1}
                className="page-btn nav-btn" 
                onClick={() => setSearchParams({ page: safePage - 1 })}
              >
                ← 
              </motion.button>
              
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    animate={{ scale: page === safePage ? 1.1 : 1 }}
                    className={`page-btn ${page === safePage ? "active" : ""}`}
                    onClick={() => setSearchParams({ page: page })}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                disabled={safePage === totalPages}
                className="page-btn nav-btn" 
                onClick={() => setSearchParams({ page: safePage + 1 })}
              >
                 →
              </motion.button>
            </nav>
          )}
        </main>

        {/* ПРАВА ЧАСТИНА: САЙДБАР */}
        <aside className="blog_sidebar">
          <div className="sidebar_sticky">
            <h2 className="sidebar-title">ОСТАННІ ПУБЛІКАЦІЇ</h2>
            <div className="popular_posts_list">
              {finalSidebarPosts.map((b) => (
                <div className="popular_post" key={b.slug}>
                  <Link to={`/blog/${b.slug}`} className="post_link">
                    {b.blog_image ? <img src={b.blog_image} alt={b.title} /> : <div className="no_image">No Photo</div>}
                    <div className="post_info">
                      <h3>{b.title}</h3>
                      <p>{b.createdAt ? new Date(b.createdAt).toLocaleDateString('uk-UA') : "Нещодавно"}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogList;
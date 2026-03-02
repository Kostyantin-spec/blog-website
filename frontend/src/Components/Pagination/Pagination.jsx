 import React from "react";
 
 const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => paginate(number)}
          className={currentPage === number ? 'page-btn active' : 'page-btn'}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
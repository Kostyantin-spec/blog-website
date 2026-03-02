
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Blog.css";

const Blog = ({ blog }) => {
  
  const { blog_image, title, category, createdAt, blogDetail, content } = blog;


  const wordsPerMinute = 200;
  const textLength = content ? content.split(" ").length : 0;
  const readTime = Math.ceil(textLength / wordsPerMinute) || 1;

  return (
    <article className="item">
      <div className="img_container">
        <img 
          src={blog_image || "https://placehold.co/400x250?text=No+Image"} 
          alt={title} 
          onError={(e) => { e.target.src = "https://placehold.co/400x250?text=Image+Error"; }}
        />
        <span className="category_badge"># {category}</span>
      </div>
      
      <div className="info">
        <div className="detail">
          <p>
            <CiClock2 className="icon" /> {readTime} хв читання
          </p>
          <p>
           
            <FaEye className="icon" /> {blogDetail?.views || 0}
          </p>
        </div>

       
        <span className="post_date">
          {createdAt ? new Date(createdAt).toLocaleDateString('uk-UA') : "Нещодавно"}
        </span>
        
        <h4>{title}</h4>

        <div className="item_footer">
          <div className="author_meta">
   
   
    <img 
  src={
    blog.author_image 
      ? blog.author_image  
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author_name || 'A')}&background=6366f1&color=fff` 
  } 
  alt={blog.author_name} 
  className="author_mini_img"
 
  onError={(e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author_name || 'A')}&background=6366f1&color=fff`;
  }}
/>
    <span className="author_name">{blog.author_name || "Костянтин"}</span>
  </div>

          <button className="read_more_btn">
            Читати далі <MdOutlineArrowOutward />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Blog;
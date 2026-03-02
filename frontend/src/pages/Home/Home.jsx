
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../../Components/Hero/Hero";
import Topic from "../../Components/Topics/Topic";
import BlogList from "../../Components/BlogList/BlogList";
import './Home.css'

const Home = () => {
  
  const [category, setCategory] = useState("All");

  return (
    <div className="home-wrapper home-container">
      {/* SEO Мета-теги для головної сторінки */}
      <Helmet>
        <title>MarketingKit | Блог про бізнес-автоматизацію та AI</title>
        <meta name="description" content="Дізнайтесь, як автоматизувати бізнес-процеси, використовувати AI та впроваджувати сучасні IT-рішення у вашій компанії." />
        <link rel="canonical" href="https://yourwebsite.com/" />
        {/* Open Graph для соцмереж */}
        <meta property="og:title" content="MarketingKit | Експертний блог про AI та автоматизацію" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
      </Helmet>

      <Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MarketingKit",
      "url": "https://yourwebsite.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://yourwebsite.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
</Helmet>

      <div className="animate-fade-in delay-hero">
      <Hero />
    </div>
      
     
     
      <div className="animate-fade-in delay-topic">
      <Topic 
        category={category} 
        setCategory={setCategory} 
       
      />
    </div>
      
      
      <div className="animate-fade-in delay-list">
      <BlogList category={category} />
    </div>
    </div>
  );
};

export default Home;
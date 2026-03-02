import React, { useEffect, useState } from 'react';

const ReadingProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setWidth((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div 
      className="reading_progress_bar" 
      style={{ width: `${width}%` }} 
    />
  );
};

// Використовуй React.memo, щоб він не смикав батьківський компонент
export default React.memo(ReadingProgressBar);
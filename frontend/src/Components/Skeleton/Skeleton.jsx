import React from "react";
import "./Skeleton.css";

const Skeleton = ({ type }) => {
  if (type === "details") {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton-title sh"></div>
        <div className="skeleton-meta sh"></div>
        <div className="skeleton-image sh"></div>
        <div className="skeleton-text sh"></div>
        <div className="skeleton-text sh"></div>
        <div className="skeleton-text short sh"></div>
      </div>
    );
  }

  if (type === "sidebar") {
    return (
      <div className="skeleton-sidebar">
        <div className="skeleton-box sh"></div>
        <div className="skeleton-box sh"></div>
      </div>
    );
  }
  if (type === "card") {
    return (
      <div className="skeleton-card">
        <div className="skeleton-card-img sh"></div>
        <div className="skeleton-card-content">
          <div className="skeleton-card-title sh"></div>
          <div className="skeleton-card-text sh"></div>
          <div className="skeleton-card-btn sh"></div>
        </div>
      </div>
    );
  }
};

export default Skeleton;
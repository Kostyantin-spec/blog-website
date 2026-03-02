import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaChartLine, FaPlus, FaComments, FaNetworkWired, FaCog, FaSignOutAlt } from 'react-icons/fa';
 // Використовуємо ті ж стилі
import '../AdminDashboard/AdminDashboard.css'

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>MBlog <span>Admin</span></h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <FaChartLine /> <span>Огляд</span>
          </NavLink>
          <NavLink to="/admin/add-post" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <FaPlus /> <span>Нова стаття</span>
          </NavLink>
          <NavLink to="/admin/comments" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <FaComments /> <span>Коментарі</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <FaNetworkWired /> <span>Налаштування Make</span>
          </NavLink>
          
          <NavLink 
                      to="/admin/gold-stats" 
                       className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                       >
                    <FaChartLine /> <span>Аналітика інструментів</span>
          </NavLink>

        </nav>
        <button onClick={handleLogout} className="logout-btn-sidebar">
          <FaSignOutAlt /> <span>Вийти</span>
        </button>
      </aside>

      <main className="main-content">
        {/* Сюди React Router підставить або список статей, або коментарі */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;
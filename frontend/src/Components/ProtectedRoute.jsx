
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Перевір, чи шлях правильний

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. Поки перевіряємо localStorage — нічого не робимо (або показуємо спінер)
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Завантаження...</h3>
      </div>
    );
  }

  // 2. Якщо завантаження завершено і адміна НЕМАЄ — тільки тоді редирект
  if (!admin) {
    console.log("🔒 Доступ заборонено, редирект на логін");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. Якщо адмін є — показуємо контент
  return children;
};

export default ProtectedRoute;
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log("ProtectedRoute status:", { loading, adminExists: !!admin });

  if (loading) {
    return <div>Завантаження прав доступу...</div>;
  }

  // Якщо завантаження пройшло, але адміна немає — викидаємо
  if (!admin) {
     // Щоб побачити, чи прийшов адмін, виведи в консоль
     console.log("Адмін в контексті зараз:", admin);
     return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log("ProtectedRoute status:", { loading, adminExists: !!admin });

  if (loading) return <div>Завантаження прав доступу...</div>;

  if (!admin) {
    console.warn("🔒 Доступ заборонено. Редирект...");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
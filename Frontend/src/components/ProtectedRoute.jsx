import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.username) return <Navigate to="/login" replace />;
  if (user.role !== "staff") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

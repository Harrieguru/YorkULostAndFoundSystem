import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  let decoded = null;
  try {
    decoded = jwtDecode(token);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  const isExpired = decoded.exp < Math.floor(new Date().getTime() / 1000);
  if (isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (decoded.role !== "staff") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "recruiter") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;

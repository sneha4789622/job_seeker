import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");

  // not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // user allowed
  return children;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

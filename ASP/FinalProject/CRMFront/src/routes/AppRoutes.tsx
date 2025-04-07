import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Orders from "../pages/Orders";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import DashboardKanban from "../pages/DashboardKanban";
import OrderDetailsPage from "../components/kanban/OrderDetailsPage";
import ChangePassword from "../pages/ChangePassword";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public routes - доступны всегда */}
      <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} />

      {/* Protected routes - требуют авторизации */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kanban" element={<DashboardKanban />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        <Route path="/users" element={<Users />} />
      </Route>

      {/* Redirect all unknown routes to login if not authenticated, or to dashboard if authenticated */}
      <Route path="*" element={isLogin ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;

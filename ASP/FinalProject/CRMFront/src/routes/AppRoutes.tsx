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
      <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/" />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={isLogin ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clients" element={isLogin ? <Clients /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={isLogin ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/orders" element={isLogin ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/kanban" element={isLogin ? <DashboardKanban /> : <Navigate to="/login" />} />
        <Route path="/orders/:orderId" element={isLogin ? <OrderDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/users" element={isLogin ? <Users /> : <Navigate to="/login" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Clients from "../pages/Clients";
import Tasks from "../pages/Tasks";
import Orders from "../pages/Orders";
import PrivateRoute from "./PrivateRoute";
import DashboardKanban from "../pages/DashboardKanban";
import OrderDetailsPage from "../components/kanban/OrderDetailsPage";
import Users from "../pages/Users";
import ChangePassword from "../pages/ChangePassword";
import VerifyEmail from "../pages/VerifyEmail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kanban" element={<DashboardKanban />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} /> 
        <Route path="/users" element={<Users />} /> 
      </Route>
      
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import UsersPage from "@/pages/users/UsersPage";
import RolesPage from "@/pages/roles/RolesPage";
import WorkflowsPage from "@/pages/workflows/WorkflowsPage";
import DesignerPage from "@/pages/workflows/DesignerPage";
import RequireAuth from "@/app/config/guard";
import Shell from "@/widgets/layout/Shell";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<Shell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="workflows" element={<WorkflowsPage />} />
          <Route path="workflow/:id" element={<DesignerPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

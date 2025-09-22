import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Shield, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/ui/cn";

export default function Sidebar() {
  const { t } = useTranslation();
  const base =
    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800";
  const active =
    "bg-neutral-100 dark:bg-neutral-800 font-medium ring-1 ring-neutral-200 dark:ring-neutral-700";
  return (
    <aside className="w-60 border-r border-neutral-200 dark:border-neutral-800 h-screen sticky top-0 p-3">
      <div className="h-12 flex items-center px-2 text-lg font-semibold">
        FiloApp
      </div>
      <nav className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => cn(base, isActive && active)}
        >
          <LayoutDashboard size={18} />
          <span>{t("dashboard")}</span>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => cn(base, isActive && active)}
        >
          <Users size={18} />
          <span>{t("users")}</span>
        </NavLink>
        <NavLink
          to="/roles"
          className={({ isActive }) => cn(base, isActive && active)}
        >
          <Shield size={18} />
          <span>{t("roles")}</span>
        </NavLink>
        <NavLink
          to="/workflows"
          className={({ isActive }) => cn(base, isActive && active)}
        >
          <Workflow size={18} />
          <span>Workflows</span>
        </NavLink>
      </nav>
    </aside>
  );
}

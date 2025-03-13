import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

import DashboardAnimation from "../../assets/DashboardAnimation.json";
import ClientsAnimation from "../../assets/ClientsAnimation.json";
import OrdersAnimation from "../../assets/OrdersAnimation.json";
import TasksAnimation from "../../assets/TasksAnimation.json";
import UsersAnimation from "../../assets/UsersAnimation.json";
import KanbanAnimation from "../../assets/KanbanAnimation.json";
import SettingsAnimation from "../../assets/SettingsAnimation.json";
import { useState } from "react";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, animation: DashboardAnimation, path: "/dashboard",},
  { text: "Clients", icon: <PeopleIcon />, animation: ClientsAnimation, path: "/clients" },
  { text: "Orders", icon: <ShoppingCartIcon />, animation: OrdersAnimation, path: "/orders" },
  { text: "Tasks", icon: <AssignmentIcon />, animation: TasksAnimation, path: "/tasks" },
  { text: "Users", icon: <GroupIcon />, animation: UsersAnimation, path: "/users" },
  { text: "Kanban", icon: <ViewKanbanIcon />, animation: KanbanAnimation, path: "/kanban" }, 
  { text: "Settings", icon: <SettingsIcon />, animation: SettingsAnimation, path: "/settings" },
];

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}



const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={{
        width: isExpanded ? 240 : 60,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: isExpanded ? 240 : 60,
          boxSizing: "border-box",
          backgroundColor: "#1a1a2e",
          color: "#fff",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(({ text, icon, animation, path }) => (
          <ListItemButton
            key={text}
            component={NavLink}
            to={path}
            onMouseEnter={() => setHoveredItem(text)}
            onMouseLeave={() => setHoveredItem(null)}
            sx={{
              color: "#fff",
              "&.active": {
                backgroundColor: "#16213e",
                marginTop: "15px"
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
              {hoveredItem === text ? (
                <Lottie animationData={animation} style={{ width: 60, height: 40, marginLeft: -20 }} />
              ) : (
                icon
              )}
            </ListItemIcon>
            {isExpanded && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

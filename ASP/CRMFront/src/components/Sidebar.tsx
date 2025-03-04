import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";

const menuItems = [
  { text: "Дэшборд", icon: <DashboardIcon />, path: "/" },
  { text: "Клиенты", icon: <PeopleIcon />, path: "/clients" },
  { text: "Заказы", icon: <ShoppingCartIcon />, path: "/orders" },
  { text: "Задачи", icon: <AssignmentIcon />, path: "/tasks" },
  { text: "Пользователи", icon: <GroupIcon />, path: "/users" },
  { text: "Настройки", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1a1a2e",
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            component={NavLink}
            to={path}
            sx={{
              color: "#fff",
              "&.active": {
                backgroundColor: "#16213e",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

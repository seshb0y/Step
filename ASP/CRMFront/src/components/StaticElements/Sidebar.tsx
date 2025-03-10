import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard",},
  { text: "Clients", icon: <PeopleIcon />, path: "/clients" },
  { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
  { text: "Tasks", icon: <AssignmentIcon />, path: "/tasks" },
  { text: "Users", icon: <GroupIcon />, path: "/users" },
  { text: "Kanban", icon: <ViewKanbanIcon />, path: "/kanban" }, 
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
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
        {menuItems.map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            component={NavLink}
            to={path}
            sx={{
              color: "#fff",
              "&.active": {
                backgroundColor: "#16213e",
                marginTop: "15px"
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>{icon}</ListItemIcon>
            {isExpanded && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

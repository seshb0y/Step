import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import UserProfileModal from "../Modals/UserProfileModal";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutUser } from "../../features/auth/authSlice";

const TopBox = () => {
  const [isSidebarExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user : User = storedUser ? JSON.parse(storedUser) : null;
  const dispatch = useAppDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#1a1a2e",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "fixed",
        top: 0,
        left: isSidebarExpanded ? "240px" : "60px",
        right: 0,
        transition: "left 0.3s ease",
      }}
    >

      <UserProfileModal open={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />

      <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
        CRMSolution
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ marginRight: "10px", color: "#fff" }}>{user?.username || "User"}</Typography>
        <IconButton onClick={handleMenuOpen}>
          <Avatar sx={{ bgcolor: "primary.main" }}>{user?.username?.charAt(0).toUpperCase()}</Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          sx={{ "& .MuiPaper-root": { backgroundColor: "#1a1a2e", color: "#fff" } }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              setIsProfileOpen(true);
            }}
          >
            Профиль
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <Logout fontSize="small" sx={{ marginRight: "8px" }} />
            Выйти
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TopBox;

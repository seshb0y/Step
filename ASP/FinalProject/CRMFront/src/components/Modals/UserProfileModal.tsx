import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { User } from "../../types/User";
import axiosInstance from "../../api/axiosInstance";

const UserProfileModal = ({ open, onClose, user }: { open: boolean; onClose: () => void; user: User }) => {

    const handleConfirmEmail = async () => {
        try {
            await axiosInstance.post("/Account/ConfirmEmail", { username: user.username });
        } catch (error) {
            console.error("Error confirming email:", error);
        }
    };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-profile-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#1a1a2e",
          color: "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", mb: 2 }}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6">{user.username || "Имя пользователя"}</Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {user?.email || "example@email.com"}
          </Typography>
        </Box>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {!user.isEmailConfirmed && (
                <Button variant="contained" color="primary" fullWidth onClick={handleConfirmEmail}>
                Подтвердить email
              </Button>
            )}
          
          <Button variant="outlined" color="secondary" fullWidth onClick={onClose}>
            Закрыть
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserProfileModal;

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import store from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import { useAppSelector } from "./hooks/useAppSelector";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </Provider>
  );
};

const MainLayout = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {isAuthenticated && <Sidebar />}

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: isAuthenticated ? "240px" : "0" }}>
        <Toolbar />
        <AppRoutes />
      </Box>
    </Box>
  );
};

export default App;

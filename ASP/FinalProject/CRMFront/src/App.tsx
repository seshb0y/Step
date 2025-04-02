import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { checkAuth } from './features/auth/authSlice';

const AppInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    toast.info('Приложение загружено');
  }, []);

  return <AppRoutes />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <AppInitializer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

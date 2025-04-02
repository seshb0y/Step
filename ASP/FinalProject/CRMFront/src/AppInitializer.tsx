import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { checkAuth } from './features/auth/authSlice';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useSignalRClient } from './hooks/useSignalRClient';
import AppRoutes from './routes/AppRoutes';
import { addClientRealtime } from './features/clients/clientSlice';

const AppInitializer = () => {
  const dispatch = useAppDispatch();

  const handleClientCreated = (data: any) => {
    console.log("📡 Новый клиент получен по SignalR:", data);
    dispatch(addClientRealtime(data));
  };

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useSignalRClient(handleClientCreated);

  useEffect(() => {
    toast.info('Приложение загружено');

    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5241/notificationHub")
      .withAutomaticReconnect()
      .build();


    connection.start()
      .then(() => {
        console.log("✅ SignalR Connected");
        connection.on("ClientCreated", (data) => {
          console.log("📡 Новый клиент получен по SignalR:", data);
        });
      })
      .catch(err => console.error("❌ SignalR Connection error:", err));

    return () => {
      connection.stop().then(() => {
        console.log("🔌 SignalR Connection stopped");
      });
    };
  }, []);

  return <AppRoutes />;
};

export default AppInitializer;

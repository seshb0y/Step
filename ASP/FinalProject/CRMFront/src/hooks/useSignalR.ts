import { useEffect } from "react";
import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { addClientRealtime, changeClientRealtime, deleteClientRealtime, fetchClientsWithOrdersAndTasks } from "../features/clients/clientSlice";
import { addUserRealtime, changeUserRealtime, deleteUserRealtime } from "../features/user/userSlice";
import { addOrderRealtime,  deleteOrderRealtime } from "../features/orders/orderSlice";
import {  changeTaskRealtime, } from "../features/tasks/tasksSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../store/store";

export const useSignalR = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let connection: HubConnection;

    const startConnection = async () => {
      try {
        connection = new HubConnectionBuilder()
          .withUrl("http://localhost:5241/notificationHub")
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Information)
          .build();

        connection.onreconnecting(() => {
          toast.info("Переподключение к серверу...");
        });

        connection.onreconnected(() => {
          toast.success("Подключение восстановлено");
          dispatch(fetchClientsWithOrdersAndTasks());
        });

        connection.onclose((error) => {
          if (error) {
            toast.error("Потеряно соединение с сервером");
          }
        });

        // Клиенты
        connection.on("ClientCreated", (data) => {
          console.log("📡 Новый клиент:", data);
          dispatch(addClientRealtime(data));
        });
        
        connection.on("ClientDeleted", (data) => {
          console.log("📡 Удален клиент:", data);
          dispatch(deleteClientRealtime(data));
        });
        
        connection.on("ClientUpdated", (data) => {
          console.log("📡 Обновлен клиент:", data);
          dispatch(changeClientRealtime(data));
        });

        // Пользователи
        connection.on("NewUserRegistered", (data) => {
          console.log("📡 Новый пользователь:", data);
          dispatch(addUserRealtime(data));
        });

        connection.on("UserUpdated", (data) => {
          console.log("📡 Обновлен пользователь:", data);
          dispatch(changeUserRealtime(data));
        });
        
        connection.on("UserDeleted", (data) => {
          console.log("📡 Удален пользователь:", data);
          dispatch(deleteUserRealtime(data));
        });

        // Заказы
        connection.on("OrderCreated", (data) => {
          console.log("📡 Новый заказ:", data);
          dispatch(addOrderRealtime(data));
        });

        connection.on("OrderUpdated", (data) => {
          console.log("📡 Обновлен заказ:", data);
          window.dispatchEvent(new CustomEvent('orderUpdated'));
          dispatch(fetchClientsWithOrdersAndTasks());
        });

        connection.on("ResponsibleUpdated", (data: { userId: number; orderId: number }) => {
          console.log("📡 Получены данные об обновлении ответственного:", data);
          window.dispatchEvent(new CustomEvent('responsibleUpdated'));
          dispatch(fetchClientsWithOrdersAndTasks());
        });

        connection.on("OrderDeleted", (data) => {
          console.log("📡 Удален заказ:", data);
          dispatch(deleteOrderRealtime(data));
        });

        // Задачи
        connection.on("TaskCreated", (data) => {
          console.log("📡 Новая задача:", data);
          window.dispatchEvent(new CustomEvent('taskCreated'));
          dispatch(fetchClientsWithOrdersAndTasks());
        });

        connection.on("TaskUpdated", (data) => {
          console.log("📡 Обновлена задача:", data);
          dispatch(changeTaskRealtime(data));
        });

        connection.on("TaskDeleted", (data) => {
          console.log("📡 Удалена задача:", data);
          window.dispatchEvent(new CustomEvent('taskDeleted'));
          dispatch(fetchClientsWithOrdersAndTasks());
        });

        await connection.start();
        toast.success("Подключено к серверу");

      } catch (error) {
        console.error("Ошибка подключения к серверу:", error);
        toast.error("Ошибка подключения к серверу");
        setTimeout(startConnection, 5000);
      }
    };

    void startConnection();

    return () => {
      if (connection) {
        connection.stop()
          .catch(err => console.error("Ошибка при остановке SignalR:", err));
      }
    };
  }, [dispatch]);
};

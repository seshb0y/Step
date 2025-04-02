import { useEffect } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

// Хук для работы с SignalR
export const useSignalRClient = (onClientCreated: (data: any) => void) => {
  useEffect(() => {
    const connection: HubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5241/notificationHub")
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("✅ SignalR Connected");
        connection.on("ClientCreated", (data) => {
          onClientCreated(data); 
        });
      })
      .catch(err => console.error("❌ SignalR Connection error:", err));

    connection.onclose(() => {
      console.log("❌ SignalR Disconnected");
    });

    return () => {
      connection.stop().then(() => {
        console.log("🔌 SignalR Connection stopped");
      });
    };
  }, [onClientCreated]);
};

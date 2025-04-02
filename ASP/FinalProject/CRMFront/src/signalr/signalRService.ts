import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const createSignalRConnection = (onClientCreated: (data: any) => void) => {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5241/notificationHub", {
      withCredentials: true
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("ClentCreated", onClientCreated);

  connection
    .start()
    .then(() => console.log("✅ SignalR connected to /notificationHub"))
    .catch(err => console.error("❌ SignalR connection error:", err));

  return connection;
};

export const stopSignalRConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
    console.log("🛑 SignalR disconnected");
  }
};

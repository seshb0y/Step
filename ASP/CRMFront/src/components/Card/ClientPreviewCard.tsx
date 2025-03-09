import { Client } from "../../types/Client";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

interface CardProps {
  client: Client;
}

const ClientPreviewCard = ({ client }: CardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-[#1a0b2e] text-white border border-[#5a2d82] shadow-md p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{client.name}</CardTitle>
        <p className="text-gray-400">{client.email}</p>
        <p className="text-gray-400">{client.phone}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">Адрес: {client.address}</p>
        <p className="text-sm text-gray-300">Дата регистрации: {new Date(client.createdAt).toLocaleDateString()}</p>

        <h3 className="text-md font-medium text-gray-300 mt-3">Orders:</h3>
        {client.orders.length > 0 ? (
          client.orders?.map((order) => (
            <div 
              key={order.id} 
              className="p-2 bg-[#2a1042] rounded-md mb-2 cursor-pointer hover:bg-[#3a1f5a] transition"
              onClick={() => navigate(`/orders/${order.orderId}`)} // Переход на страницу заказа
            >
              <p className="text-sm">ID: {order.id}</p>
              <p className="text-sm">Total: {order.totalAmount} ₽</p>
              <p className="text-sm">Created: {new Date(order.createdAt).toLocaleDateString()}</p>
              <Badge className={`text-xs ${order.status.toString() === "New" ? "bg-blue-500" : order.status.toString() === "Processing" ? "bg-yellow-500" : "bg-green-500"}`}>
                {order.status}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No orders</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientPreviewCard;

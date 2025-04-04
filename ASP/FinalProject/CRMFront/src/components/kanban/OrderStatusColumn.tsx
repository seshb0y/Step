import ClientPreviewCard from "../Card/ClientPreviewCard";
import { Client } from "../../types/Client";
import { OrderStatus } from "../../types/Order";
import { useDispatch } from "react-redux";
import { fetchChangeOrderData } from "../../features/orders/orderSlice";
import { AppDispatch } from "../../store/store";

interface Props {
  title: string;
  status: OrderStatus;
  clients: Client[];
  columnColor: string;
}

const OrderStatusColumn = ({ title, status, clients, columnColor }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const column = e.currentTarget;
    column.style.opacity = "0.8";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const column = e.currentTarget;
    column.style.opacity = "1";
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const column = e.currentTarget;
    column.style.opacity = "1";

    const orderId = parseInt(e.dataTransfer.getData("orderId"));
    const currentStatus = parseInt(e.dataTransfer.getData("currentStatus"));

    if (currentStatus !== status) {
      try {
        await dispatch(fetchChangeOrderData({
          orderId,
          status,
          totalAmount: "0" // Мы не меняем сумму заказа при перетаскивании
        }));
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  const filteredClients = clients
    .map(client => ({
      ...client,
      orders: client.orders?.filter(order => {
        return order.orderStatus === status;
      }) || []
    }))
    .filter(client => client.orders.length > 0);

  return (
    <div 
      className={`w-[500px] min-w-[350px] bg-gradient-to-b ${columnColor} p-6 rounded-xl border border-gray-800/30 shadow-lg transition-all duration-300 ease-in-out hover:border-gray-700/50`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <span className="px-3 py-1 text-sm bg-gray-800/50 rounded-full text-gray-300 backdrop-blur-sm">
          {filteredClients.reduce((acc, client) => acc + client.orders.length, 0)}
        </span>
      </div>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 custom-scrollbar">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => <ClientPreviewCard key={client.id} client={client} />)
        ) : (
          <div className="text-center py-8 px-4 bg-gray-800/30 rounded-lg border border-gray-700/30 backdrop-blur-sm">
            <p className="text-gray-400">Нет заказов</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusColumn;
  
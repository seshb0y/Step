import ClientPreviewCard from "../Card/ClientPreviewCard";
import { Client } from "../../types/Client";
import { OrderStatus } from "../../types/Order";

interface Props {
  title: string;
  status: OrderStatus;
  clients: Client[];
}

const OrderStatusColumn = ({ title, status, clients }: Props) => {
    const filteredClients = clients
      .map(client => ({
        ...client,
        orders: client.orders?.filter(order => {
        //   const orderStatusAsNumber = Object.values(OrderStatus).indexOf(order.orderStatus as unknown as OrderStatus);
          return order.orderStatus === status;
        }) || []
      }))
      .filter(client => client.orders.length > 0);
    return (
      <div className="w-1/4 bg-gray-900 p-4 rounded-lg gap ml-20">
        <h2 className="text-xl font-bold text-primary-purple">{title}</h2>
        <div className="mt-4 flex flex-col gap-4">
          {filteredClients.length > 0 ? (
            filteredClients.map(client => <ClientPreviewCard key={client.id} client={client} />)
          ) : (
            <p className="text-gray-400">No clients</p>
          )}
        </div>
      </div>
    );
  };
  
  export default OrderStatusColumn;
  
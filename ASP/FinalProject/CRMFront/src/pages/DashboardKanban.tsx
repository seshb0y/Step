import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchClientsWithOrdersAndTasks } from "../features/clients/clientSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import OrderStatusColumn from "../components/kanban/OrderStatusColumn";
import { OrderStatus } from "../types/Order";
import LoadingSpinner from "../components/LoadingSpinner";

export const DashboardKanban = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchClientsWithOrdersAndTasks() as never);
  }, [dispatch]);
  console.log(clients)
  if (error) return <p className="text-red-500">{error}</p>;

  // Фильтруем клиентов по статусу их активного заказа
  const filterClientsByOrderStatus = (status: OrderStatus) => {
    return clients.filter(client =>
      client.orders?.some(order => {
        // Приводим order.status к числу перед сравнением
        // const orderStatusAsNumber = Object.values(OrderStatus).indexOf(order.orderStatus as unknown as OrderStatus);
        return order.orderStatus === status;
      })
    );
  };
  

  return (
    <div className="min-h-screen flex bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[10px]" : "ml-[10px]"} w-screen`}>
          <div className="flex flex-row gap-6">
            <OrderStatusColumn title="New Orders" status={OrderStatus.New} clients={filterClientsByOrderStatus(OrderStatus.New)} />
            <OrderStatusColumn title="Processing" status={OrderStatus.Processing} clients={filterClientsByOrderStatus(OrderStatus.Processing)} />
            <OrderStatusColumn title="Completed" status={OrderStatus.Completed} clients={filterClientsByOrderStatus(OrderStatus.Completed)} />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default DashboardKanban;

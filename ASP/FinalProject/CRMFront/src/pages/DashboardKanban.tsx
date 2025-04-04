import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchClientsWithOrdersAndTasks } from "../features/clients/clientSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import OrderStatusColumn from "../components/kanban/OrderStatusColumn";
import { OrderStatus } from "../types/Order";
import LoadingScreen from "../components/LoadingScreen";

export const DashboardKanban = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchClientsWithOrdersAndTasks() as never);
  }, [dispatch]);

  if (error) return <p className="text-red-500">{error}</p>;

  const filterClientsByOrderStatus = (status: OrderStatus) => {
    return clients.filter(client =>
      client.orders?.some(order => order.orderStatus === status)
    );
  };

  const renderContent = () => (
    <div className={`w-screen flex-1 transition-all duration-300 p-8 mt-20 ${isSidebarExpanded ? "ml-[0px]" : "ml-[-80px]"}`}>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary-purple mb-2">Kanban Board</h1>
        <p className="text-gray-400">Manage orders using drag-and-drop</p>
      </div>
      <div className="flex flex-row justify-center gap-8 overflow-x-auto pb-4 px-4">
        <OrderStatusColumn 
          title="New orders" 
          status={OrderStatus.New} 
          clients={filterClientsByOrderStatus(OrderStatus.New)}
          columnColor="from-blue-500/20 to-blue-600/5"
        />
        <OrderStatusColumn 
          title="Processing" 
          status={OrderStatus.Processing} 
          clients={filterClientsByOrderStatus(OrderStatus.Processing)}
          columnColor="from-yellow-500/20 to-yellow-600/5"
        />
        <OrderStatusColumn 
          title="Completed" 
          status={OrderStatus.Completed} 
          clients={filterClientsByOrderStatus(OrderStatus.Completed)}
          columnColor="from-green-500/20 to-green-600/5"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />
      {loading ? <LoadingScreen title="Kanban Board" /> : renderContent()}
    </div>
  );
};

export default DashboardKanban;

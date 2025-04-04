import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchGetAllOrders } from "../features/orders/orderSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../types/Order";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [sortOrder, setSortOrder] = useState<{ sortBy: string; descending: boolean }>({
    sortBy: "id",
    descending: false,
  });

  useEffect(() => {
    dispatch(fetchGetAllOrders(sortOrder));
  }, [dispatch, sortOrder]);

  const handleSort = (key: string) => {
    setSortOrder((prev) => ({
      sortBy: key,
      descending: prev.sortBy === key ? !prev.descending : false,
    }));
    dispatch(fetchGetAllOrders({ sortBy: key, descending: sortOrder.sortBy === key ? !sortOrder.descending : false }));
  };

  return (
    <div className="min-h-screen w-full bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />

      <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-screen`}>
        <h1 className="text-2xl font-bold mb-4 ml-16">Orders</h1>

        {/* Кнопки сортировки */}
        <div className="flex gap-4 mb-4 ml-16 text-primary-purple">
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("id")}>Sort by Id</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("totalAmount")}>Sort by Total Amount</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("status")}>Sort by Status</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("createdAt")}>Sort by Created At</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("username")}>Sort by Responsible</button>
        </div>

        {/* Таблица заказов */}
        <div className="overflow-x-auto ml-16">
          {loading ? (
            <LoadingScreen title="Orders" subtitle="Loading orders data..." />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-primary-purple">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Total Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Created At</th>
                  <th className="py-2 px-4">Responsible</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700 bg-dark-bg hover:bg-gray-700 cursor-pointer"
                      onClick={() => navigate(`/orders/${order.id}`)}>
                    <td className="py-2 px-4 text-center">{order.id}</td>
                    <td className="py-2 px-4 text-center">{order.totalAmount}$</td>
                    <td className="py-2 px-4 text-center">{OrderStatus[order.status]}</td>
                    <td className="py-2 px-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-center">{order.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

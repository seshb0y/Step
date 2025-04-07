import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchGetAllOrders } from "../features/orders/orderSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import LoadingScreen from "../components/LoadingScreen";
import { OrderSearch } from "../components/Search/OrderSearch";
import { Order } from "../types/Order";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [sortOrders, setSortOrders] = useState<{ sortBy: string; descending: boolean }>({
    sortBy: "createdAt",
    descending: true,
  });

  useEffect(() => {
    dispatch(fetchGetAllOrders(sortOrders));
  }, [dispatch, sortOrders]);

  const handleSort = (key: string) => {
    const newDescending = sortOrders.sortBy === key ? !sortOrders.descending : false;
    setSortOrders({
      sortBy: key,
      descending: newDescending
    });
    dispatch(fetchGetAllOrders({ sortBy: key, descending: newDescending }));
  };

  const handleOrderSelect = (order: Order) => {
    navigate(`/orders/${order.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0:
        return 'bg-blue-500/20 text-blue-300';
      case 1:
        return 'bg-yellow-500/20 text-yellow-300';
      case 2:
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-red-500/20 text-red-300';
    }
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return "New";
      case 1:
        return "InProgress";
      case 2:
        return "Completed";
      default:
        return "Cancelled";
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox isExpanded={isSidebarExpanded} />

      <div
        className={`transition-all duration-300 mt-20 ${
          isSidebarExpanded ? "ml-[280px] w-[calc(100%-280px)]" : "ml-[100px] w-[calc(100%-100px)]"
        } h-[calc(100vh-80px)] overflow-y-auto`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingScreen title="Orders" subtitle="Loading orders data..." />
          </div>
        ) : error ? (
          <div className="px-6">
            <div className="bg-gradient-to-br from-red-900/50 to-purple-900/50 backdrop-blur-sm rounded-lg p-4 shadow-xl">
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        ) : (
          <div className="px-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                Orders
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-72">
                  <OrderSearch onOrderSelect={handleOrderSelect} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[rgba(30,27,75,0.95)] to-[rgba(88,28,135,0.9)] backdrop-blur-sm rounded-lg overflow-hidden shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1),2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-purple-500/10">
              <table className="w-full">
                <thead>
                  <tr>
                    {[
                      { key: "id", label: "ID", width: "100px" },
                      { key: "totalAmount", label: "Total Amount", width: "180px" },
                      { key: "status", label: "Status", width: "150px" },
                      { key: "createdAt", label: "Created At", width: "150px" },
                      { key: "username", label: "Responsible", width: "200px" },
                      { key: "clientName", label: "Client", width: "250px" }
                    ].map(({ key, label, width }) => (
                      <th 
                        key={key}
                        onClick={() => handleSort(key)}
                        className="py-3 px-4 text-left text-white font-medium tracking-wide text-[0.95rem] cursor-pointer transition-all group sticky top-0 bg-[rgba(30,27,75,0.98)] border-b border-purple-500/20"
                        style={{ width }}
                      >
                        <div className="flex items-center gap-2">
                          {label}
                          <span className="text-purple-400/70 group-hover:text-purple-300 transition-colors">
                            {sortOrders.sortBy === key && (
                              sortOrders.descending ? '↓' : '↑'
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="border-b border-purple-500/10 hover:bg-[rgba(139,92,246,0.1)] transition-all duration-200 cursor-pointer"
                      onClick={() => handleOrderSelect(order)}
                    >
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">#{order.id}</td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">{formatPrice(order.totalAmount)}</td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(Number(order.status))}`}>
                          {getStatusText(Number(order.status))}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter whitespace-nowrap">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                      </td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">{order.username}</td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">{order.clientName || 'No client'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

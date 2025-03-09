import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../LoadingSpinner";
import Sidebar from "../StaticElements/Sidebar";
import TopBox from "../StaticElements/TopBox";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setError("Некорректный ID заказа.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        console.log(`Запрос: /api/orders/${orderId}`);
        const response = await axiosInstance.get(`/Order/${orderId}`);
        console.log("Ответ сервера:", response.data);
        setOrder(response.data);
      } catch (err) {
        setError("Ошибка загрузки заказа.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!order || !order.client) {
    return <p className="text-red-500">Данные о заказе отсутствуют</p>;
  }

  return (
    <div className="min-h-screen flex bg-dark-bg text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      {/* Main Content */}
      <div className="flex-1">
        <TopBox />

        <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-full`}>
          <h1 className="text-3xl font-bold mb-4">Детали заказа #{order.id}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Информация о заказе */}
            <div className="bg-[#2a1042] p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Информация о заказе</h2>
              <p>Total: {order.totalAmount} ₽</p>
              <p>Статус: {order.status}</p>
              <p>Создан: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Информация о клиенте */}
            <div className="bg-[#2a1042] p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Информация о клиенте</h2>
              <p>Имя: {order.client.name}</p>
              <p>Email: {order.client.email}</p>
              <p>Телефон: {order.client.phone}</p>
            </div>
          </div>

          {/* Блок задач */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Задачи по заказу</h2>
            {order.tasks?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.tasks.map((task) => (
                  <div key={task.id} className="bg-[#3a1a5e] p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Статус: {task.status}</p>
                    <p>Дедлайн: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Нет задач</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

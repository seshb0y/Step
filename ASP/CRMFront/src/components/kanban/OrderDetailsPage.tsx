import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../LoadingSpinner";
import Sidebar from "../StaticElements/Sidebar";
import TopBox from "../StaticElements/TopBox";
import { Order } from "../../types/Order";
import { Task, TaskStatus } from "../../types/Task";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Incorrect order ID.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        console.log(`Request: /api/orders/${orderId}`);
        const response = await axiosInstance.get(`/Order/${orderId}`);
        console.log("Server response:", response.data);
        setOrder(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Order loading error.",);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleAddTask = () => {
    if (!taskText.trim()) return;
  
    const newTask: Task = {
      id: Date.now(),
      title: "New task",
      description: taskText,
      taskStatus: TaskStatus.New,
      dueDate: new Date(),
      order: order,
      userTasks: [],
    };
  
    setOrder((prev) => ({
      ...prev,
      tasks: [...(prev?.tasks || []), newTask],
    }));
  
    setTaskText("");
  };
  
  

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
      <div className="flex-1 flex flex-col">
        <TopBox />

        <div className={`transition-all duration-300 flex mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-full`}>
          
          {/* Левая колонка (Информация о сделке) */}
          <div className="w-1/3 bg-[#1a0b2e] p-6 rounded-lg shadow-md h-[calc(100vh-80px)]">
            <h2 
                className="text-lg font-semibold mb-4">Сделка #{order.id}
                <p><span className="text-white font-medium">Бюджет:</span> {order.totalAmount} ₽</p>
                <p><span className="text-white font-medium">Отв-ный:</span> {order.users[0].username}</p>
            </h2>
            
            <div className="text-gray-300">
              <p><span className="text-white font-medium">Client:</span> {order.client.clientName}</p>
              <p><span className="text-white font-medium">Email:</span> {order.client.email}</p>
              <p><span className="text-white font-medium">Phone:</span> {order.client.phone}</p>
              <p><span className="text-white font-medium">Address:</span> {order.client.address}</p>
            </div>
          </div>

          {/* Правая колонка (Задачи и история) */}
          <div className="w-2/3 flex flex-col px-6">
            
            {/* История событий */}
            <div className="bg-[#2a1042] p-6 rounded-lg shadow-md mb-6 flex-1">
              <h2 className="text-lg font-semibold mb-4">История событий</h2>
              <p className="text-gray-400 text-sm">Создано 3 события <span className="text-blue-400 cursor-pointer">Развернуть</span></p>
            </div>

            {/* Блок задач */}
            <div className="bg-[#2a1042] p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Задачи</h2>
              {order.tasks?.length > 0 ? (
                <div className="space-y-4">
                  {order.tasks.map((task) => (
                    <div key={task.id} className="bg-[#3a1a5e] p-4 rounded-md shadow-md">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p>{task.description}</p>
                      <p className="text-sm text-gray-400">Статус: {task.taskStatus}</p>
                      <p className="text-sm text-gray-400">Дедлайн: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Нет задач</p>
              )}
            </div>

            {/* Форма для добавления задачи */}
            <div className="bg-[#2a1042] p-4 rounded-lg shadow-md mt-4 flex flex-col">
              <label className="text-sm text-gray-400">Примечание:</label>
              <textarea
                className="w-full bg-gray-700 p-3 rounded-md text-white mt-2"
                placeholder="Напишите задачу..."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
              <div className="flex justify-between mt-2">
                <button className="bg-primary-purple px-4 py-2 rounded text-white" onClick={handleAddTask}>
                  Добавить
                </button>
                <button className="bg-gray-600 px-4 py-2 rounded text-white" onClick={() => setTaskText("")}>
                  Отменить
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

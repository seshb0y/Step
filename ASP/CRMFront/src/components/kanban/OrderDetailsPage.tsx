import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { createTask } from "../../features/tasks/tasksSlice";
import LoadingSpinner from "../LoadingSpinner";
import Sidebar from "../StaticElements/Sidebar";
import TopBox from "../StaticElements/TopBox";
import { Order } from "../../types/Order";
import { TaskStatus } from "../../types/Task";
import { AppDispatch } from "../../store/store";
import Modal from "../ui/Modal";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

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
      } catch (err) {
        setError("Order loading error.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleCreateTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim() || !taskDueDate || !order) return;

    const taskData = {
      title: taskTitle,
      description: taskDescription,
      endDate: new Date(taskDueDate),
      userName: order.users[0].username,
      orderId: order.id,
    };

    await dispatch(createTask(taskData));
    setIsModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!order || !order.client) {
    return <p className="text-red-500">Данные о заказе отсутствуют</p>;
  }

  return (
    <div className="min-h-screen flex bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className="flex-1 flex flex-col">
        <TopBox />

        <div className={`transition-all duration-300 flex mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-full`}>
          <div className="w-1/3 bg-[#1a0b2e] p-6 rounded-lg shadow-md h-[calc(100vh-80px)]">
            <h2 className="text-lg font-semibold mb-4">
              Сделка #{order.id}
              <p><span className="text-white font-medium">Бюджет:</span> {order.totalAmount} ₽</p>
              <p><span className="text-white font-medium">Отв-ный:</span> {order.users[0].username}</p>
            </h2>
            <div className="text-gray-300">
              <p><span className="text-white font-medium">Client:</span> {order.client.name}</p>
              <p><span className="text-white font-medium">Email:</span> {order.client.email}</p>
              <p><span className="text-white font-medium">Phone:</span> {order.client.phone}</p>
              <p><span className="text-white font-medium">Address:</span> {order.client.address}</p>
            </div>
          </div>

          <div className="w-2/3 flex flex-col px-6">
            <div className="bg-[#2a1042] p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Задачи</h2>
              <button
                className="mb-4 px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-purple-700 transition"
                onClick={() => setIsModalOpen(true)}
              >
                Добавить задачу
              </button>
              {order.tasks?.length > 0 ? (
                <div className="space-y-4">
                  {order.tasks.map((task) => (
                    <div key={task.id} className="bg-[#3a1a5e] p-4 rounded-md shadow-md">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p>{task.description}</p>
                      <p className="text-sm text-gray-400">Статус: {TaskStatus[task.status]}</p>
                      <p className="text-sm text-gray-400">Дедлайн: {new Date(task.dueDate).toLocaleDateString()}</p>
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

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold">Создать задачу</h2>
          <input type="text" placeholder="Название задачи" className="w-full bg-gray-700 p-2 rounded-md text-white mt-2" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <textarea placeholder="Описание задачи" className="w-full bg-gray-700 p-2 rounded-md text-white mt-2" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          <input type="date" className="w-full bg-gray-700 p-2 rounded-md text-white mt-2" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
          <div className="flex justify-end mt-4">
            <button className="bg-gray-600 px-4 py-2 rounded text-white mr-2" onClick={() => setIsModalOpen(false)}>Отменить</button>
            <button className="bg-primary-purple px-4 py-2 rounded text-white" onClick={handleCreateTask}>Добавить</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderDetailsPage;

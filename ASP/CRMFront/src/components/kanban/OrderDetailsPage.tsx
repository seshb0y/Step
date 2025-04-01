import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { createTask, deleteTask } from "../../features/tasks/tasksSlice";
import LoadingSpinner from "../LoadingSpinner";
import Sidebar from "../StaticElements/Sidebar";
import TopBox from "../StaticElements/TopBox";
import { Order, OrderStatus } from "../../types/Order";
import { TaskStatus } from "../../types/Task";
import { AppDispatch } from "../../store/store";
import Modal from "../ui/Modal";
import { fetchChangeClientData } from "../../features/clients/clientSlice";
import OrderEditModal from "../Modals/OrderEditModal";
import { fetchUsers } from "../../features/user/userSlice";

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
  const [deletingTaskIds, setDeletingTaskIds] = useState<number[]>([]);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
  } | null>(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState("");
  const [editingTaskStatus, setEditingTaskStatus] = useState<TaskStatus>(TaskStatus.New);
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [editedClientData, setEditedClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [isOrderEditModalOpen, setIsOrderEditModalOpen] = useState(false);

  useEffect(() => {
    // Загружаем список пользователей при монтировании компонента
    dispatch(fetchUsers({}));
  }, [dispatch]);

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
        setError("Order loading error.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, dispatch]);

  useEffect(() => {
    if (order?.client) {
      setEditedClientData({
        name: order.client.name,
        email: order.client.email,
        phone: order.client.phone,
        address: order.client.address
      });
    }
  }, [order?.client]);

  const handleCallClient = async () => {
    if (!order?.client.phone) return;
  
    try {
      const response = await axiosInstance.post("/api/twilio/call", { to: order.client.phone });
      const callSid = response.data.callSid;
  
      console.log("Звонок инициирован, CallSid:", callSid);
  
      setTimeout(async () => {
        try {
          const recordingRes = await axiosInstance.get(`/api/twilio/recording/${callSid}`);
          const mediaUrl = recordingRes.data.mediaUrl;
  
          console.log("Получен URL записи:", mediaUrl);
          
          await axiosInstance.post("/api/twilio/call/save-recording", {
            orderId: order.id,
            callSid: callSid,
          });
  
          setOrder({ ...order, callRecordingUrl: mediaUrl });
  
        } catch (error) {
          console.error("Ошибка при получении записи звонка:", error);
        }
      }, 30000);
  
    } catch (error) {
      console.error("Ошибка при совершении звонка:", error);
    }
  };

  const handleCreateTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim() || !taskDueDate || !order) return;

    const taskData = {
      title: taskTitle,
      description: taskDescription,
      endDate: new Date(taskDueDate),
      userName: order.users[0].username,
      orderId: order.id
    };

    await dispatch(createTask(taskData));
    setIsModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!order) return;
    
    try {
      setDeletingTaskIds(prev => [...prev, taskId]);
      await dispatch(deleteTask(taskId));
      setOrder({
        ...order,
        tasks: order.tasks.filter(task => task.id !== taskId)
      });
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    } finally {
      setDeletingTaskIds(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleEditTask = async () => {
    if (!editingTask || !order) return;
    
    try {
      setUpdatingTaskId(editingTask.id);
      
      await axiosInstance.put("/Task/change", {
        taskId: editingTask.id,
        description: editingTaskDescription,
        status: TaskStatus[editingTaskStatus]
      });

      // Обновляем локальное состояние
      setOrder({
        ...order,
        tasks: order.tasks.map(task =>
          task.id === editingTask.id
            ? { ...task, description: editingTaskDescription, status: editingTaskStatus }
            : task
        )
      });

      setIsEditTaskModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const openEditTaskModal = (task: typeof editingTask) => {
    setEditingTask(task);
    setEditingTaskDescription(task?.description || "");
    setEditingTaskStatus(task?.status || TaskStatus.New);
    setIsEditTaskModalOpen(true);
  };

  const handleClientDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedClientData({
      ...editedClientData,
      [e.target.name]: e.target.value
    });
  };

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };

  const formatPhoneNumberForDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length < 7) return phone;
    
    if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
    }
  };

  const handleSaveClientData = async () => {
    if (!order?.client) return;

    try {
      const formattedPhone = formatPhoneNumber(editedClientData.phone);
      
      const result = await dispatch(fetchChangeClientData({
        name: editedClientData.name,
        newEmail: editedClientData.email,
        oldEmail: order.client.email,
        phone: formattedPhone,
        address: editedClientData.address
      })).unwrap();

      if (result) {
        setOrder({
          ...order,
          client: {
            ...order.client,
            name: editedClientData.name,
            email: editedClientData.email,
            phone: editedClientData.phone,
            address: editedClientData.address
          }
        });
        setIsEditingClient(false);
      }
    } catch {
      console.error("Ошибка при обновлении данных клиента");
    }
  };

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrder(updatedOrder);
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
        <div className={`transition-all duration-300 flex mt-20 ml-5 w-full`}>
          <div className="min-w-96 bg-[#1a0b2e] p-6 rounded-lg shadow-md h-[calc(100vh-80px)]">
            <h2 className="text-lg font-semibold mb-4">
              Сделка #{order.id}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Бюджет: {order.totalAmount.toLocaleString('ru-RU')} ₽</p>
                  <p className="text-white font-medium">Статус: {OrderStatus[order.status]}</p>
                  <p className="text-white font-medium">Отв-ный: {order.users[0].username}</p>
                </div>
                <button
                  onClick={() => setIsOrderEditModalOpen(true)}
                  className="bg-primary-purple px-3 py-1 rounded text-sm"
                >
                  Изменить
                </button>
              </div>
            </h2>
            <div className="text-gray-300">
              {isEditingClient ? (
                <div className="space-y-3">
                  {[
                    { label: "Client", name: "name" },
                    { label: "Email", name: "email" },
                    { label: "Phone", name: "phone" },
                    { label: "Address", name: "address" }
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <label className="text-sm text-white font-medium mb-1">{field.label}:</label>
                      <input
                        type="text"
                        name={field.name}
                        value={editedClientData[field.name as keyof typeof editedClientData]}
                        onChange={handleClientDataChange}
                        className="bg-[#2a1042] text-white px-2 py-1 rounded w-full"
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSaveClientData}
                      className="bg-primary-purple px-4 py-2 rounded text-white flex-1"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingClient(false);
                        setEditedClientData({
                          name: order.client.name,
                          email: order.client.email,
                          phone: order.client.phone,
                          address: order.client.address
                        });
                      }}
                      className="bg-gray-600 px-4 py-2 rounded text-white flex-1"
                    >
                      Отменить
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <p><span className="text-white font-medium">Client:</span> {order.client.name}</p>
                    <button
                      onClick={() => setIsEditingClient(true)}
                      className="bg-primary-purple px-3 py-1 rounded text-sm"
                    >
                      Изменить
                    </button>
                  </div>
                  <p><span className="text-white font-medium">Email:</span> {order.client.email}</p>
                  <p><span className="text-white font-medium">Phone:</span> {formatPhoneNumberForDisplay(order.client.phone)}</p>
                  <p><span className="text-white font-medium">Address:</span> {order.client.address}</p>
                </>
              )}
            </div>
            <button 
              onClick={handleCallClient} 
              className="bg-primary-purple px-4 py-2 rounded text-white mt-4">
              Позвонить клиенту
            </button>
          </div>

          <div className="flex-1 flex flex-col px-6 w-screen">
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
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-400">Статус: {TaskStatus[task.status]}</p>
                          <p className="text-sm text-gray-400">Дедлайн: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditTaskModal(task)}
                            className={`${
                              updatingTaskId === task.id
                                ? "bg-purple-700"
                                : "bg-primary-purple hover:bg-purple-700"
                            } text-white px-3 py-1 rounded-md text-sm transition-colors flex items-center justify-center min-w-[80px]`}
                            disabled={updatingTaskId === task.id}
                          >
                            {updatingTaskId === task.id ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              "Изменить"
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className={`${
                              deletingTaskIds.includes(task.id)
                                ? "bg-red-700"
                                : "bg-red-600 hover:bg-red-700"
                            } text-white px-3 py-1 rounded-md text-sm transition-colors flex items-center justify-center min-w-[80px]`}
                            disabled={deletingTaskIds.includes(task.id)}
                          >
                            {deletingTaskIds.includes(task.id) ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              "Удалить"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Нет задач</p>
              )}
              {order.callRecordingUrl?.length != 0 && (
                <p>
                  <a href={order.callRecordingUrl} target="_blank" rel="noopener noreferrer">
                    Прослушать запись звонка
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isOrderEditModalOpen && order && (
        <OrderEditModal
          order={order}
          onClose={() => setIsOrderEditModalOpen(false)}
          onUpdate={handleOrderUpdate}
        />
      )}

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

      {isEditTaskModalOpen && editingTask && (
        <Modal onClose={() => setIsEditTaskModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Редактировать задачу</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Название</label>
            <p className="text-gray-300">{editingTask.title}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Описание</label>
            <textarea
              value={editingTaskDescription}
              onChange={(e) => setEditingTaskDescription(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded-md text-white"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Статус</label>
            <select
              value={editingTaskStatus}
              onChange={(e) => setEditingTaskStatus(Number(e.target.value) as TaskStatus)}
              className="w-full bg-gray-700 p-2 rounded-md text-white"
            >
              {Object.entries(TaskStatus)
                .filter(([key]) => !isNaN(Number(key)))
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditTaskModalOpen(false)}
              className="bg-gray-600 px-4 py-2 rounded text-white"
            >
              Отменить
            </button>
            <button
              onClick={handleEditTask}
              className="bg-primary-purple px-4 py-2 rounded text-white"
              disabled={updatingTaskId !== null}
            >
              {updatingTaskId === editingTask.id ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Сохранить"
              )}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderDetailsPage;

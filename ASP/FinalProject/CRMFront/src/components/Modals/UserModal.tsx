import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, fetchChangeUserData } from "../../features/user/userSlice";
import { User } from '../../types/User';
import { TaskStatus } from "../../types/Task";
import { OrderStatus } from "../../types/Order";
import { AppDispatch } from "../../store/store";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

interface FormData {
  username: string;
  email: string;
  userRole: 0 | 1;
}

const UserModal = ({ user, onClose }: UserModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: user.username,
    email: user.email,
    userRole: user.userRole === 0 ? 0 : 1
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      userRole: user.userRole
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'userRole') {
      const roleValue = Number(value) as 0 | 1;
      setFormData(prev => ({ ...prev, userRole: roleValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(fetchChangeUserData({
        username: formData.username,
        newEmail: formData.email,
        oldEmail: user.email,
        role: formData.userRole
      })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      dispatch(deleteUser(user.email));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
        <h2 className="text-2xl text-primary-purple mb-4">{isEditing ? "Редактировать пользователя" : "Информация о пользователе"}</h2>

        {!isEditing ? (
          <>
            <div className="mb-2">
              <label className="block text-sm">Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                disabled={true}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                disabled={true}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Роль</label>
              <input
                type="text"
                value={formData.userRole === 0 ? 'Администратор' : 'Менеджер'}
                disabled
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="mb-2">
              <label className="block text-sm">Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Роль</label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              >
                <option value={0}>Администратор</option>
                <option value={1}>Менеджер</option>
              </select>
            </div>
          </form>
        )}

        <h3 className="text-xl font-semibold mt-4">Заказы</h3>
        {user.orders && user.orders.length > 0 ? (
          <ul className="mt-2">
            {user.orders.map(order => (
              <li key={order.id} className="mb-2 p-2 bg-gray-700 rounded">
                <p>ID: {order.orderId}</p>
                <p>Бюджет: {order.totalAmount}</p>
                <p>Статус: {OrderStatus[order.status]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-2">Нет доступных заказов</p>
        )}

        <h3 className="text-xl font-semibold mt-4">Задачи</h3>
        {user.tasks && user.tasks.length > 0 ? (
          <ul className="mt-2">
            {user.tasks.map(task => (
              <li key={task.taskId} className="mb-2 p-2 bg-gray-700 rounded">
                <p>Название: {task.title}</p>
                <p>Описание: {task.description}</p>
                <p>Статус: {TaskStatus[task.status]}</p>
                <p>Дедлайн: {new Date(task.dueDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-2">Нет доступных задач</p>
        )}

        <button
          className="bg-primary-purple w-full py-2 rounded mt-4"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? "Сохранить" : "Редактировать"}
        </button>

        <button
          className="bg-red-600 w-full py-2 rounded mt-4"
          onClick={handleDelete}
        >
          Удалить пользователя
        </button>

        <button
          className="bg-gray-600 w-full py-2 rounded mt-4"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default UserModal;

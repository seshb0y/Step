import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, fetchChangeUserData } from "../../features/user/userSlice";
import { User } from "../../types/User";
import { TaskStatus } from "../../types/Task";
import { OrderStatus } from "../../types/Order";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal = ({ user, onClose }: UserModalProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  useEffect(() => {
    console.log("User data in modal:", user);
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(fetchChangeUserData({ 
      username: formData.username != undefined ? formData.username : user.username,
      newEmail: formData.email,
      oldEmail: user.email,
      role: formData.role as 0 | 1
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(deleteUser(user.email) as any);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
        <h2 className="text-2xl text-primary-purple mb-4">{isEditing ? "Edit User" : "User Details"}</h2>

        {/* Основная информация о пользователе */}
        <div className="mb-2">
          <label className="block text-sm">USERNAME</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">EMAIL</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            disabled={!isEditing}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">ROLE</label>
          <input
            type="text"
            name="role"
            value={user.role === 0 ? 'Admin' : 'Manager'}
            disabled={!isEditing}
            onChange={(e) => setFormData({ ...formData, role: e.target.value === 'Admin' ? 0 : 1 })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        {/* Список заказов */}
        <h3 className="text-xl font-semibold mt-4">Orders</h3>
        <ul className="list-disc ml-5">
          {user.orders && user.orders.length > 0 ? (
            user.orders.map((order) => (
              <li key={order.id}>Order ID: {order.orderId}, Status: {OrderStatus[order.orderStatus]}</li>
            ))
          ) : (
            <li>No orders available</li>
          )}
        </ul>

        {/* Список задач */}
        <h3 className="text-xl font-semibold mt-4">Tasks</h3>
        <ul className="list-disc ml-5">
          {user.tasks && user.tasks.length > 0 ? (
            user.tasks.map((task) => (
              <li key={task.taskId}>Task ID: {task.taskId}, Status: {TaskStatus[task.status]}</li>
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ul>

        {/* Список клиентов */}
        <h3 className="text-xl font-semibold mt-4">Clients</h3>
        <ul className="list-disc ml-5">
          {user.clients && user.clients.length > 0 ? (
            user.clients.map((client) => (
              <li key={client.id}>Client: {client.name}</li>
            ))
          ) : (
            <li>No clients available</li>
          )}
        </ul>

        {/* Кнопки управления */}
        <button className="bg-primary-purple w-full py-2 rounded mt-4" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="bg-red-600 w-full py-2 rounded mt-4" onClick={handleDelete}>
          Delete User
        </button>
        <button className="bg-gray-600 w-full py-2 rounded mt-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Order, OrderStatus } from '../../types/Order';
import { fetchChangeOrderData } from '../../features/orders/orderSlice';
import { toast } from 'react-toastify';
import Modal from '../ui/Modal';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAssignUserToOrder } from '../../features/orders/orderSlice';

interface OrderEditModalProps {
  order: Order;
  onClose: () => void;
  onUpdate: (updatedOrder: Order) => void;
}

const OrderEditModal = ({ order, onClose, onUpdate }: OrderEditModalProps) => {
  console.log("Order data in modal:", order);
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const [formData, setFormData] = useState({
    totalAmount: order.totalAmount.toString(),
    status: order.status,
    userId: order.users[0]?.userId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const numericBudget = parseFloat(formData.totalAmount.replace(/[^\d.-]/g, ''));
      
      if (isNaN(numericBudget)) {
        toast.error("Некорректное значение бюджета");
        return;
      }

      console.log("Отправляем данные заказа:", {
        totalAmount: numericBudget.toString(),
        status: formData.status,
        orderId: order.id
      });

      const result = await dispatch(fetchChangeOrderData({
        totalAmount: numericBudget.toString(),
        status: formData.status,
        orderId: order.id
      })).unwrap();

      if (formData.userId !== order.users[0]?.userId) {
        await dispatch(fetchAssignUserToOrder({
          orderId: order.id,
          userId: Number(formData.userId)
        }));
      }

      if (result) {
        const updatedUser = users.find(u => u.userId === formData.userId);
        onUpdate({
          ...order,
          totalAmount: numericBudget,
          status: formData.status,
          users: updatedUser ? [updatedUser] : order.users
        });
        onClose();
      }
    } catch {
      console.error("Ошибка при обновлении заказа");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl text-primary-purple mb-4">Редактировать заказ</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Бюджет</label>
          <input
            type="text"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Статус</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          >
            {Object.entries(OrderStatus)
              .filter(([key]) => !isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Ответственный</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          >
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded text-white"
          >
            Отменить
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary-purple px-4 py-2 rounded text-white"
          >
            Сохранить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderEditModal; 
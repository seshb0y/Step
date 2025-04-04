import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Order, OrderStatus } from '../../types/Order';
import { fetchChangeOrderData } from '../../features/orders/orderSlice';
import { toast } from 'react-toastify';
import Modal from '../ui/Modal';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAssignUserToOrder } from '../../features/orders/orderSlice';
import { fetchUsers } from '../../features/user/userSlice';

interface OrderEditModalProps {
  order: Order;
  onClose: () => void;
  onUpdate: (updatedOrder: Order) => void;
}

interface FormData {
  totalAmount: string;
  status: OrderStatus;
  userId: number;
}

const OrderEditModal = ({ order, onClose, onUpdate }: OrderEditModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  
  useEffect(() => {
    void dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState<FormData>({
    totalAmount: order.totalAmount.toString(),
    status: order.status,
    userId: Number(order.users[0]?.userId) || 0
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      userId: Number(order.users[0]?.userId) || 0
    }));
  }, [order.users]);

  const handleTotalAmountChange = (value: string) => {
    setFormData(prev => ({ ...prev, totalAmount: value }));
  };

  const handleStatusChange = (value: string) => {
    const status = parseInt(value) as OrderStatus;
    setFormData(prev => ({ ...prev, status }));
  };

  const handleUserChange = (value: string) => {
    const userId = parseInt(value);
    setFormData(prev => ({ ...prev, userId }));
  };

  const handleSubmit = async () => {
    try {
      const numericBudget = parseFloat(formData.totalAmount.replace(/[^\d.-]/g, ''));
      
      if (isNaN(numericBudget)) {
        toast.error("Некорректное значение бюджета");
        return;
      }

      const result = await dispatch(fetchChangeOrderData({
        totalAmount: numericBudget.toString(),
        status: formData.status,
        orderId: order.id
      })).unwrap();

      if (formData.userId !== Number(order.users[0]?.userId)) {
        await dispatch(fetchAssignUserToOrder({
          orderId: order.id,
          userId: formData.userId
        }));
      }

      if (result) {
        const updatedUser = users.find(u => Number(u.userId) === formData.userId);
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

  if (loading) {
    return (
      <Modal onClose={onClose}>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl text-primary-purple mb-4">Загрузка пользователей...</h2>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={onClose}>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl text-red-500 mb-4">Ошибка загрузки</h2>
          <p className="text-white">{error}</p>
        </div>
      </Modal>
    );
  }

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
            onChange={(e) => handleTotalAmountChange(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Статус</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
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
            onChange={(e) => handleUserChange(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          >
            {users && users.length > 0 ? (
              users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.username}
                </option>
              ))
            ) : (
              <option value="">Нет доступных пользователей</option>
            )}
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
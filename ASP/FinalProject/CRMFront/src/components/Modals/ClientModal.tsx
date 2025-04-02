import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { deleteClient, fetchChangeClientData } from "../../features/clients/clientSlice";
import { createOrder } from "../../features/orders/orderSlice";
import { Client } from "../../types/Client";
import { checkAuth } from "../../features/auth/authSlice";
import { fetchUsers } from "../../features/user/userSlice";

interface ClientModalProps {
  client: Client;
  onClose: () => void;
}

const ClientModal = ({ client, onClose }: ClientModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientLoading, clientError, clients } = useSelector((state: RootState) => state.clients);
  const { user } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Client>(client);

  const [newOrderData, setNewOrderData] = useState({
    totalAmount: "",
    userId: ""
  });

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

  useEffect(() => {
    const updatedClient = clients.find((c) => c.id === client.id);
    if (updatedClient) {
      setFormData(updatedClient);
    }
  }, [clients, client.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(
      fetchChangeClientData({
        name: formData.name,
        newEmail: formData.email,
        oldEmail: client.email,
        phone: formData.phone,
        address: formData.address,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteClient(client.email));
      onClose();
    }
  };

  const handleCreateOrder = async () => {
    if (!newOrderData.totalAmount) {
      alert("Введите сумму заказа");
      return;
    }

    if (!newOrderData.userId) {
      alert("Выберите ответственного");
      return;
    }
  
    try {
      const authResponse = await dispatch(checkAuth()).unwrap();
      const updatedUserEmail = authResponse?.email || user?.email || "";

  
      dispatch(
        createOrder({
          totalAmount: parseFloat(newOrderData.totalAmount),
          clientEmail: client.email,
          userEmail: updatedUserEmail,
          userId: Number(newOrderData.userId)
        })
      );
  
      setNewOrderData({ totalAmount: "", userId: "" });
  
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
    }
  };
  
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
        <h2 className="text-2xl text-primary-purple mb-4">
          {isEditing ? "Edit Client" : "Client Details"}
        </h2>

        {clientLoading && <p className="text-primary-purple">Loading data...</p>}
        {clientError && <p className="text-red-500">{clientError}</p>}

        {["name", "email", "phone", "address"].map((field) => (
          <div key={field} className="mb-2">
            <label className="block text-sm">{field.toUpperCase()}</label>
            <input
              type="text"
              name={field}
              value={String(formData[field as keyof Client] ?? "")}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            />
          </div>
        ))}

        {/* Поле ввода для суммы заказа */}
        <div className="mb-2">
          <label className="block text-sm">Total Amount</label>
          <input
            type="text"
            name="totalAmount"
            value={newOrderData.totalAmount}
            onChange={(e) =>
              setNewOrderData({ ...newOrderData, totalAmount: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        {/* Выбор ответственного */}
        <div className="mb-2">
          <label className="block text-sm">Ответственный</label>
          <select
            name="userId"
            value={newOrderData.userId}
            onChange={(e) =>
              setNewOrderData({ ...newOrderData, userId: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          >
            <option value="">Выберите ответственного</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка создания заказа */}
        <button className="bg-primary-purple w-full py-2 rounded mt-4" onClick={handleCreateOrder}>
          Create Order
        </button>

        <button
          className="bg-primary-purple w-full py-2 rounded mt-4"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          className="bg-red-600 w-full py-2 rounded mt-4"
          onClick={handleDelete}
        >
          Delete Client
        </button>

        <button className="bg-gray-600 w-full py-2 rounded mt-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ClientModal;

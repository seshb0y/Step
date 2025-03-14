import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteClient, fetchAddClientData, fetchChangeClientData } from "../../features/clients/clientSlice";
import { Client } from "../../types/Client";

interface ClientModalProps {
  client: Client;
  onClose: () => void;
}

const ClientModal = ({ client, onClose }: ClientModalProps) => {
  const dispatch = useDispatch();
  const { clientLoading, clientError, clients } = useSelector((state: RootState) => state.clients);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Client>(client);

  useEffect(() => {
    if (!client.orders || client.orders.length === 0 || !client.users || client.users.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchAddClientData({ email: client.email }) as any);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client.email, dispatch]);

  useEffect(() => {
    const updatedClient = clients.find(c => c.id === client.id);
    if (updatedClient) {
      setFormData(updatedClient);
    }
  }, [clients, client.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(fetchChangeClientData({ 
      name: formData.clientName, 
      newEmail: formData.email, 
      oldEmail: client.email,
      phone: formData.phone, 
      address: formData.address 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(deleteClient(client.email) as any);
      onClose();
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

        <button 
          className="bg-primary-purple w-full py-2 rounded mt-4" 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="bg-red-600 w-full py-2 rounded mt-4" onClick={handleDelete}>
          Delete Client
        </button>
        <button className="bg-gray-600 w-full py-2 rounded mt-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ClientModal;

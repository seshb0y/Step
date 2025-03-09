import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../features/clients/clientSlice";
import { RootState } from "../../store/store";

interface ClientCreateModalProps {
  onClose: () => void;
}

const ClientCreateModal = ({ onClose }: ClientCreateModalProps) => {
  const dispatch = useDispatch();
  const { clientCreating, clientCreateError } = useSelector((state: RootState) => state.clients);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(createClient(formData) as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[400px]">
        <h2 className="text-2xl text-primary-purple mb-4">Add New Client</h2>

        {clientCreating && <p className="text-primary-purple">Creating client...</p>}
        {clientCreateError && <p className="text-red-500">{clientCreateError}</p>}

        {["name", "email", "phone", "address"].map((field) => (
          <div key={field} className="mb-2">
            <label className="block text-sm">{field.toUpperCase()}</label>
            <input
              type="text"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            />
          </div>
        ))}

        <button className="bg-primary-purple w-full py-2 rounded mt-4" onClick={handleSave}>
          Save
        </button>
        <button className="bg-gray-600 w-full py-2 rounded mt-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ClientCreateModal;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

interface UserCreateModalProps {
  onClose: () => void;
}

const UserCreateModal = ({ onClose }: UserCreateModalProps) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(createUser(formData) as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[400px]">
        <h2 className="text-2xl text-primary-purple mb-4">Add New User</h2>

        {["username", "email", "password", "role"].map((field) => (
          <input key={field} name={field} value={formData[field as keyof typeof formData]} onChange={handleChange} />
        ))}

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserCreateModal;

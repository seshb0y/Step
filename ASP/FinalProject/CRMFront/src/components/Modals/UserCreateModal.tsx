import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/user/userSlice";
import { RootState } from "../../store/store";

interface UserCreateModalProps {
  onClose: () => void;
}

const UserCreateModal = ({ onClose }: UserCreateModalProps) => {
  const dispatch = useDispatch();
  const { userCreating, userCreateError } = useSelector((state: RootState) => state.users);

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

        {userCreating && <p className="text-primary-purple">Creating user...</p>}
        {userCreateError && <p className="text-red-500">{userCreateError}</p>}

        {["username", "email", "password", "confirmPassword"].map((field) => (
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

export default UserCreateModal;

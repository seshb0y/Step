import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, checkAuth } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      await dispatch(checkAuth());
      navigate("/");
    } catch (error) {
      alert("Error!");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Authorization</h2>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
        Enter
      </button>
    </div>
  );
};

export default Login;

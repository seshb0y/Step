import { useState } from "react";
import { loginUser, checkAuth } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Lottie from "lottie-react";
import eyeAnimation from "../assets/Login.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      await dispatch(checkAuth());
      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error data!",);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 text-white">
    <div className="relative w-40 h-40">
      <Lottie animationData={eyeAnimation} loop={true} />
    </div>


      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="text"
            placeholder="your@email.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsTypingPassword(e.target.value.length > 0);
            }}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400"
          />
        </div>

        <button
          onClick={() => handleLogin()}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

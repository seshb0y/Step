import { useState } from "react";
import { loginUser, checkAuth } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      await dispatch(checkAuth());
    //   navigate("/");
    } catch (error) {
      alert("Error data!");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      {/* Йети */}
      <div className="relative mb-6">
          <motion.svg
            className="w-40 h-40"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
                <linearGradient id="yetiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#111827" /> 
                    <stop offset="100%" stopColor="#581c87" /> 
                </linearGradient>
            </defs>
            {/* Тело */}
            <circle cx="100" cy="100" r="80" fill="url(#yetiGradient)" stroke="black" strokeWidth="4" />

            {/* Глаза */}
            <motion.circle
              cx="70"
              cy="85"
              r="8"
              fill="black"
              animate={{ opacity: isTypingPassword ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.circle
              cx="130"
              cy="85"
              r="8"
              fill="black"
              animate={{ opacity: isTypingPassword ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />

            {/* Руки закрывают глаза */}
            <motion.ellipse
                cx="70" cy="70" 
                rx="15" ry="10"
                fill="black"
                stroke="black" strokeWidth="4"
                animate={{ cy: isTypingPassword ? 85 : 70 }} // Двигаем вниз
                transition={{ duration: 0.2 }}
            />
            <motion.rect
              x="85" y="74"
              width="30" height="1"
              fill="black"
              stroke="black" strokeWidth="4"
              animate={{ y: isTypingPassword ? 10 : -5 }}
              transition={{ duration: 0.2 }}
            />
            <motion.ellipse
                cx="130" cy="70" 
                rx="15" ry="10"
                fill="black"
                stroke="black" strokeWidth="4"
                animate={{ cy: isTypingPassword ? 85 : 70 }}
                transition={{ duration: 0.2 }}
            />

            {/* Рот */}
            <path d="M80 120 Q100 140 120 120" stroke="black" strokeWidth="4" fill="none" />
          </motion.svg>
        </div>

      {/* Форма входа */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        {/* Поле логина */}
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

        {/* Поле пароля */}
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

        {/* Кнопка входа */}
        <button
          onClick={() => console.log("Login...")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

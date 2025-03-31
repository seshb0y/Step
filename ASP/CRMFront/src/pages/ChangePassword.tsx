import { useState, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Lottie from "lottie-react";
import eyeAnimation from "../assets/Login.json";
import axiosInstance from "../api/axiosInstance";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Отсутствует токен для смены пароля");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Пароль должен содержать минимум 6 символов");
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.post("/Account/ChangePassword", {
        newPassword,
        token
      });
      
      toast.success("Пароль успешно изменен");
      navigate("/");
    } catch {
      toast.error("Ошибка при смене пароля. Возможно, ссылка устарела или недействительна");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <div className="bg-dark-card p-8 rounded-xl border border-dark-border shadow-xl">
          <h2 className="text-xl font-bold text-text-light mb-4">Ошибка</h2>
          <p className="text-gray-400">Недействительная ссылка для смены пароля</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      <div className="relative w-40 h-40">
        <Lottie animationData={eyeAnimation} loop={true} />
      </div>

      <div className="bg-dark-card p-8 rounded-xl border border-dark-border shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-text-light text-center">
          Смена пароля
        </h2>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Новый пароль</label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-dark-bg border border-dark-border focus:outline-none focus:border-primary-purple"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Подтвердите пароль</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-dark-bg border border-dark-border focus:outline-none focus:border-primary-purple"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-primary-purple hover:bg-accent-purple text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? "Сохранение..." : "Сохранить новый пароль"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword; 
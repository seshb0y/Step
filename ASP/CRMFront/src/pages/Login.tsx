import { useState, ChangeEvent } from "react";
import { loginUser, checkAuth, resetPassword } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Lottie from "lottie-react";
import eyeAnimation from "../assets/Login.json";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await dispatch(loginUser({ username, password })).unwrap();
      await dispatch(checkAuth());
      navigate("/dashboard");
    } catch {
      toast.error("Неверные данные для входа");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      await dispatch(resetPassword({ username: resetUsername })).unwrap();
      setIsResetModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch {
      toast.error("Ошибка при отправке запроса на сброс пароля");
    } finally {
      setIsLoading(false);
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
          <label className="block text-gray-400 mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition-all disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="w-full mt-4 text-gray-400 hover:text-white transition-colors"
        >
          Reset Password
        </button>
      </div>

      <Dialog.Root open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-card p-6 rounded-xl w-96 border border-dark-border shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-4 text-text-light">
              Reset Password
            </Dialog.Title>
            <Dialog.Description className="text-gray-400 mb-6">
              Enter your username to receive password reset instructions
            </Dialog.Description>
            <input
              type="text"
              placeholder="Enter username"
              value={resetUsername}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setResetUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-dark-bg border border-dark-border focus:outline-none focus:border-primary-purple mb-6"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-dark-border hover:bg-dark-bg transition-colors text-gray-400 hover:text-text-light"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="px-6 py-2 rounded-lg bg-primary-purple hover:bg-accent-purple transition-colors text-white font-medium disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-card p-6 rounded-xl w-96 border border-dark-border shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-4 text-text-light">
              Success!
            </Dialog.Title>
            <Dialog.Description className="text-gray-400 mb-6">
              Password reset instructions have been sent to your email
            </Dialog.Description>
            <div className="flex justify-end">
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-primary-purple hover:bg-accent-purple transition-colors text-white font-medium"
              >
                OK
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Login;

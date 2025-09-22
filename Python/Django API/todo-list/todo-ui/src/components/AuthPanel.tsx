import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/auth.store';
import { useUIStore } from '../store/ui.store';
import { useLogin, useRegister } from '../hooks/useAuth';
import { LoginData, RegisterData } from '../types/auth';

const loginSchema = z.object({
  username: z.string().min(1, 'Имя пользователя обязательно'),
  password: z.string().min(1, 'Пароль обязателен'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  password_confirm: z.string(),
}).refine((data) => data.password === data.password_confirm, {
  message: 'Пароли не совпадают',
  path: ['password_confirm'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const AuthPanel = () => {
  const { user, logout } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const [isLogin, setIsLogin] = useState(true);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data as LoginData);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data as RegisterData);
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Привет, {user.username}!
        </span>
        <button
          onClick={logout}
          className="btn btn-secondary"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => openAuthModal('login')}
        className="btn btn-primary"
      >
        Войти
      </button>
      <button
        onClick={() => openAuthModal('register')}
        className="btn btn-secondary"
      >
        Регистрация
      </button>
    </div>
  );
};

export const AuthModal = () => {
  const { isAuthModalOpen, authModalType, closeAuthModal } = useUIStore();
  const [isLogin, setIsLogin] = useState(authModalType === 'login');

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data as LoginData, {
      onSuccess: () => {
        closeAuthModal();
        loginForm.reset();
      },
    });
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data as RegisterData, {
      onSuccess: () => {
        closeAuthModal();
        registerForm.reset();
      },
    });
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h2>
          <button
            onClick={closeAuthModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Имя пользователя
              </label>
              <input
                {...loginForm.register('username')}
                className="input"
                placeholder="Введите имя пользователя"
              />
              {loginForm.formState.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Пароль
              </label>
              <input
                {...loginForm.register('password')}
                type="password"
                className="input"
                placeholder="Введите пароль"
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="btn btn-primary w-full"
            >
              {loginMutation.isPending ? 'Вход...' : 'Войти'}
            </button>

            {loginMutation.error && (
              <p className="text-red-500 text-sm text-center">
                Ошибка входа. Проверьте данные.
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Имя пользователя
              </label>
              <input
                {...registerForm.register('username')}
                className="input"
                placeholder="Введите имя пользователя"
              />
              {registerForm.formState.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                {...registerForm.register('email')}
                type="email"
                className="input"
                placeholder="Введите email"
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Пароль
              </label>
              <input
                {...registerForm.register('password')}
                type="password"
                className="input"
                placeholder="Введите пароль"
              />
              {registerForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Подтвердите пароль
              </label>
              <input
                {...registerForm.register('password_confirm')}
                type="password"
                className="input"
                placeholder="Подтвердите пароль"
              />
              {registerForm.formState.errors.password_confirm && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.password_confirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="btn btn-primary w-full"
            >
              {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>

            {registerMutation.error && (
              <p className="text-red-500 text-sm text-center">
                Ошибка регистрации. Проверьте данные.
              </p>
            )}
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};


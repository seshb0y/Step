import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/auth.store';
import { LoginData, RegisterData } from '../types/auth';

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response) => {
      login(response.user, response.access, response.refresh);
    },
  });
};

export const useRegister = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (response) => {
      login(response.user, response.access, response.refresh);
    },
  });
};


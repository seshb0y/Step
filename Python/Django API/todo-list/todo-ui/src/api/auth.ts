import { http } from './http';
import { AuthResponse, LoginData, RegisterData, User } from '../types/auth';

export const authApi = {
  // Регистрация
  register: (data: RegisterData): Promise<AuthResponse> => {
    return http.post('/auth/register/', data).then(response => response.data);
  },

  // Вход
  login: (data: LoginData): Promise<AuthResponse> => {
    return http.post('/auth/login/', data).then(response => response.data);
  },

  // Обновление токена
  refreshToken: (refreshToken: string): Promise<{ access: string }> => {
    return http.post('/auth/refresh/', { refresh: refreshToken }).then(response => response.data);
  },

  // Получение профиля пользователя
  getProfile: (): Promise<User> => {
    return http.get('/auth/profile/').then(response => response.data);
  },
};


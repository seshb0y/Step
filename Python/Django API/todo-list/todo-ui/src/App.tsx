import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/auth.store';
import { useUIStore } from './store/ui.store';
import { Home } from './pages/Home';
import { AuthModal } from './components/AuthPanel';

// Добавляем обработку ошибок
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { setTheme } = useUIStore();

  // Ждем гидратации Zustand persist
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Инициализация темы при загрузке
  useEffect(() => {
    if (!isHydrated) return;
    
    const savedTheme = localStorage.getItem('ui-storage');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        if (parsed.state?.theme) {
          setTheme(parsed.state.theme);
        }
      } catch (error) {
        console.error('Error parsing saved theme:', error);
      }
    }
  }, [setTheme, isHydrated]);

  // Проверка токена при загрузке
  useEffect(() => {
    if (!isHydrated) return;
    
    const token = localStorage.getItem('access_token');
    if (token && !isAuthenticated) {
      // Можно добавить проверку токена на сервере
      // Пока просто считаем, что если токен есть, то пользователь авторизован
    }
  }, [isAuthenticated, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Home />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

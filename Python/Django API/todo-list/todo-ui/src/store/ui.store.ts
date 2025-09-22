import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TaskStatus } from '../types/task';

interface UIState {
  theme: 'light' | 'dark';
  taskFilter: TaskStatus;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'register';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setTaskFilter: (filter: TaskStatus) => void;
  openAuthModal: (type: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      taskFilter: 'all',
      isAuthModalOpen: false,
      authModalType: 'login',

      setTheme: (theme) => {
        set({ theme });
        // Применяем тему к документу только на клиенте
        if (typeof window !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      setTaskFilter: (filter) => {
        console.log('UIStore - изменение фильтра на:', filter);
        set({ taskFilter: filter });
      },

      openAuthModal: (type) => {
        set({ isAuthModalOpen: true, authModalType: type });
      },

      closeAuthModal: () => {
        set({ isAuthModalOpen: false });
      },
    }),
    {
      name: 'ui-storage',
    }
  )
);

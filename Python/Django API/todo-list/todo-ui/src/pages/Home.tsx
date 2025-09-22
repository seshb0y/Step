import { useAuthStore } from '../store/auth.store';
import { ThemeToggle } from '../components/ThemeToggle';
import { AuthPanel } from '../components/AuthPanel';
import { TaskForm } from '../components/TaskForm';
import { FilterTabs } from '../components/FilterTabs';
import { TaskList } from '../components/TaskList';

export const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  console.log('Home render - isAuthenticated:', isAuthenticated, 'user:', user);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Todo List
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <AuthPanel />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                Вы авторизованы как: {user?.username || user?.email}
              </p>
            </div>
            
            {/* Add Task Form */}
            <TaskForm />

            {/* Filter Tabs */}
            <FilterTabs />

            {/* Task List */}
            <TaskList />
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="card p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Добро пожаловать в Todo List!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Войдите в систему или зарегистрируйтесь, чтобы начать управлять своими задачами.
              </p>
              <AuthPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

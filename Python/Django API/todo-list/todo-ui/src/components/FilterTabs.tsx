import { useUIStore } from '../store/ui.store';
import { TaskStatus } from '../types/task';

const filters: { key: TaskStatus; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'todo', label: 'Невыполненные' },
  { key: 'done', label: 'Выполненные' },
];

export const FilterTabs = () => {
  const { taskFilter, setTaskFilter } = useUIStore();

  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => setTaskFilter(filter.key)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            taskFilter === filter.key
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};


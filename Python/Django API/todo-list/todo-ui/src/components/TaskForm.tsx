import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { useCreateTask } from '../hooks/useTasks';
import { CreateTaskData } from '../types/task';

const taskSchema = z.object({
  title: z.string().min(1, 'Название задачи не может быть пустым'),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const TaskForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const createTaskMutation = useCreateTask();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    console.log('TaskForm - создание задачи:', data);
    createTaskMutation.mutate(data as CreateTaskData, {
      onSuccess: (newTask) => {
        console.log('TaskForm - задача успешно создана:', newTask);
        form.reset();
        setIsExpanded(false);
      },
      onError: (error) => {
        console.error('TaskForm - ошибка создания задачи:', error);
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="card p-4">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить задачу</span>
        </button>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...form.register('title')}
              className="input"
              placeholder="Введите название задачи..."
              autoFocus
              onKeyPress={handleKeyPress}
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="btn btn-primary flex-1"
            >
              {createTaskMutation.isPending ? 'Добавление...' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                form.reset();
              }}
              className="btn btn-secondary"
            >
              Отмена
            </button>
          </div>

          {createTaskMutation.error && (
            <p className="text-red-500 text-sm">
              Ошибка при добавлении задачи
            </p>
          )}
        </form>
      )}
    </div>
  );
};

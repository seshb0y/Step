import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
import { Task, CreateTaskData, UpdateTaskData, ReorderTaskData, TaskStatus } from '../types/task';

export const useTasks = (status: TaskStatus = 'all') => {
  const query = useQuery({
    queryKey: ['tasks', status],
    queryFn: async () => {
      console.log('useTasks - запрос задач со статусом:', status);
      try {
        const result = await tasksApi.getTasks(status);
        console.log('useTasks - результат API:', result);
        return result;
      } catch (error) {
        console.error('useTasks - ошибка API:', error);
        throw error;
      }
    },
  });
  
  console.log('useTasks - query result:', query.data);
  console.log('useTasks - query status:', query.status);
  console.log('useTasks - query isSuccess:', query.isSuccess);
  
  return query;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => tasksApi.createTask(data),
    onSuccess: (newTask) => {
      console.log('useCreateTask - задача создана:', newTask);
      
      // Проверяем текущий кэш
      const currentCache = queryClient.getQueryData(['tasks', 'all']);
      console.log('useCreateTask - текущий кэш all:', currentCache);
      
      // Принудительно обновляем все запросы задач
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      // Обновляем кэш для всех статусов
      ['all', 'done', 'todo'].forEach(status => {
        queryClient.setQueryData(['tasks', status], (oldData: any) => {
          // Проверяем, что oldData - это массив (не пагинированный объект)
          if (Array.isArray(oldData)) {
            const updated = [...oldData, newTask];
            console.log(`useCreateTask - обновлен кэш для ${status}:`, updated);
            return updated;
          }
          // Если oldData - это пагинированный объект, обновляем results
          if (oldData && Array.isArray(oldData.results)) {
            const updated = {
              ...oldData,
              results: [...oldData.results, newTask],
              count: oldData.count + 1
            };
            console.log(`useCreateTask - обновлен кэш для ${status} (пагинация):`, updated);
            return updated;
          }
          return [newTask];
        });
      });
      
      // Проверяем кэш после обновления
      const updatedCache = queryClient.getQueryData(['tasks', 'all']);
      console.log('useCreateTask - кэш после обновления all:', updatedCache);
      
      // Принудительно перезагружаем данные
      queryClient.refetchQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('useCreateTask - ошибка создания задачи:', error);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskData }) =>
      tasksApi.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useReorderTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReorderTaskData[]) => tasksApi.reorderTasks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

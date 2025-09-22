import { http } from './http';
import { Task, CreateTaskData, UpdateTaskData, ReorderTaskData, TaskStatus } from '../types/task';

export const tasksApi = {
  // Получить список задач
  getTasks: (status: TaskStatus = 'all'): Promise<Task[]> => {
    console.log('API - запрос задач со статусом:', status);
    return http.get(`/tasks/?status=${status}`).then(response => {
      console.log('API - ответ getTasks:', response.data);
      // Возвращаем только массив results из пагинированного ответа
      return response.data.results || [];
    });
  },

  // Создать новую задачу
  createTask: (data: CreateTaskData): Promise<Task> => {
    console.log('API - создание задачи:', data);
    return http.post('/tasks/', data).then(response => {
      console.log('API - ответ createTask:', response.data);
      return response.data;
    });
  },

  // Обновить задачу
  updateTask: (id: number, data: UpdateTaskData): Promise<Task> => {
    return http.patch(`/tasks/${id}/`, data).then(response => response.data);
  },

  // Удалить задачу
  deleteTask: (id: number): Promise<void> => {
    return http.delete(`/tasks/${id}/`).then(() => undefined);
  },

  // Изменить порядок задач
  reorderTasks: (data: ReorderTaskData[]): Promise<Task[]> => {
    return http.patch('/tasks/reorder/', data).then(response => response.data);
  },
};

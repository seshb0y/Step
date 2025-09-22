# src/hooks/useTasks.ts

## Назначение
Кастомные React хуки для работы с API задач. Обеспечивают кэширование, оптимистичные обновления и синхронизацию состояния между компонентами.

## Контекст и зависимости
- **@tanstack/react-query** - для управления серверным состоянием
- **tasksApi** - функции для работы с API
- **Task, CreateTaskData, UpdateTaskData, ReorderTaskData, TaskStatus** - TypeScript типы

## Пошаговое объяснение кода

### 1. Импорты
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
import { Task, CreateTaskData, UpdateTaskData, ReorderTaskData, TaskStatus } from '../types/task';
```
Импортируем необходимые хуки из React Query и API функции.

### 2. Хук для получения списка задач
```typescript
export const useTasks = (status: TaskStatus = 'all') => {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: () => tasksApi.getTasks(status),
  });
};
```
- **queryKey**: Уникальный ключ для кэширования, включает статус фильтрации
- **queryFn**: Функция для получения данных с сервера
- **status**: Параметр фильтрации (all, done, todo)

### 3. Хук для создания задачи
```typescript
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => tasksApi.createTask(data),
    onSuccess: () => {
      // Инвалидируем все запросы задач
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```
- **mutationFn**: Функция для создания задачи
- **onSuccess**: После успешного создания инвалидируем кэш
- **invalidateQueries**: Принудительно обновляем все запросы с ключом 'tasks'

### 4. Хук для обновления задачи
```typescript
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
```
- **mutationFn**: Принимает ID задачи и данные для обновления
- **onSuccess**: Инвалидируем кэш после успешного обновления

### 5. Хук для удаления задачи
```typescript
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```
- **mutationFn**: Принимает только ID задачи для удаления
- **onSuccess**: Инвалидируем кэш после удаления

### 6. Хук для изменения порядка задач
```typescript
export const useReorderTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReorderTaskData[]) => tasksApi.reorderTasks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```
- **mutationFn**: Принимает массив объектов с ID и новым порядком
- **onSuccess**: Инвалидируем кэш после изменения порядка

## Как протестировать
1. Используйте хук в компоненте:
```typescript
const { data: tasks, isLoading, error } = useTasks('all');
const createTask = useCreateTask();

// Создание задачи
createTask.mutate({ title: 'Новая задача' });
```

2. Проверьте состояние загрузки и ошибок:
```typescript
if (isLoading) return <div>Загрузка...</div>;
if (error) return <div>Ошибка: {error.message}</div>;
```

## Частые ошибки и как их избежать
- **Кэш не обновляется**: Убедитесь, что queryKey одинаковый во всех местах
- **Дублирование запросов**: Проверьте, что не вызываете useQuery в цикле
- **Ошибки типизации**: Убедитесь, что передаете правильные типы данных

## Почему выбрано именно так
- **React Query**: Автоматическое кэширование, синхронизация и оптимизация запросов
- **Инвалидация кэша**: Обеспечивает актуальность данных после изменений
- **Типизация**: Предотвращает ошибки на этапе компиляции
- **Разделение логики**: Каждый хук отвечает за одну операцию


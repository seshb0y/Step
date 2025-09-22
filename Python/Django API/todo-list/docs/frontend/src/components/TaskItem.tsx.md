# src/components/TaskItem.tsx

## Назначение
React компонент для отображения отдельной задачи с возможностью редактирования, удаления, переключения статуса выполнения и drag & drop функциональностью.

## Контекст и зависимости
- **React 18** - UI библиотека
- **@dnd-kit/sortable** - для drag & drop функциональности
- **@dnd-kit/utilities** - утилиты для DnD
- **lucide-react** - иконки
- **useUpdateTask, useDeleteTask** - хуки для API операций
- **Task** - TypeScript интерфейс задачи

## Пошаговое объяснение кода

### 1. Импорты и интерфейс
```typescript
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Trash2, GripVertical } from 'lucide-react';
import { Task } from '../types/task';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
}
```
Импортируем необходимые зависимости и определяем пропсы компонента.

### 2. Состояние компонента
```typescript
const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(task.title);
```
- **isEditing**: Флаг режима редактирования
- **editTitle**: Временное значение для редактируемого названия

### 3. Drag & Drop настройка
```typescript
const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
} = useSortable({ id: task.id });

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};
```
Настраиваем drag & drop с помощью хука useSortable из @dnd-kit.

### 4. Обработчики событий

#### Переключение статуса выполнения
```typescript
const handleToggleComplete = () => {
  updateTaskMutation.mutate({
    id: task.id,
    data: { is_completed: !task.is_completed },
  });
};
```

#### Удаление задачи
```typescript
const handleDelete = () => {
  if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
    deleteTaskMutation.mutate(task.id);
  }
};
```

#### Редактирование названия
```typescript
const handleEdit = () => {
  if (editTitle.trim() && editTitle !== task.title) {
    updateTaskMutation.mutate({
      id: task.id,
      data: { title: editTitle.trim() },
    });
  }
  setIsEditing(false);
};
```

#### Обработка клавиатуры
```typescript
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleEdit();
  } else if (e.key === 'Escape') {
    setEditTitle(task.title);
    setIsEditing(false);
  }
};
```

### 5. JSX структура
```jsx
<div
  ref={setNodeRef}
  style={style}
  className={`card p-4 flex items-center gap-3 group ${
    isDragging ? 'opacity-50' : ''
  } ${task.is_completed ? 'opacity-75' : ''}`}
>
```

#### Drag Handle
```jsx
<div
  {...attributes}
  {...listeners}
  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
>
  <GripVertical className="w-4 h-4" />
</div>
```

#### Чекбокс выполнения
```jsx
<button
  onClick={handleToggleComplete}
  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
    task.is_completed
      ? 'bg-primary-600 border-primary-600 text-white'
      : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
  }`}
>
  {task.is_completed && <Check className="w-3 h-3" />}
</button>
```

#### Контент задачи
```jsx
<div className="flex-1 min-w-0">
  {isEditing ? (
    <input
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      onBlur={handleEdit}
      onKeyPress={handleKeyPress}
      className="w-full bg-transparent border-none outline-none text-sm"
      autoFocus
    />
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className={`text-sm cursor-text ${
        task.is_completed
          ? 'line-through text-gray-500 dark:text-gray-400'
          : 'text-gray-900 dark:text-gray-100'
      }`}
    >
      {task.title}
    </div>
  )}
</div>
```

## Как протестировать
1. Создайте задачу через форму
2. Попробуйте переключить статус выполнения кликом по чекбоксу
3. Кликните по названию для редактирования
4. Попробуйте удалить задачу
5. Перетащите задачу для изменения порядка

## Частые ошибки и как их избежать
- **DnD не работает**: Убедитесь, что компонент обернут в DndContext
- **Редактирование не сохраняется**: Проверьте обработчики onBlur и onKeyPress
- **Стили не применяются**: Проверьте правильность классов Tailwind

## Почему выбрано именно так
- **Inline редактирование**: Удобнее для пользователя, чем отдельная форма
- **Drag handle**: Четко показывает, что элемент можно перетаскивать
- **Оптимистичные обновления**: Лучший UX при работе с API
- **Клавиатурные сокращения**: Enter для сохранения, Escape для отмены


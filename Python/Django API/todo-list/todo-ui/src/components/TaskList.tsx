import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { useTasks, useReorderTasks } from '../hooks/useTasks';
import { useUIStore } from '../store/ui.store';

export const TaskList = () => {
  const { taskFilter } = useUIStore();
  const { data: tasksData, isLoading, error } = useTasks(taskFilter);
  const reorderTasksMutation = useReorderTasks();
  
  // Убеждаемся, что tasks - это массив
  // Если tasksData - это пагинированный объект, берем results
  const tasks = Array.isArray(tasksData) 
    ? tasksData 
    : (tasksData && Array.isArray(tasksData.results) ? tasksData.results : []);
  
  // Отладочная информация
  console.log('TaskList - tasksData:', tasksData);
  console.log('TaskList - tasks:', tasks);
  console.log('TaskList - isLoading:', isLoading);
  console.log('TaskList - error:', error);
  console.log('TaskList - taskFilter:', taskFilter);
  console.log('TaskList - tasks.length:', tasks.length);
  console.log('TaskList - Array.isArray(tasksData):', Array.isArray(tasksData));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
    
    // Создаем данные для обновления порядка
    const reorderData = reorderedTasks.map((task, index) => ({
      id: task.id,
      order: index,
    }));

    reorderTasksMutation.mutate(reorderData);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 text-center">
        <p className="text-red-500">Ошибка загрузки задач</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {taskFilter === 'all' && 'Нет задач'}
          {taskFilter === 'todo' && 'Нет невыполненных задач'}
          {taskFilter === 'done' && 'Нет выполненных задач'}
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

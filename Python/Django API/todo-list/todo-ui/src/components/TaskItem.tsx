import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Trash2, GripVertical } from 'lucide-react';
import { Task } from '../types/task';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

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

  const handleToggleComplete = () => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { is_completed: !task.is_completed },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteTaskMutation.mutate(task.id);
    }
  };

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTaskMutation.mutate({
        id: task.id,
        data: { title: editTitle.trim() },
      });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card p-4 flex items-center gap-3 group ${
        isDragging ? 'opacity-50' : ''
      } ${task.is_completed ? 'opacity-75' : ''}`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Checkbox */}
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

      {/* Task Content */}
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

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleDelete}
          disabled={deleteTaskMutation.isPending}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Удалить задачу"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


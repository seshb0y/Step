import { Priority, Task } from '@prisma/client';
import PriorityButton from '@/components/PriorityButton';
import ActionButton from '@/components/ActionButton';

interface TaskItemProps {
  task: Task;
  isLoading: boolean;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onChangePriority: (id: number, priority: Priority) => void;
}

const TaskItem = ({ task, isLoading, onComplete, onDelete, onChangePriority }: TaskItemProps) => {
  const getBackgroundColor = (priority: Priority) => {
    switch (priority) {
      case Priority.LOW:
        return 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-400/30 shadow-green-400/20';
      case Priority.MEDIUM:
        return 'bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border-yellow-400/30 shadow-yellow-400/20';
      case Priority.HIGH:
        return 'bg-gradient-to-r from-red-900/40 to-pink-900/40 border-red-400/30 shadow-red-400/20';
      default:
        return 'bg-gradient-to-r from-gray-900/40 to-slate-900/40 border-gray-400/30 shadow-gray-400/20';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.LOW:
        return 'text-green-400 bg-green-900/60 border-green-400/30';
      case Priority.MEDIUM:
        return 'text-yellow-400 bg-yellow-900/60 border-yellow-400/30';
      case Priority.HIGH:
        return 'text-red-400 bg-red-900/60 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-900/60 border-gray-400/30';
    }
  };

  const formatDate = (timeString: string | Date) => {
    const date = new Date(timeString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  };

  const formattedDate = formatDate(task.time);

  return (
    <div
      className={`p-8 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${getBackgroundColor(task.priority)} backdrop-blur-sm ${isLoading ? 'opacity-50' : 'hover:scale-[1.02]'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-4">
            <h3 className={`text-xl font-bold tracking-wider ${task.isCompleted ? 'line-through text-gray-500' : 'text-cyan-300'}`}>
              {task.title}
            </h3>
            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getPriorityColor(task.priority)} tracking-wider`}>
              {task.priority}
            </span>
          </div>
          <p className="text-cyan-400/70 text-sm font-light tracking-wider">
            CREATED: {formattedDate.date} AT {formattedDate.time}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <PriorityButton
              priority={Priority.LOW}
              isActive={task.priority === Priority.LOW}
              isDisabled={isLoading}
              onClick={() => onChangePriority(task.id, Priority.LOW)}
            />
            <PriorityButton
              priority={Priority.MEDIUM}
              isActive={task.priority === Priority.MEDIUM}
              isDisabled={isLoading}
              onClick={() => onChangePriority(task.id, Priority.MEDIUM)}
            />
            <PriorityButton
              priority={Priority.HIGH}
              isActive={task.priority === Priority.HIGH}
              isDisabled={isLoading}
              onClick={() => onChangePriority(task.id, Priority.HIGH)}
            />
          </div>
                    
          <div className="flex gap-3 ml-6">
            <ActionButton
              type="complete"
              isCompleted={task.isCompleted}
              isDisabled={isLoading}
              onClick={() => onComplete(task.id)}
            />
            <ActionButton
              type="delete"
              isDisabled={isLoading}
              onClick={() => onDelete(task.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 
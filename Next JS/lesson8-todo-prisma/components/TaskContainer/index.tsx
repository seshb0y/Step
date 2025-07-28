import { Task } from '@prisma/client';
import TaskList from '@/components/TaskList';

interface TaskContainerProps {
  tasks: Task[];
  onTasksUpdate: () => void;
}

const TaskContainer = ({ tasks, onTasksUpdate }: TaskContainerProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-cyan-400/20 shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 tracking-wider">YOUR TASKS</h2>
      <TaskList tasks={tasks} onTasksUpdate={onTasksUpdate} />
    </div>
  );
};

export default TaskContainer; 
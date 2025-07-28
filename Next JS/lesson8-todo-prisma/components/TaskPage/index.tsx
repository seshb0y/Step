'use client';
import { useState } from 'react';
import { Task, Priority } from '@prisma/client';
import TaskFilters from '@/components/TaskFilters';
import TaskContainer from '@/components/TaskContainer';

interface TaskPageProps {
  initialTasks: Task[];
}

const TaskPage = ({ initialTasks }: TaskPageProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async (filters: { showCompleted: boolean; priority: Priority | 'ALL' }) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('showCompleted', filters.showCompleted.toString());
      params.append('priority', filters.priority);

      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTasksUpdate = () => {
    // Refresh tasks after any update
    fetchTasks({ showCompleted: true, priority: 'ALL' });
  };

  const handleFiltersChange = (filters: { showCompleted: boolean; priority: Priority | 'ALL' }) => {
    fetchTasks(filters);
  };

  return (
    <>
      <TaskFilters 
        onFiltersChange={handleFiltersChange}
        isLoading={isLoading}
        taskCount={tasks.length}
      />
      <TaskContainer tasks={tasks} onTasksUpdate={handleTasksUpdate} />
    </>
  );
};

export default TaskPage; 
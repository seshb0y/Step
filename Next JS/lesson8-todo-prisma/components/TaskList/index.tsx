import { Priority, Task } from '@prisma/client';
import React, { useState } from 'react';
import TaskItem from '@/components/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTasksUpdate?: () => void;
}

const TaskList = ({ tasks, onTasksUpdate }: TaskListProps) => { 
    const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
    const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

    React.useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const setLoading = (taskId: number, loading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [taskId]: loading }));
    };

    const handleComplete = async (id: number) => {
        const task = localTasks.find((task) => task.id === id);
        if (!task) return;

        setLoading(id, true);
        try {
            const response = await fetch(`/api/tasks/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: !task.isCompleted }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setLocalTasks(prev => 
                    prev.map(t => t.id === id ? updatedTask : t)
                );
                onTasksUpdate?.();
            }
        } catch (error) {
            console.error('Failed to update task status:', error);
        } finally {
            setLoading(id, false);
        }
    };

    const handleDelete = async (id: number) => {
        setLoading(id, true);
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setLocalTasks(prev => prev.filter(t => t.id !== id));
                onTasksUpdate?.();
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        } finally {
            setLoading(id, false);
        }
    };

    const handleChangePriority = async (id: number, priority: Priority) => {
        setLoading(id, true);
        try {
            const response = await fetch(`/api/tasks/${id}/priority`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priority }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setLocalTasks(prev => 
                    prev.map(t => t.id === id ? updatedTask : t)
                );
                onTasksUpdate?.();
            }
        } catch (error) {
            console.error('Failed to update task priority:', error);
        } finally {
            setLoading(id, false);
        }
    };

    if (localTasks.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-cyan-900/40 rounded-full flex items-center justify-center border border-cyan-400/30">
                    <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wider">NO TASKS YET</h3>
                <p className="text-cyan-300 font-light tracking-wider">CREATE YOUR FIRST TASK TO GET STARTED</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {localTasks.map((task) => {
                const isLoading = loadingStates[task.id];
                
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isLoading={isLoading}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                        onChangePriority={handleChangePriority}
                    />
                );
            })}
        </div>
    );
};

export default TaskList;
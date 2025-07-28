import { getTasks } from '@/lib/tasks';
import PageHeader from '@/components/PageHeader';
import AddTaskButton from '@/components/AddTaskButton';
import TaskPage from '@/components/TaskPage';
import CyberpunkBackground from '@/components/CyberpunkBackground';

export default async function Home() {
  const initialTasks = await getTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 relative overflow-hidden">
      <CyberpunkBackground />

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <PageHeader />
        <AddTaskButton />
        <TaskPage initialTasks={initialTasks} />
      </div>
    </div>
  );
}

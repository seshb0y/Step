import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchGetAllTasks } from "../features/tasks/tasksSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../types/Task";

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [sortTask, setSortTask] = useState<{ sortBy: string; descending: boolean }>({
    sortBy: "id",
    descending: false,
  });

  useEffect(() => {
    dispatch(fetchGetAllTasks(sortTask));
  }, [dispatch, sortTask]);

  const handleSort = (key: string) => {
    setSortTask((prev) => ({
      sortBy: key,
      descending: prev.sortBy === key ? !prev.descending : false,
    }));
    dispatch(fetchGetAllTasks({ sortBy: key, descending: sortTask.sortBy === key ? !sortTask.descending : false }));
  };
  return (
    <div className="min-h-screen w-full bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />

      <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-screen`}>
        <h1 className="text-2xl font-bold mb-4 ml-16">Tasks</h1>

        {/* Кнопки сортировки */}
        <div className="flex gap-4 mb-4 ml-16 text-primary-purple">
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("id")}>Sort by Id</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("title")}>Sort by Title</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("status")}>Sort by Status</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("createdAt")}>Sort by expiration date</button>
        </div>

        {/* Таблица задач */}
        <div className="overflow-x-auto ml-16">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-primary-purple">
                  <th className="py-2 px-4 text-center">ID</th>
                  <th className="py-2 px-4 text-center">Title</th>
                  <th className="py-2 px-4 text-center">Status</th>
                  <th className="py-2 px-4 text-center">Expiration date</th>
                  <th className="py-2 px-4 text-center">Responsible</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task : Task) => (
                  <tr key={task.id} className="border-b border-gray-700 bg-dark-bg hover:bg-gray-700 cursor-pointer"
                      onClick={() => navigate(`/orders/${task.order.id}`)}>
                    <td className="py-2 px-4 text-center">{task.id}</td>
                    <td className="py-2 px-4 text-center">{task.title}</td>
                    <td className="py-2 px-4 text-center">{TaskStatus[task.taskStatus]}</td>
                    <td className="py-2 px-4 text-center">{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-center">{task.userTasks[0].user.userName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

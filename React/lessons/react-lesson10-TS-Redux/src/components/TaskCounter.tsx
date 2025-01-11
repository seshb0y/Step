import React, { useEffect, useState } from "react";
import { AppState, StatusFilterType, Task } from "../redux/store";
import { useSelector } from "react-redux";

const TaskCounter = () => {
  const [completed, setCompleted] = useState<number>(0);
  const [active, setActive] = useState<number>(0);

  const tasks = useSelector((state: AppState) => state.tasks);

  const filterStatus = useSelector((state: AppState) => state.filters.status);

  const countTasks = (tasks: Task[]) => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const activeTasks = tasks.filter((task) => !task.completed).length;

    setCompleted(completedTasks);
    setActive(activeTasks);
  };

  useEffect(() => {
    countTasks(tasks);
  }, [tasks, filterStatus]);
  return (
    <div>
      <p>all: {completed + active}</p>
      <p>active: {active}</p>
      <p>completed: {completed}</p>
    </div>
  );
};

export default TaskCounter;

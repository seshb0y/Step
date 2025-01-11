import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, StatusFilterType, Task } from "../redux/store";
import { addTask } from "../redux/action";

const getVisibleTasks = (tasks: Task[], statusFilter: StatusFilterType) => {
  switch (statusFilter) {
    case "completed":
      return tasks.filter((task) => task.completed);

    case "active":
      return tasks.filter((task) => !task.completed);

    default:
      return tasks;
  }
};

const TaskList = () => {

    const [input, setInput] = useState("");

    const tasks = useSelector((state: AppState) => state.tasks);

    const filterStatus = useSelector((state: AppState) => state.filters.status);

    const visibleTask = getVisibleTasks(tasks, filterStatus);


    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    }

    const handleAddTask = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({id: 5, text: input, completed: false}))
    setInput("")
    }
  return (
    <>
        <ul>
        {visibleTask.map((task) => (
            <li key={task.id}>{task.text}</li>
        ))}
        </ul>
        <form action="" onSubmit={handleAddTask}>
            <input type="text" value={input} onChange={handleChange}/>
            <button>Add task</button>
        </form>
    </>
  );
};

export default TaskList;

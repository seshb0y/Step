import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, StatusFilterType, Task } from "../redux/store";
import { addTask, changeStatus, deleteTask, findTask } from "../redux/action";

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
  const [id, setId] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 5;

  const [addTaskInput, setAddTaskInput] = useState("");

  const [findTaskInput, setFindTaskInput] = useState("");

  const tasks = useSelector((state: AppState) => state);

  const filterStatus = useSelector((state: AppState) => state.filters.status);

  const startIndex = (currentPage - 1) * taskPerPage
  const endIndex = startIndex + taskPerPage;


  const visibleTask = getVisibleTasks(
    findTaskInput === "" ? tasks.tasks : tasks.foundTask,
    filterStatus
  ).slice(startIndex, endIndex);

  const totalTask = getVisibleTasks(
    findTaskInput === "" ? tasks.tasks : tasks.foundTask,
    filterStatus
  ).length;

  const totalPage = Math.ceil(totalTask / taskPerPage)

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const dispatch = useDispatch();

  const handleChangeAddTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTaskInput(e.target.value);
  };

  const handleChangeFindTaskInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFindTaskInput(e.target.value);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ id: id, text: addTaskInput, completed: false }));
    setId((prev) => prev + 1);
    setAddTaskInput("");
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask({ id }));
  };

  const handleChangeStatus = (id: number, completed: boolean) => {
    dispatch(changeStatus({ id, completed: !completed }));
  };

  const handleFindTask = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(findTask({ text: findTaskInput }));
  };

  return (
    <>
      <form action="" onSubmit={handleFindTask}>
        <input
          type="text"
          value={findTaskInput}
          onChange={handleChangeFindTaskInput}
        />
        <button>search</button>
      </form>
      <ul>
        {visibleTask.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)}>delete</button>
            <input
              type="checkBox"
              checked={task.completed}
              onChange={() => handleChangeStatus(task.id, task.completed)}
            />
          </li>
        ))}
      </ul>
      <form action="" onSubmit={handleAddTask}>
        <input
          type="text"
          value={addTaskInput}
          onChange={handleChangeAddTaskInput}
        />
        <button>Add task</button>
      </form>
      <div>
        {
          Array.from({length: totalPage}, (_, index) => (
            <button key={index} onClick={() => handleChangePage(index + 1)}>
              {index + 1}
            </button>
          ))
        }
      </div>
    </>
  );
};

export default TaskList;

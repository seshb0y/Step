import React from "react";
import TaskList from "../components/TaskList";
import TaskCounter from "../components/TaskCounter";
import StatusFilter from "../components/StatusFilter";

const Tasks = () => {
  return (
    <div>
      <h1>Task Page</h1>
      <TaskCounter></TaskCounter>
      <StatusFilter></StatusFilter>
      <TaskList></TaskList>
    </div>
  );
};

export default Tasks;

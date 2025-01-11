import { createAction } from "@reduxjs/toolkit";
import {
  TASK_CHANGE_FILTER_STATUS,
    TASKS_ADD_TASK,
//   TASKS_ADD_TASK,
  TASKS_DELETE_TASK,
} from "./constants";
import { StatusFilterType } from "./store";

// const addTask = {
//     type: TASKS_ADD_TASK,
//     payload:{
//         id: 5,
//         text: "Start using Redux",
//         completed: false,
//     }
// }

const deleteTask = {
  type: TASKS_DELETE_TASK,
  payload: {
    id: 0,
  },
};

type AddTaskPayload = {
  id: number;
  text: string;
  completed: boolean;
};

type ChangeFilterStatusPayload = StatusFilterType;
const addTask = createAction<AddTaskPayload>(TASKS_ADD_TASK);

const changeStatusFilter = createAction<ChangeFilterStatusPayload>(
  TASK_CHANGE_FILTER_STATUS
);

addTask({ id: 5, text: "Start using Redux", completed: false });

export { addTask, deleteTask, changeStatusFilter };

import { createAction } from "@reduxjs/toolkit";
import {
  TASK_CHANGE_FILTER_STATUS,
    TASK_CHANGE_STATUS,
    TASK_FIND_TASK,
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



type DeleteTaskPayload = {
  id: number;
}

type AddTaskPayload = {
  id: number;
  text: string;
  completed: boolean;
};

type ChangeStatusPayload = {
  id: number;
  completed: boolean;
}

type FindTaskPayload = {
  text: string
}

type ChangeFilterStatusPayload = StatusFilterType;
const addTask = createAction<AddTaskPayload>(TASKS_ADD_TASK);

const changeStatusFilter = createAction<ChangeFilterStatusPayload>(
  TASK_CHANGE_FILTER_STATUS
);

const findTask = createAction<FindTaskPayload>(TASK_FIND_TASK)

const changeStatus = createAction<ChangeStatusPayload>(TASK_CHANGE_STATUS)

const deleteTask = createAction<DeleteTaskPayload>(TASKS_DELETE_TASK)

addTask({ id: 5, text: "Start using Redux", completed: false });

export { addTask, deleteTask, changeStatusFilter, changeStatus, findTask };

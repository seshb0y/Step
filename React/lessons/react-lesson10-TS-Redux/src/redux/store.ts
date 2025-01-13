import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { TASK_CHANGE_FILTER_STATUS, TASK_CHANGE_STATUS, TASK_FIND_TASK, TASKS_ADD_TASK, TASKS_DELETE_TASK } from "./constants";
// import { act } from "react";

export type StatusFilterType = "all" | "completed" | "active";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type AppState = {
  tasks: Task[];
  filters: {
    status: StatusFilterType;
  };
  foundTask: Task[];
};

const initialState: AppState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
  foundTask: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ]
};

const rootReducer = (state = initialState, action: AnyAction) => {
    switch(action.type){
        case TASK_CHANGE_FILTER_STATUS:
          return{
              ...state,
              filters: {
                  status: action.payload
              },
          };
        case TASKS_ADD_TASK:
          return{
              ...state,
              tasks: [...state.tasks, action.payload],
              foundTask: [...state.foundTask, action.payload]
          }
        case TASKS_DELETE_TASK:
          return{
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.payload.id),
            foundTask: state.foundTask.filter((task) => task.id !== action.payload.id),
          }
        case TASK_CHANGE_STATUS:
          return{
            ...state,
            tasks: state.tasks.map((task) => 
              task.id === action.payload.id ? {
                ...task, completed: action.payload.completed
              } : task
            ),
            foundTask: state.foundTask.map((task) =>
              task.id === action.payload.id
                ? { ...task, completed: action.payload.completed }
                : task
            ),
          }
        case TASK_FIND_TASK:
          return{
            ...state,
            foundTask: action.payload.text ?
            state.tasks.filter((task) => task.text.includes(action.payload.text))
            : state.tasks
          }
        default:
            break
    }
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
});

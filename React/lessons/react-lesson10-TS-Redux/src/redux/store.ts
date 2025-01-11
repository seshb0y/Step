import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { TASK_CHANGE_FILTER_STATUS, TASKS_ADD_TASK } from "./constants";

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
                tasks: [...state.tasks, action.payload]
            }
        default:
            break
    }
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
});

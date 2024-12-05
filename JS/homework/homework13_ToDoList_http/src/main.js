import { addTask } from "./addTask";
import { changeTheme } from "./changeTheme";
import { loadTasks } from "./loadTasks";
import { searchByCheck } from "./searchByCheck";
import { searchByName } from "./searchByName";
import "./style.css";


await loadTasks();
addTask();
changeTheme();
searchByName();
searchByCheck();

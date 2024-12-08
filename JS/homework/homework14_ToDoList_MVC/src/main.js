import { addElements } from "./elements";
import "./style.css";
import { TasksController } from "./ToDoController";
import { ToDoModel } from "./ToDoModel";
import { ToDoView } from "./ToDoView";

addElements()


document.addEventListener("DOMContentLoaded", () => {
  const model = new ToDoModel();
  const view = new ToDoView();
 
  new TasksController(view, model);
});

 

 
// const btn = document.createElement("button");
// btn.style.backgroundColor = "black";
// btn.style.position = "fixed";
// btn.addEventListener("mouseover", () => {
//   btn.style.top = `${Math.floor(
//     Math.random() * (window.innerHeight - btn.offsetHeight)
//   )}px`;
//   btn.style.left = `${Math.floor(
//     Math.random() * (window.innerWidth - btn.offsetWidth)
//   )}px`;
// });
// document.querySelector("#app").append(btn);
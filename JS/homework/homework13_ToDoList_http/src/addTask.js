import sweet from "sweetalert2";
import { appendEl } from "./appendEl";
export const addTask = () => {
    const ul = document.querySelector(".app__todo-list")
    const addBtn = document.querySelector(".app__add-btn")

    addBtn.addEventListener("click", () => {
        sweet.fire({
            title: 'Enter task name',
            input: 'text',
            inputPlaceholder: 'Type your task here...',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel', 
          }).then((result) => {
            if (result.isConfirmed) {
              appendEl(result.value, ul);
            }
          });
    })

}
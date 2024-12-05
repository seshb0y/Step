import { delTask } from "./delTask";
import Swal from 'sweetalert2';

export const addTask = () => {
    const addBtn = document.querySelector(".footer__add-btn");
    const list = document.querySelector(".footer__toDo-list")
    console.log(list)
    addBtn.addEventListener("click", () => {
        Swal.fire({
            title: 'Enter task name',
            input: 'text', // Тип ввода: текстовое поле
            inputPlaceholder: 'Type your name here...',
            showCancelButton: true, // Показывает кнопку "Отменить"
            confirmButtonText: 'Submit', // Текст кнопки подтверждения
            cancelButtonText: 'Cancel',  // Текст кнопки отмены
          }).then((result) => {
            if (result.isConfirmed) {
              appendEl(result.value, list);
            }
          });
    })
}

// export const addTask = () => {
//     const addBtn = document.querySelector(".header__add-btn");
//     const input = document.querySelector(".header__input")
//     const list = document.querySelector(".header__toDo-list")
//     addBtn.addEventListener("click", (event) => {
//         event.preventDefault();
//         if(input.value){
//             appendEl(input, list);
//             delTask()
//             let listItem = localStorage.getItem("tasks");
//             if(listItem){
//                 listItem = JSON.parse(localStorage.getItem("tasks"));
//                 listItem.push(input.value);
//                 localStorage.setItem("tasks", JSON.stringify(listItem));
//             }
//             else{
//                 localStorage.setItem("tasks", JSON.stringify([input.value]));
//             }
//             input.value = ""
//         }
//     })
//     let listItems = localStorage.getItem("tasks");
//     if(listItems){
//         listItems = JSON.parse(listItems)
//         listItems.forEach(task => {
//             appendEl(task, list)
//         });
//     }
// }
export function appendEl(input, list, checkbox = false){
    const item = document.createElement("li");
    item.className = "footer__toDo-item";
    item.style.backgroundColor = "transparent"
    item.style.display = "flex"
    item.style.justifyContent = "space-between"
    item.style.marginRight = "200px"

    const checkBox = document.createElement("input");

    // checkBox.style.marginRight = "500px";

    const text = document.createElement("p");
    text.textContent = typeof input === "string" ? input : input.value;
    text.style.alignItems = "left"
    const delBtn = document.createElement("button");
    delBtn.className = "footer__del-btn";
    delBtn.style.float = "right";
    delBtn.style.margin = "2px 2px 0 0";
    delBtn.style.backgroundColor = "#1a1a1a"
    delBtn.textContent = "delete";
    delBtn.type = "button";


    checkBox.type = "checkbox";
    if(checkbox){
        checkBox.checked = true;
        text.style.color = "grey"
        text.style.textDecoration = "line-through"
    }
    checkBox.addEventListener("change", () => {
        if(checkBox.checked){
            text.style.color = "grey"
            text.style.textDecoration = "line-through"
        }
        else{
            text.style.textDecoration = "none";
            text.style.color = "white";
        }
    })
    item.style.height = "45px"
    const hr = document.createElement("hr")
    
    item.append(checkBox, text, delBtn);
    item.style.borderRadius = "5px"
    // item.style.marginBottom = "5px"
    list.append(item);
    // list.append(hr);
    delTask();
}
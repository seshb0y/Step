import { delTask } from "./delTask";

export const addTask = () => {
    const addBtn = document.querySelector(".header__add-btn");
    const input = document.querySelector(".header__input")
    const list = document.querySelector(".header__toDo-list")
    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if(input.value){
            appendEl(input, list);
            delTask()
            let listItem = localStorage.getItem("tasks");
            if(listItem){
                listItem = JSON.parse(localStorage.getItem("tasks"));
                listItem.push(input.value);
                localStorage.setItem("tasks", JSON.stringify(listItem));
            }
            else{
                localStorage.setItem("tasks", JSON.stringify([input.value]));
            }
            input.value = ""
        }
    })
    let listItems = localStorage.getItem("tasks");
    if(listItems){
        listItems = JSON.parse(listItems)
        listItems.forEach(task => {
            appendEl(task, list)
        });
    }
}
function appendEl(input, list){
    const item = document.createElement("li");
    item.className = "header__toDo-item";
    if(input.value){
        item.textContent = input.value;
    }
    else{
        item.textContent = input;
    }
    const delBtn = document.createElement("button");
    delBtn.className = "header__del-btn";
    delBtn.style.float = "right";
    delBtn.style.margin = "2px 2px 0 0";
    delBtn.style.backgroundColor = "#1a1a1a"
    delBtn.textContent = "delete";
    delBtn.type = "button";
    item.style.height = "45px"
    item.append(delBtn);
    item.style.backgroundColor = "grey"
    item.style.borderRadius = "5px"
    item.style.marginBottom = "5px"
    list.append(item);
}
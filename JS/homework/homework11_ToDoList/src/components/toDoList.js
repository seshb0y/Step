export const toDoList = () => {
    const list = document.createElement("ul");
    list.className = "header__toDo-list";
    list.style.listStyle = "none"
    document.querySelector(".header__toDo-form").append(list);
}
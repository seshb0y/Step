export const toDoForm = () => {
    const form = document.createElement("form");
    form.className = "header__toDo-form";
    const input = document.createElement("input");
    input.className = "header__input"
    input.placeholder = "enter the task name"
    const btn = document.createElement("button");
    btn.className = "header__add-btn"
    btn.textContent = "add task";
    form.append(input);
    form.append(btn);
    document.querySelector(".header").append(form);
}
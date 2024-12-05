import { delTask } from "./delTask"



export const appendEl = (value, list, completed = false) => {
    const li = document.createElement("li")
    li.style.position = "relative"
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    const text = document.createElement("p")
    text.className = "app__text"
    text.textContent = typeof value === "string" ? value : value.value
    text.style.wordBreak = "break-word";
    text.style.width = "85%";
    const delButton = document.createElement("button");
    delButton.className = "app__del-btn";
    delButton.style.position = "absolute"
    delButton.style.right = "10px"
    delButton.style.backgroundImage = "url('https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/trash-alt-256.png')"
    delButton.style.backgroundSize = "cover"
    delButton.style.height = "40px"
    delButton.style.backgroundColor = "transparent"
    if(completed){
        checkbox.checked = true;
        text.style.color = "grey";
        text.style.textDecoration = "line-through"
    }
    checkbox.addEventListener("change", () => {
        if(checkbox.checked){
            text.style.color = "grey"
            text.style.textDecoration = "line-through"
        }
        else{
            text.style.textDecoration = "none";
            text.style.color = "white";
        }
    })
    li.style.listStyle = "none"
    li.style.display = "flex"
    li.style.alignItems = "center"
    li.className = "app__element"
    li.append(checkbox, text, delButton);
    list.append(li)
    delTask();
}
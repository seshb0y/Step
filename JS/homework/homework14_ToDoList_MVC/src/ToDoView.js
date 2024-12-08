export class ToDoView {
    taskList;
    constructor() {
      this.taskList = document.querySelector(".task-list");
    }
   
    printTasks(task) {
      this.taskList.innerHTML = "";
      for (let i = 0; i < task.length; i += 1) {
        const li = document.createElement("li");
        li.textContent = task[i];
   
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => this.handleDeleteTask(i);
   
        const changeButton = document.createElement("button");
        changeButton.textContent = "Change";
        changeButton.style.margin = "0 10px 0 10px"
        changeButton.addEventListener("click", () => {
          const inputName = document.createElement("input");
          inputName.setAttribute("placeholder", "name");
          inputName.style.marginRight = "10px";
          li.textContent = "";
          const saveBtn = document.createElement("button");
          saveBtn.textContent = "Save";
          saveBtn.addEventListener("click", () => {
            li.textContent = inputName.value;
            this.handleChangeTask(i, inputName.value);
            saveBtn.remove();
            li.appendChild(changeButton);
            li.appendChild(deleteButton);
          });
          li.appendChild(inputName);
          li.appendChild(saveBtn);
        });
   
        li.appendChild(changeButton);
        li.appendChild(deleteButton);
        this.taskList.appendChild(li);
      }
    }
   
    bindDeleteTask(handler) {
      this.handleDeleteTask = handler;
    }
    bindChangeTask(handler){
        this.handleChangeTask = handler;
    }
  }
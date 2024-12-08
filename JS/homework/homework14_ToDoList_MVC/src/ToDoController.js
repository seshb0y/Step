export class TasksController {
    view;
    model;
   
    constructor(view, model) {
      this.view = view;
      this.model = model;
   
      this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
      this.view.bindChangeTask(this.handleChangeTask.bind(this));
   
      this.view.printTasks(this.model.getTask());
   
      document.querySelector(".form").addEventListener("submit", (event) => {
        event.preventDefault();
        const taskNameValue = event.target.children["new-task"].value;
        this.model.addTask(taskNameValue);
        this.view.printTasks(this.model.getTask());
        event.target.children["new-task"].value = "";
      });
    }
    handleDeleteTask(index) {
      this.model.removeTask(index);
      this.view.printTasks(this.model.getTask());
    }
    handleChangeTask(index, newValue){
        this.model.changeTask(this.model.tasks[index], newValue);
        this.view.printTasks(this.model.getTask());
    }
  }
   

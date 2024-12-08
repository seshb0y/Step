export class ToDoModel {
    tasks;
   
    constructor() {
      this.tasks = ["task1", "task2", "task3"];
    }
   
    addTask(task) {
      this.tasks.push(task);
    }
   
    removeTask(index) {
      this.tasks.splice(index, 1);
      
    }

    changeTask(task, newTask){
        this.tasks.splice(this.tasks.findIndex(item => item === task), 1, newTask);
        console.log(this.tasks)
    }
   
    getTask() {
      return this.tasks;
    }
  }
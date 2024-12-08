export const addElements = () => {
    document.querySelector("#app").innerHTML = `
    <form action="" class="form">
      <input type="text" name="new-task" />
      <button type="submit">Add New task</button>
    </form>
    <ul class="task-list"></ul>
    `
}
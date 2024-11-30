export const delTask = () => {
    const delBtns = document.querySelectorAll(".header__del-btn");
    delBtns.forEach(delBtn => {
        delBtn.addEventListener("click", (event) => {
            const listItems = JSON.parse(localStorage.getItem("tasks"));
            const text = event.target.parentElement.textContent.replace("delete", "");
            const updatedList = listItems.filter(item => item !== text);
            localStorage.setItem("tasks", JSON.stringify(updatedList));
            event.target.parentElement.remove();
        });
    });
}
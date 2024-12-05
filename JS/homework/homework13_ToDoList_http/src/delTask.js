export const delTask = () => {
    const delBtns = document.querySelectorAll(".app__del-btn");
    delBtns.forEach(delBtn => {
        delBtn.addEventListener("click", (event) => {
            event.target.parentElement.remove();
        });
    });
}
export const reset = () => {
    const reset = document.querySelector(".reset");
    reset.addEventListener(("click"), () => {
        localStorage.clear();
        document.querySelector(".last-visit").textContent = "";
        document.querySelector(".total").textContent = "";
        document.querySelector(".current").textContent = "0";
    })
}
export const totalTime = () => {
    const totalTime = document.querySelector(".total");
    totalTime.textContent = JSON.parse(localStorage.getItem("totalTime"));
}
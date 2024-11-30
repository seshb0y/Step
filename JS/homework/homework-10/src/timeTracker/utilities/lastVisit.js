export const lastVisit = () => {
    const lastTime = localStorage.getItem("lastTime");
    if(lastTime){
        const lastVisit = document.querySelector(".last-visit");
        lastVisit.textContent = JSON.parse(localStorage.getItem("lastTime"));
    }
}
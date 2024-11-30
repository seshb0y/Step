export const saveChanges = () => {
    window.addEventListener(("beforeunload"), () => {
        let lastTimeSec = 1;
        const current = document.querySelector(".current")
        const localData = localStorage.getItem("totalTime");
        let totalTime = 0;
        if(localData){
            totalTime = JSON.parse(localData);
        }
        totalTime += Number(current.textContent);
        
        
        localStorage.setItem("totalTime", JSON.stringify(totalTime));   
        lastTimeSec = current.textContent; 
        const date = new Date();
        const lastTime = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()} | ${lastTimeSec}sec`;
        localStorage.setItem("lastTime", JSON.stringify(lastTime));
    })
    
}
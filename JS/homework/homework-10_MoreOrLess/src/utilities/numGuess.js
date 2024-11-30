export const numGuess = () => {
    // const rnd = Math.random(100);
    const rnd = Math.floor(Math.random() * 100);
    const tip = document.querySelector(".tip");
    const btn = document.querySelector(".check")
    const count = document.querySelector(".counts")
    const reset = document.querySelector(".reset")
    
    btn.addEventListener("click", (event) => {
        console.log("enter")
        event.preventDefault();
        const num = Number(document.querySelector(".input").value)
        document.querySelector(".input").value = "";
        if(num == rnd){
            tip.textContent = "Congratulation, you won";
        }
        else if(num > rnd){
            tip.textContent = "Less";
            count.textContent = `${Number(count.textContent) + 1}`
        }
        else{
            tip.textContent = "More";
            count.textContent = `${Number(count.textContent) + 1}`
        }
        localStorage.setItem("counts", JSON.stringify(count.textContent));
    })
    reset.addEventListener("click", () => {
        tip.textContent = "Tip";
        localStorage.clear();
        count.textContent = "0";
    })
}
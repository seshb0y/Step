export const currentCounter = () => {
    const text = document.querySelector(".current");
    text.textContent = "0";
    setInterval(()=>setTime(text), 1000);
}

function setTime(text){
    text.textContent = Number(text.textContent) + 1;
}
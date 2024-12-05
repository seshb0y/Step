export const searchByCheck = () => {
    const dropdownBtn = document.querySelector(".app__filter-btn");
    const dropdownMenu = document.querySelector(".app__menu-container")
    dropdownBtn.addEventListener("click", () => {
        if(dropdownMenu.style.display == "block"){
            dropdownMenu.style.display = "none"
        }else{
            dropdownMenu.style.display = "block";
        }
        
    })
    const elements = document.querySelectorAll(".app__element")
    const checked = document.querySelector(".app__checked");
    const unchecked = document.querySelector(".app__unchecked");
    const all = document.querySelector(".app__all")
    checked.addEventListener("click", () => {
        dropdownMenu.style.display = "none"
        elements.forEach((element) => {
            if(!element.children[0].checked){
                element.style.display = "none"
            }else{
                element.style.display = "flex"
            }
        })
        
    })
    unchecked.addEventListener("click", () => {
        elements.forEach((element) => {
            if(element.children[0].checked){
                element.style.display = "none"
            }else{
                element.style.display = "flex"
            }
        })
        dropdownMenu.style.display = "none"
    })
    all.addEventListener("click", () => {
        elements.forEach((element) => {
            element.style.display = "flex"
        })
        dropdownMenu.style.display = "none"
    })
}
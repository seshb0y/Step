export const searchByName = () => {
    const input = document.querySelector(".app__input");
    const searchBtn = document.querySelector(".app__search-btn")
    const elements = document.querySelectorAll(".app__element")

    searchBtn.addEventListener("click", () => {
        console.log(elements)
        elements.forEach((element) => {
            console.log(input.value)
            if(element.children[1].innerHTML != input.value)
                element.style.display = "none";
        })
    })
}
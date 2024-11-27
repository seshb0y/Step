// Задание 1
// Создать html-страницу со списком ссылок.
// Ссылки на внешние источники (которые начинаются с http://)
// необходимо подчеркнуть пунктиром.
// Искать такие ссылки в списке и устанавливать им дополнительные стили необходимо с помощью JS.

const elements = document.querySelectorAll(".list-elements")
elements.forEach((element) =>{
    if(element.textContent[0, 6] == "http://"){
        console.log("check")
        element.style.textDecoration = "underline"
    }
})

// Задание 2
// Создать html-страницу с деревом вложенных директорий.
// При клике на элемент списка, он должен сворачиваться или
// разворачиваться. При наведении на элемент, шрифт должен становится жирным (с помощью CSS). 

const folder = document.querySelector(".this-pc");
function setStyleAllChild(element) {
    element.addEventListener("mouseover", () => {
        element.style.fontWeight = "800";
    });
    element.addEventListener("mouseleave", () => {
        element.style.fontWeight = "100";
    });

    if (element.children.length > 0) {
        element.addEventListener("click", (event) => {
            event.stopPropagation();

            for (let i = 0; i < element.children.length; i++) {

                const display = window.getComputedStyle(element.children[i]).display;
                if(display == "none"){
                    element.children[i].style.display = "block";
                }
                else{
                    element.children[i].style.display = "none"
                }
            }
        });
        for (let i = 0; i < element.children.length; i++) {
            setStyleAllChild(element.children[i]);
        }
    }
}
setStyleAllChild(folder);
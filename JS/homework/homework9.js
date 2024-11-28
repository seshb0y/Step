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
    element.addEventListener("mouseover", (event) => {
        event.stopPropagation();
        element.style.fontWeight = "800";
    });
    element.addEventListener("mouseleave", (event) => {
        event.stopPropagation();
        element.style.fontWeight = "100";
    });
    for (let i = 0; i < element.children.length; i++) {
    setStyleAllChild(element.children[i]);
    }
}

const selectedElement = (event) => {
    if(event.target.className.startsWith("this")){
        
        const li = document.querySelector(`.${event.target.className}`);
        const liChildren = li.children;
        
        for(let i = 0; i < liChildren.length; i+=1){
            if(liChildren[i].style.display == "none" || liChildren[i].style.display == ""){
            
                liChildren[i].style.display = "block";
            }
            else{
                liChildren[i].style.display = "none";
            }
        }
        
    }
}
document.addEventListener("click", selectedElement)
setStyleAllChild(folder);

// Задание 3
// Создать html-страницу со списком книг.
// При щелчке на элемент, цвет текста должен меняться на оранжевый. При повторном щелчке на другую книгу, предыдущей
// необходимо возвращать прежний цвет.
// Если при клике мышкой была зажата клавиша Ctrl, то элемент
// добавляется/удаляется из выделенных. Если при клике мышкой
// была зажата клавиша Shift, то к выделению добавляются все
// элементы в промежутке от предыдущего кликнутого до текущего

const list = document.querySelectorAll(".list-elements li")
let book = null;
list.forEach(element => {
    element.addEventListener("click", (event) => {
        console.log(event)
        if(!book){
            book = element;
        }
        if(event.ctrlKey){
            if(event.target.style.backgroundColor == "orange")
            {
                event.target.style.backgroundColor = "white";
            }
            else{
                event.target.style.backgroundColor = "orange";
            }
        }
        else if(book && event.shiftKey){
            let start = Math.min(Array.from(list).indexOf(element), Array.from(list).indexOf(book));
            let end = Math.max(Array.from(list).indexOf(element), Array.from(list).indexOf(book));
            for(let i = start; i <= end; i+=1){
                list[i].style.backgroundColor = "orange";
            }
        }
        else if(book){
            if(book.style.backgroundColor == "orange")
            {
                event.target.style.backgroundColor = "orange";
                book.style.backgroundColor = "white";
            }
            else{
                event.target.style.backgroundColor = "orange";
            }
        }
        book = element;
    })
});

// Задание 4
// Создать html-страницу для отображения/редактирования текста.
// При открытии страницы текст отображается с помощью тега
// div. При нажатии Ctrl+E, вместо div появляется textarea с тем
// же текстом, который теперь можно редактировать. При нажатии
// Ctrl+S, вместо textarea появляет div с уже измененным текстом.
// Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.

const textContainer = document.querySelector(".text-container");
const text = document.querySelector(".text");
const textarea = document.querySelector(".textarea");
document.body.addEventListener("keydown", (event) => {
    console.log(event)
    if(event.ctrlKey && event.key == "e"){
        text.style.display = "none";
        textarea.style.display = "block";
        textarea.value = text.textContent;
        event.preventDefault();
    }
    else if(event.ctrlKey && event.key == "s"){
        text.style.display = "block";
        textarea.style.display = "none";
        text.textContent = textarea.value;
        event.preventDefault();
    }
})

// Задание 5
// Создать html-страницу с большой таблицей.
// При клике по заголовку колонки, необходимо отсортировать
// данные по этой колонке. Например: на скриншоте люди отсортированы по возрасту. Учтите, что числовые значения должны
// сортироваться как числа, а не как строки

function sortTable(columnIndex, isNumeric = false) {
    const table = document.querySelector(".table");
    const tbody = table.querySelector(".table__body");
    const rows = Array.from(tbody.rows);
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent;
        const cellB = rowB.cells[columnIndex].textContent;

        if (isNumeric) {
            return parseFloat(cellB) - parseFloat(cellA);
        } else {
            return  cellA.localeCompare(cellB);
        }
    });
    rows.forEach((row) => tbody.appendChild(row));
}
// Задание 6
// Создать html-страницу с блоком текста в рамочке.
// Реализовать возможность изменять размер блока, если зажать
// мышку в правом нижнем углу и тянуть ее дальше
const container = document.querySelector('.container');
const containerBtn = document.querySelector('.container__button');
let isResizing = false;
containerBtn.addEventListener('mousedown', (event) => {
    isResizing = true;
    const startY = event.clientY;
    const startX = event.clientX;
    const startWidth = parseInt(getComputedStyle(container).width, 10);
    const startHeight = parseInt(getComputedStyle(container).height, 10);
    const onMouseMove = (moveEvent) => {
        if (isResizing) {
            const newHeight = startHeight + moveEvent.clientY - startY;
            const newWidth = startWidth + moveEvent.clientX - startX
            container.style.height = newHeight + 'px';
            container.style.width = newWidth + 'px';
        }
    };
    const onMouseUp = () => {
        isResizing = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
});

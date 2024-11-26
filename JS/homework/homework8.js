// Задание 1
// Создать html-страницу для ввода имени пользователя.
// Необходимо проверять каждый символ, который вводит пользователь. Если он ввел цифру, то не отображать ее в input.
const input = document.querySelector("input");
function isDigit(value){
    for(let i = 0; i<10; i+=1){
        if(value == i){
            return true;
        }
    }
    return false;
}
input.addEventListener("keydown" ,(event) =>{
    if(isDigit(Number(event.key))){
        event.preventDefault();
    }
})

// Задание 2
// Создать html-страницу с кнопкой Открыть и модальным
// окном. На модальном окне должен быть текст и кнопка Закрыть.
// Изначально модальное окно не отображается. При клике на
// кнопку Открыть появляется модальное окно, на кнопку Закрыть –
// исчезает.
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close-btn");
const openModalBtn = document.querySelector(".open-modalBtn");
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
})
modalCloseBtn.addEventListener("click", (event) =>{
    console.log(event)
    modal.style.display = "none";
})

// Задание 3
// Создать html-страницу с футбольным полем, которое занимает всю ширину и высоту экрана, и мячом размером 100 на 100
// пикселей.
// Сделать так, чтобы при клике мышкой по полю, мяч плавно
// перемещался на место клика. Учтите: необходимо, чтобы центр
// мяча останавливался именно там, где был совершен клик мышкой.
// Также предусмотрите, чтобы мяч не выходил за границы поля

const field = document.querySelector(".field");
const ball = document.querySelector(".field__ball");
field.addEventListener("click", (event) => {
    console.log(`x: ${event.clientX}`);
    console.log(`y: ${event.clientY}`)
    if(event.clientY > 572 && event.clientY < 686 && event.clientX > 600 && event.clientX < 616){
        ball.style.left = `${event.clientX-20}px`;
        ball.style.top = `${event.clientY+300}px`;
    }
    else if(event.clientY > 572 && event.clientY < 686 && event.clientX > 25 && event.clientX < 40){
        ball.style.left = `${event.clientX-20}px`;
        ball.style.top = `${event.clientY+300}px`;
    }
    else if(event.clientY > 370 && event.clientY < 740 && event.clientX > 45 && event.clientX < 597){
        ball.style.left = `${event.clientX-20}px`;
        ball.style.top = `${event.clientY+300}px`;
    }
})


// Задание 4
// Создать html-страницу со светофором и кнопкой, которая
// переключает светофор на следующий цвет

const red = document.querySelector(".traffic-light__red");
const yellow = document.querySelector(".traffic-light__yellow");
const green = document.querySelector(".traffic-light__green");
const nextBtn = document.querySelector(".traffic-light__btn")
let count = 1;
nextBtn.addEventListener("click", () =>{
    if(count == 1){
        red.style.backgroundColor = "red";
        green.style.backgroundColor = "grey";
        count += 1;
    }
    else if(count == 2){
        red.style.backgroundColor = "grey";
        yellow.style.backgroundColor = "yellow";
        count += 1;
    }
    else if(count == 3){
        yellow.style.backgroundColor = "grey";
        green.style.backgroundColor = "green";
        count = 1;;
    }
})

// Задание 5
// Создать html-страницу со списком книг.
// При щелчке на книгу, цвет фона должен меняться на оранжевый.
// Учтите, что при повторном щелчке на другую книгу, предыдущей –
// необходимо возвращать прежний цвет.
const list = document.querySelectorAll(".list-elements li")
let book = null;
list.forEach(element => {
    element.addEventListener("click", () => {
        if(book){
            book.style.backgroundColor = "white";
        }
        book = element;
        element.style.backgroundColor = "orange";
    })
});

// Задание 6
// Создать html-страницу с несколькими кнопками.
// При наведении на кнопку, должна появляться подсказка с текстом. По умолчанию – подсказка появляется сверху от кнопки. Но
// если она не помещается сверху от кнопки, тогда отображается снизу

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tooltip-button');

    buttons.forEach(button => {
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip'); // Добавляем класс 'tooltip' к элементу <span>
        tooltip.textContent = button.getAttribute('data-tooltip');
        button.appendChild(tooltip);

        button.addEventListener('mouseenter', function() {
            const buttonRect = button.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            if (buttonRect.top - tooltipRect.height <= 0) {
                tooltip.classList.add('bottom'); // Добавляем класс 'bottom' к элементу <span>
            } else {
                tooltip.classList.remove('bottom'); // Удаляем класс 'bottom'
            }
        });
    });
});
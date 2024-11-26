// Термин описывающий жизненный цикл события

// 3 Фазы - погружение(Capture), таргетинг(Target), всплытие(Bubble)

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal__container");
const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".modal__closeBtn");

openBtn.addEventListener("click", () =>{
    console.log("event")
    modal.style.display = "flex";
});
closeBtn.addEventListener("click", () =>{
    modal.style.display = "none";
});

const nextBtn = document.querySelector(".modal__nextBtn");
const input = document.querySelector(".modal__input");




nextBtn.addEventListener("click", (event) => {
    console.log(event);
    const usernameValue = document.querySelector("input[name='username']").value
    const passwordValue = document.querySelector("input[name='password']").value
    const textLabelValue = document.querySelector("input[name='textLabel']").value
    const username = document.createElement("p");
    const password = document.createElement("p");
    const textLabel = document.createElement("p");
    document.body.append(username);
    document.body.append(password);
    document.body.append(textLabel);
    username.textContent = usernameValue;
    password.textContent = passwordValue;
    textLabel.textContent = textLabelValue;
    modal.style.display = "none";
})
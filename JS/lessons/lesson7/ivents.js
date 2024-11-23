// // Event - События браузера

// const button = document.createElement("button");
// button.setAttribute("class", ".btn");
// document.body.append(button);
// const handleClick = () => {
//     console.log("Clicked")
// };
// button.addEventListener("click", handleClick);

// const multiBtn = document.createElement("button");
// multiBtn.setAttribute("class", ".multiple-btn");
// document.body.append(multiBtn);

// const firstCallBack = () => {
//     console.log("first click");
// }
// const secondCallBack = () => {
//     console.log("second click");
// }
// const thirdCallBack = () => {
//     console.log("third click");
// }
// multiBtn.addEventListener("click", firstCallBack);
// multiBtn.addEventListener("click", secondCallBack);
// multiBtn.addEventListener("click", thirdCallBack);

// const addBtn = document.querySelector(".add-btn");
// const removeBtn = document.querySelector(".remove-btn");
// const clickBtn = document.querySelector(".click-btn");

// addBtn.addEventListener("click", () =>{
//     clickBtn.addEventListener("click", handleClick);
// });

// removeBtn.addEventListener("click", () =>{
//     clickBtn.removeEventListener("click", handleClick);
// });

// const div = document.createElement("div");
// div.style.border = "1px solid green";
// div.style.padding = "24px";
// const button2 = document.createElement("button");
// button2.setAttribute("class", "js-btn");
// button2.textContent = "JS Button";
// document.body.append(button2);

// const user = {
//     username: "Semyen",
//     showUsername(){
//         console.log(this);
//         console.log(`My username is ${this.username}`);
//     },
// };
// button2.addEventListener(`click`, user.showUsername.bind(user)
// );

// const plus = document.createElement("button");
// plus.textContent = "+";
// const minus = document.createElement("button");
// minus.textContent = "-";
// const value = document.createElement("p");
// value.textContent = 0;
// document.body.append(plus);
// document.body.append(minus);
// document.body.append(value);

// plus.addEventListener("click", () => {
//     value.textContent = Number(value.textContent) + 1;
// })
// minus.addEventListener("click", () => {
//     value.textContent -= 1;
// })

// Event Object
// button2.addEventListener("click", (event) =>{
//     console.log(event);
// })

// const form = document.createElement("form");
// form.setAttribute("class", "login-form");
// const input = document.createElement("input");
// input.setAttribute("placeholder", "username");
// input.setAttribute("type", "text");
// input.setAttribute("name", "username");

// const inputPassword = document.createElement("input");
// inputPassword.setAttribute("placeholder", "password");
// inputPassword.setAttribute("type", "password");
// inputPassword.setAttribute("name", "password");
// inputPassword.style.marginLeft = "16px"

// const label = document.createElement("label");
// label.textContent = "username";

// const label2 = document.createElement("label");
// label2.textContent = "password";

// const btn = document.createElement("button");
// btn.setAttribute("type", "submit");
// btn.textContent = "login";

// document.body.append(form);
// form.append(label);
// form.append(input);
// form.append(label2)
// form.append(inputPassword);
// form.append(btn);

// form.addEventListener("submit", (event) =>{
//     event.preventDefault();
//     // console.log("username"), event.target.elements.username.value();
//     // console.log("password"), event.target.elements.password.value();

//     const {
//         elements: {username, password},
//     } = event.target;

//     console.log(event);
//     console.log("username.value", username.value);
//     console.log("password.value", password.value);
// });


// keydown, keyup, keypress

// document.addEventListener("keydown", (event) =>{
//     console.log("keydown");
// })
const btn = document.createElement("button");
btn.textContent = "clear";
document.body.append(btn);
btn.addEventListener("click", () =>{
    document.body.innerHTML = "";
    document.body.append(btn);
})
document.addEventListener("keyup", (event) =>{
    console.log("keyup", event);
    const p = document.createElement("p");
    p.textContent = `keyup ${event.key} ${event.keyCode}`;
    document.body.append(p);
})



// document.addEventListener("keypress", (event) =>{
//     console.log("keypress");
// })
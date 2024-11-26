const form = document.querySelector(".login-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("event", event);
    // const {username , password} = event.target;
    const {
        username: {value: usernameValue},
        password: {value: passwordValue},
    } = event.target

    console.log("username", usernameValue);
    console.log("username", passwordValue);
})

const textArea = document.querySelector(".textarea");
textArea.addEventListener("change", (event) => {
    console.log("event", event)
})

const select = document.querySelector(".pizza-select");
select.addEventListener("click", (event) =>{
    console.log("event", event);
    textArea.textContent = `Вы выбрали пиццу ${event.target.value}`;
})


const testInput = document.querySelector(".test-input")
const focusBtn = document.querySelector(".focus")
const blurBtn = document.querySelector(".blur")

focusBtn.addEventListener("click", () =>{
    testInput.focus();
});
blurBtn.addEventListener("click", () =>{
    testInput.blur();
});

testInput.addEventListener("focus", () =>{
    console.log("input is in focus");
});
testInput.addEventListener("blur", () =>{
    console.log("input is blur");
});
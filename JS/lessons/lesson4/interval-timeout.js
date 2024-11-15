// const greet = (name) => {
//     prompt(`Hello ${name}`);
// };

// setTimeout(greet, 5000, "Alice")

// setInterval(() =>{
//     console.log("repeat");
// }, 1000);
// let counter = 0;

// const intervalId = setInterval(() => {
//     counter += 1;
//     if(counter === 7){
//         clearInterval(intervalId);
//         console.log("counter finished");
//     }
// }, 2000);

let counter = Number(prompt("sec"));
const intervalId = setInterval(() => {
    counter -= 1;
    if(counter === 0){
        clearInterval(intervalId);
        console.log("counter finished");
    }
    else{
        console.log(counter);
    }
}, 1000);


//functions

sayHello();
// Function declaration - Hosting - Всплывает до объявления
function sayHello()
{
    console.log("Hello");
}
sayHello();


//Function expression - всплывает только после объявления
const expressionFunction = function(){
    console.log("Hello from expression")
}
expressionFunction();


// Arrow functions
const arrowFunction = () => {
    console.log("Hello from arrow")
}
arrowFunction();



// Parameters
const multiply = (a, b) => {
    console.log(a * b);
}

// Замыкание
let a = 12;
const multiplyClosure = (b) => {
    let a = 5;
    console.log(a);
    return() => {
        console.log("b", b);
        console.log("a", a);
        return b + a;
    }
}

// Рекурсия
const recursiveFunction = () => {
    if(result = 10){
        return 1;
    }
    return recursiveFunction();
}


const array = [1, 2, 3, 4, "asfas"];
console.log("array", array[2]);

const array2 = new Array();
array2[0] = "hello";
array2[1] = " ";
array2[2] = "world";

console.log("array2", array2);
const result = array2.join("-");
console.log("result", result);

const string = "production";
const splittedArray = string.split("");
console.log("splittedArray", splittedArray);
const reversed = splittedArray.reverse();
console.log("reversed", reversed);
const finalResult = reversed.join("");
console.log("finalResult", finalResult);

const reversedString = string.split("").reverse().join("")

// Arrays methods

const book = ["Harry Potter"];
book.push("Witcher"); // add to array
book.unshift("Harry Potter 2"); // add into the first place in arr
book.pop(); // delete last element in arr
book.shift(); // delete the first element

// Методы перебора foreach, map, reduce, find, some, every
//ForEach
const arrayForEach = array.forEach((element, index) => {
    console.log("index", index);
    console.log("element", element);
    return 1;
})

// Map
const numberArray = [2, 4, 56, 2];
const doubleArray = numberArray.map((element) => {
    return element * 2;
})


// const obj1 = {};

// const obj2 = new Object();  

// // console.log("obj2", obj2);


// obj1.name = "vasya";
// obj1["surname"] = "Cherkashen";
// // console.log("obj1", obj1);

// delete obj1.surname;

// const user = {
//     name: "name",
//     surname: "surname",
//     addres: {
//         postalCode: 1231,
//         street: "sada",
//         flat: 21,
//     },
//     adult: true,
//     hobbies: ["asdfas", "safas", "asfas"],
// }

// //Методы перебора свойств
// // 1 - for in, Object.keys, Object.values, Object.entries
// for (let key in user){
//     console.log("key", key);
//     console.log("user value", user[key]);
// }
// const userKeys = Object.keys(user);
// const userValues = Object.values(user);
// const userEntries = Object.entries(user);
// console.log("user keys", userKeys);
// console.log("user values",userValues);
// console.log("user entries",userEntries);


//Inheritance
// const animal ={
//     eats: true,
// };

// const rabbit = Object.create(animal);
// rabbit.name = "Some";
// console.log("rabbit eats", rabbit.eats);
// console.log("rabbit has own property eats", Object.hasOwnProperty("eats"));
// console.log("rabbit has own property name", Object.hasOwnProperty("name"));


// Object copy
// const user1 = {
//     name: "Name",
// }

// const user2 = user1;
// console.log("user1", user1);
// console.log("user2", user2); // problem with link copy

// // Spread - поверхностное копирование
// const user3 = {...user1};
// user1.name = "Second";
// console.log("user3", user3);

// //Object.assign - поверхностное копирование
// const person = {
//     name: "Name",
//     age: 28,
// }
// const person2 = {}
// Object.assign(person2, person);

// //Lodash - deepClone
// //structureClone - глубокое клонирование
// const deepClonePerson2 = structuredClone(person1);


// String
// const string = "Hello";
// console.log(string.length);
// console.log(string.toUpperCase());
// console.log(string.toLowerCase());
// console.log("split into array", string.split(""));
// console.log("includes", string.includes("e"));
// console.log("indexOf", string.indexOf("o"));
// console.log("trim", string.trim())

// Math object
// console.log(Math.PI);
// console.log(Math.floor(3.27));
// console.log(Math.ceil(3.15));
// console.log(Math.round(3.5));
// console.log(Math.pow(3, 5));
// console.log(Math.sqrt(9));
// console.log(Math.random());
// console.log(Math.min(3, 1));
// console.log(Math.max(3, 5));

// const number = 14.223;
// console.log("number", number.toFixed(1));

// Date
// const newDate = new Date();
// console.log(newDate.getDay());
// console.log(newDate.getHours());
// console.log(newDate.getMinutes());
// console.log("Date", newDate)

// const time = Date.now();
// console.log("time", time);
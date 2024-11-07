const obj1 = {};

const obj2 = new Object();  

// console.log("obj2", obj2);


obj1.name = "vasya";
obj1["surname"] = "Cherkashen";
// console.log("obj1", obj1);

delete obj1.surname;

const user = {
    name: "name",
    surname: "surname",
    addres: {
        postalCode: 1231,
        street: "sada",
        flat: 21,
    },
    adult: true,
    hobbies: ["asdfas", "safas", "asfas"],
}

//Методы перебора свойств
// 1 - for in, Object.keys, Object.values, Object.entries
for (let key in user){
    console.log("key", key);
    console.log("user value", user[key]);
}
const userKeys = Object.keys(user);
const userValues = Object.values(user);
const userEntries = Object.entries(user);
console.log("user keys", userKeys);
console.log("user values",userValues);
console.log("user entries",userEntries);


//Inheritance
const animal =(
    eats: true,
)

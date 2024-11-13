// Slice, splice


// slice(begin, end) - возвращает новый массив с объектами между begin & end
// const array = [1, 2, 3, 4, 5];
// const fruitArray = ['banana', 'mango', 'peach', 'watermelon', 'apple']
// const slicedArray = array.slice(0, 3);
// const slicedArray2 = fruitArray.slice(3, 5);
// const slicedArray3 = fruitArray.slice(1);
// console.log(slicedArray3);


// // Splice - мутирует - splice(position, number);
// const numbersArray = [2, 44, 12, 34, 65];
// const splicedArray = numbersArray.splice(3, 1, "test");
// console.log("splicedArray", splicedArray);
// console.log("numbersArray", numbersArray);


// Concat
// const oldClients = ["Andrew", "Andy", "Samuel"];
// const newClients = ["Gustav", "Randy", "Thomas"];
// // const allClients = oldClients.concat(newClients);
// const allClients = [...oldClients, ...newClients];
// console.log(allClients)

// ForEach
// allClients.forEach((client) => {
//     console.log("client", client)
// })

// const clients = [
//     {
//       name: "Lisa",
//       gender: "female",
//     },
//     {
//       name: "Andrew",
//       gender: "male",
//     },
//     {
//       name: "Gurban",
//       gender: "male",
//     },
//     {
//       name: "Ann",
//       gender: "female",
//     },
//     {
//       name: "Sergey",
//       gender: "male",
//     },
//     {
//       name: "Alexandra",
//       gender: "female",
//     },
//   ];

// const newClients = clients.map((client) => {
//     if(client.gender == "female"){
//         return client.name = "Ms " + client.name;
//     }
//     return client.name = "Mr " + client.name;
    
// })
// console.log(newClients);


// FlatMap
const students = [
    {
        name: "Andrew",
        courses: ["math", "NodeJS", "NextJS"]
    },
    {
        name: "Andrew",
        courses: ["philosophy", "React", "NextJS"]
    },
    {
        name: "Andrew",
        courses: ["HTML", "CSS", "NextJS"]
    },
];

const courses = students.map((student) => {
     return student.courses
    });

const flatCourses = students.flat((students) => student.courses);
// console.log("courses", courses);
// console.log("flatCourses", flatCourses);


// Filter - не мутирует
const numbersArray = [2, 44, 12, 34, 65];
// const filteredArray = numbersArray.filter((number) => {
//     return number > 30;
// })
// const filteredArray = numbersArray.filter((number) => number > 30);
// console.log(filteredArray);

const clients = [
    {
      name: "Lisa",
      gender: "female",
      
    },
    {
      name: "Andrew",
      gender: "male",
    },
    {
      name: "Gurban",
      gender: "male",
    },
    {
      name: "Ann",
      gender: "female",
    },
    {
      name: "Sergey",
      gender: "male",
    },
    {
      name: "Alexandra",
      gender: "female",
    },
  ];
const femaleArray = [];
const maleArray = [];
const filteredClients = clients.filter((client) => {
    if(client.gender == "female"){
        femaleArray.push(client);
    }
    else{maleArray.push(client);}
    
})


console.log(femaleArray);
console.log(maleArray)
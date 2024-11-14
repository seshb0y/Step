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
      id: 1,
      name: "Lisa",
      gender: "female",
      salary: 1200,
      
    },
    {
      id: 2,
      name: "Andrew",
      gender: "male",
      salary: 1520,
    },
    {
      id: 3,
      name: "Gurban",
      gender: "male",
      salary: 1205,
    },
    {
      id: 4,
      name: "Ann",
      gender: "female",
      salary: 5200,
    },
    {
      id: 5,
      name: "Andrew",
      gender: "male",
      salary: 1250,
    },
    {
      id: 6,
      name: "Alexandra",
      gender: "female",
      salary: 1500,
    },
  ];
// const femaleArray = [];
// const maleArray = [];
// const filteredClients = clients.filter((client) => {
//     if(client.gender == "female"){
//         femaleArray.push(client);
//     }
//     else{maleArray.push(client);}
    
// })
// console.log(femaleArray);
// console.log(maleArray)

// Find
// const selectedClient = clients.find((client) => {
//   return client.name === "Andrew";
// })
// console.log(selectedClient);

// Find index
const colorOptions = [
  {
    label: 'red', 
    color: "#f44336",
  },
  {
    label: 'green', 
    color: "#4CAFe8",
  },
  {
    label: 'yellow', 
    color: "#223512",
  },
  {
    label: 'blue', 
    color: "#f32141r",
  },
  {
    label: 'indigo', 
    color: "#f4r2241",
  },
  {
    label: 'black', 
    color: "#c323f32",
  },
];
// const index = colorOptions.findIndex((color) => color.label === "blue");
// console.log(colorOptions[index]);


// Every, Some
// const numbersArray2 = [2, 44, 12, 34, 65];
// const result = numbersArray2.every((number) => number > 1); //Every
// const resultSome = numbersArray2.some((number) => number > 70); //Some
// console.log(resultSome)

// Sort - мутирует массив
// const sorted = numbersArray2.sort((a, b) => b - a)
// console.log(sorted)

const students2 = [
  {
    name: "Andrew",
    score: 83,
  },
  {
    name: "Bogdan",
    score: 23,
  },
  {
    name: "Denis",
    score: 43,
  },
  {
    name: "Ali",
    score: 91,
  },
  {
    name: "Ruslan",
    score: 70,
  },
];

// const sortedStudents = students2.sort((a, b) => b.score - a.score)
// console.log(sortedStudents);

//localeCompare
// const sortedByNames = [...students2].sort ((a,b) => a.name.localeCompare(b))
// console.log(sortedByNames);




//Reduce
// let sum = 0;
// for(let i = 0; i < clients.length; i++){
//   sum += clients[i].salary;
// }
// console.log(sum);
// const total = clients.reduce((previousValue, element, ind, array) => {
//   console.log("previousValue", previousValue)
//   console.log("element", element)
//   return previousValue + element.salary;
// },0);
// console.log(total);

const fruits2 = ['apple',
  'apple',
  'orange',
  'watermelon',
  'apple',
  'banana',
  'peach',
  'banana'
];
// const newFruits = fruits2.reduce((previousValue, fruit) => {
//   if(previousValue[fruit]){
//     previousValue[fruit] += 1;
//   }
//   else{
//     previousValue[fruit] = 1;
//   }
//   return previousValue;
// }, {});
// console.log(newFruits);

// const fruitObj = fruits2.reduce((countObj, fruit) =>{
//   countObj[fruit] = countObj[fruit] ? countObj[fruit] +1 : 1;
//   return countObj;
// }, {})
// console.log(fruitObj);

const tweets = [  
  { id: "000", likes: 5, tags: ["js", "nodejs"] },  
  { id: "001", likes: 2, tags: ["html", "css"] },  
  { id: "002", likes: 17, tags: ["html", "js", "nodejs"] },  
  { id: "003", likes: 8, tags: ["css", "react"] },  
  { id: "004", likes: 0, tags: ["js", "nodejs", "react"] },
];

const tweetsReduce = tweets.reduce((countObj, tweet) => countObj.concat(tweet.tags), []);

const finalTweets = tweetsReduce.reduce((countObj, tweet) => {
  countObj[tweet] = countObj[tweet] ? countObj[tweet] + 1 : 1;
  return countObj;
}, {})
console.log(finalTweets);
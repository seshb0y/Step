// Promise 

// Pending - в ожидании
// Fulfilled - выполнено с каким-либо результатом
 // Rejected - отмененно с какой-либо ошибкой

 // Settled - fulfilled or rejected

 const isSuccess = true;

 const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(isSuccess){
            resolve('Success!')
        }
        else{
            reject('Incorrect value')
        }
    }, 2000)
 })

 console.log(promise)
 promise.then((response) => {
    console.log(response)
 })

// promise(onResolve, onReject)
// promise.then(
//     (response) => {
//         console.log("response", response);
//     },
//     (error) => {
//         console.log("error", error);
//     }
// );

// const { default: axios } = require("axios");
import axios from "axios";

// promise
//     .then((res) => {
//         console.log("res", res);
//     })
//     .catch((err) => console.log("err", err))
//     .finally(() => {
//         console.log("Finally");
//     });

// promise
//     .then((res) => {
//         return `${res} For our Client`;
//     })
//     .then((res) => {
//         console.log("res", res);
//     })
//     .catch((err) => console.log("err", err));

// console.log("first");

// export const fetchUserDataFromServer = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       if(resolve){
//         console.log("Success")
//       }
//       else{
//         reject(console.log("Error"));
//       }
//     }, 3000)
//   })
// }
// fetchUserDataFromServer("Namiq").then((res)=>{
//   console.log(res);
// }).catch((err) => console.log(err));


// Fetch API

// const users = fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     const ul = document.createElement("ul");
//     res.forEach(element => {
//       const li = document.createElement("li");
//       const secondUl = document.createElement("ul");
//       const id = document.createElement("li");
//       const name = document.createElement("li");
//       const username = document.createElement("li");
//       const email = document.createElement("li");
//       const phone = document.createElement("li");
//       const website = document.createElement("li");

//       id.textContent = element.id;
//       secondUl.append(id);
//       name.textContent = element.name;
//       secondUl.append(name);
//       username.textContent = element.username;
//       secondUl.append(username);
//       email.textContent = element.email;
//       secondUl.append(email);
//       phone.textContent = element.phone;
//       secondUl.append(phone);
//       website.textContent = element.website;
//       secondUl.append(website);
      
//       li.append(secondUl);
//       secondUl.style.marginBottom = "20px";
//       ul.append(li);
//     });
    
//     document.querySelector("#app").append(ul)
//   })
//   .catch((err) => console.log(err));


// const searchParams = new URLSearchParams({
//   _limit: 3,
//   _sort: "name",
//   _page: 3,
// });

// const url = `https://jsonplaceholder.typicode.com/users?${searchParams.toString()}`;

// const options = {
//   method: "GET",
//   body: {
//     id: "1",
//     name: "Kerim",
//   },
//   headers: {
//     "content-type": "application/json",
//   },
// }

// fetch(url, options)
// .then((res) => res.json())
// .then((res) => console.log(res));

// axios.default.baseURL = "https://jsonplaceholder.typicode.com";

// axios.get("/users").then((response) => console.log("response", response.data))

const fetchAsync = async () => {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await resp.json();
    const ul = document.createElement("ul");
    data.forEach(element => {
      const li = document.createElement("li");
      const secondUl = document.createElement("ul");
      const id = document.createElement("li");
      const name = document.createElement("li");
      const username = document.createElement("li");
      const email = document.createElement("li");
      const phone = document.createElement("li");
      const website = document.createElement("li");
  
      id.textContent = element.id;
      secondUl.append(id);
      name.textContent = element.name;
      secondUl.append(name);
      username.textContent = element.username;
      secondUl.append(username);
      email.textContent = element.email;
      secondUl.append(email);
      phone.textContent = element.phone;
      secondUl.append(phone);
      website.textContent = element.website;
      secondUl.append(website);
      
      li.append(secondUl);
      secondUl.style.marginBottom = "20px";
      ul.append(li);
    })
    document.querySelector("#app").append(ul)
  } catch (error){
    console.log(error);
  }
}

fetchAsync()
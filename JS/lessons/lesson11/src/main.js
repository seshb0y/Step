import { footer } from './components/footer';
import './style.css'
import { toDoList } from './components/toDoList';
import { addTask } from './utilities/addTask';


footer()
await toDoList();
addTask()

// const promise = new Promise((resolve, reject) => {
//   // Внутри этой функции вызывается либо resolve, либо reject
// });


//pending, rejected, fulfilled
// then, finally, catch

// Promise.all, Promise.race, Promise.allSettled, Promise.any

// const fetchData = async () => {
//     const url = [
//     'https://jsonplaceholder.typicode.com/posts',
//     'https://jsonplaceholder.typicode.com/users',
//     'https://jsonplaceholder.typicode.com/todos',
//     'https://jsonplaceholder.typicode.com/commentss',
//   ];

//   try {
//     const result = await Promise.all(
//       url.map(async (url) => {
//         const res = await fetch(url);
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//     );
//     console.log(result);
//   }catch(error){
//     console.log('not found');
//   }
// }
// fetchData();

// const promises = [
//   new Promise((resolve) => setTimeout(() => resolve('result 1'), 1000)),
//   new Promise((_, reject) => setTimeout(() => reject('result 2'), 500)),
//   new Promise((resolve) => setTimeout(() => resolve('result 3'), 2000)),
//   new Promise((resolve) => setTimeout(() => resolve('result 4'), 4000)),
// ];

// Promise.race(promises).then((res) => console.log(res)).catch((err) => console.log(err))

// Promise.any(promises).then((res) => console.log(res)).catch((err) => console.log(err))



// Swal.fire({
//   title: 'Enter your input',
//   input: 'text', 
//   inputPlaceholder: 'Type something...',
//   showCancelButton: true,
//   confirmButtonText: 'Confirm',
//   cancelButtonText: 'Cancel', 
// });
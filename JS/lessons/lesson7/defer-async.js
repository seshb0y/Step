console.log("test");

// document.getElementById("root");

document.querySelector("div");
document.querySelector(".container");
const root = document.querySelector("#root");

// create an element
const description = document.createElement("p");
// description
// before
/*
<div>
   //prepend
   <o></o>
   //append
</div>
*/
// after
root.insertAdjacentHTML("afterbegin", description);

description.remove();

// textContent
// innerHTML = <p>Text Content <span></span> <div></div></p>
// innerHtml = ''


// Normal flow
// 1 - html parsing
// breads on js code
// 2 - download js
// 3 - execute js
// 4 - html parsing

// Async flow 
// 1 - html parse
// 1 - download js
// 2 - execute js
// 3 - parse html

// Defer flow
// 1 - html parse
// 1 - download js
// 2 - execute js 
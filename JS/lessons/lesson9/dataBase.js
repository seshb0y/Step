// localStorage.setItem("name", "Namiq");
 
// const name = localStorage.getItem("name");
// console.log("name", name);
 
// localStorage.removeItem("name");
// console.log("name after remode", localStorage.getItem(name));
 
// // objects
 
// const settings = {
//   theme: "dark",
//   isAuthenticated: false,
//   options: [1, 2, 3, 4],
// };
 
// localStorage.setItem("settings", JSON.stringify(settings));
 
// const localSettings = localStorage.getItem("settings");
// const parsedSetting = JSON.parse(localSettings);
// console.log("parsed settings", parsedSetting);
 
// // Clear All
 
// localStorage.setItem("ui-theme", "light");
// localStorage.setItem("sidebar", "expanded");
// localStorage.setItem("notification-level", "mute");
 
// localStorage.clear();
 
const input = document.querySelector(".input");
const btn = document.querySelector(".input__button");
const ul = document.querySelector(".dataList");
input.addEventListener("submit", () => {
  localStorage.setItem("inputData", input.value);
  input.value = "";
  const li = document.createElement("li");
  const localSettings = localStorage.getItem("inputData");
  li.textContent = localSettings;
  ul.appendChild(li);
});
// btn.addEventListener("click", () => {
//   for (let i = 0; i < ul.children.length; i += 1) {
//     ul.children[i].removeChild();
//   }
//   localStorage.clear();
// });
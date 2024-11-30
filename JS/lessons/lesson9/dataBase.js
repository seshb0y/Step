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

// btn.addEventListener("click", () => {
//   localStorage.setItem("inputData", input.value);
//   input.value = "";
//   const li = document.createElement("li");
//   const localSettings = localStorage.getItem("inputData");
//   li.textContent = localSettings;
//   ul.appendChild(li);
// });
// btn.addEventListener("click", () => {
//   for (let i = 0; i < ul.children.length; i += 1) {
//     ul.children[i].removeChild();
//   }
//   localStorage.clear();
// });


btn.addEventListener("click", () => {
  const li = document.createElement("li");
  const localDataList = localStorage.getItem("inputData");
  const listItems = localDataList ? JSON.parse(localDataList) : [];
  listItems.push(input.value);
  localStorage.setItem("inputData", JSON.stringify(listItems));
  li.textContent = input.value;
  ul.appendChild(li);
  input.value = "";
});
function loadLocalData(){
  const localDataList = localStorage.getItem("inputData");
  if (localDataList) {
    const listItems = JSON.parse(localDataList);
    listItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li); 
    });
  }
}
document.addEventListener("DOMContentLoaded", loadLocalData);


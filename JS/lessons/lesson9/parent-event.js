const container = document.querySelector(".container");
const output = document.querySelector(".output");
 
const selectButton = (event) => {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  console.dir(event.target);
  const selectedColor = event.target.dataset.color;
  const outputText = `Selected button color ${selectedColor}`;
  output.textContent = outputText;
  output.style.color = selectedColor;
};
container.addEventListener("click", selectButton);
 
const generateBtns = () => {
  const btns = [];
  for (let i = 0; i < 30; i += 1) {
    const color = getRandomHexColor();
    const item = document.createElement("button");
    item.type = "button";
    item.style.width = "50px";
    item.style.height = "50px";
    item.style.marginLeft = "10px";
    item.dataset.color = color;
    item.style.backgroundColor = color;
    item.classList.add("item");
    btns.push(item);
  }
  container.append(...btns);
};
function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
generateBtns();
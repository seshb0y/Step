// const list = document.querySelector(".list")
// console.log("list", list);
// const selectedItem = list.children[0];
// console.log("selectedItem", selectedItem);

// const listItems = document.querySelectorAll(".list__item");
// console.log("listItems", listItems);

// selectedItem.style.fontSize = "36px";
// selectedItem.style.color = "red";

// const image = document.querySelector(".image");

// image.src = "https://picsum.photos/id/237/300/200";
// image.alt = "dog";
// image.width = "400";


// //textContent
// selectedItem.textContent = "new info for test";

// // classList
// selectedItem.classList.remove("second-class");
// selectedItem.classList.add("third-class");
// selectedItem.classList.toggle("list__item");//добавляет класс к элементу,
// selectedItem.classList.toggle("toggle_class");//если его нет, и удаляет, если он есть
// selectedItem.classList.replace(`first-class`, `first-class-updated`);
// selectedItem.classList.contains("list__item");


// //Attributes
// const hasSrc = image.hasAttribute(`src`);
// const srcValue = image.getAttribute("src");
// image.setAttribute("height", "280");
// image.removeAttribute("width");
// image.attributes;


// // Create Element
// const secondHead = document.createElement("h2");
// secondHead.textContent = "List Tittle";
// secondHead.style.color = "green"
// secondHead.style.fontWeight = "700"
// secondHead.style.fontSize = "32px";

// //Add secondHead to document
// //elem.append(secondHead)
// //elem.prepend(secondHead)
// //elem.after(secondHead)
// //elem.before(secondHead)

// const listContainer = document.querySelector(`container`);
// listContainer.before(secondHead);


// const divContainer = document.createElement("div");
// divContainer.style.backgroundColor = "green";
// // divContainer.style.backgroundRepeat = "no-repeat";
// // divContainer.style.backgroundSize = "100%";
// divContainer.style.alignItems = "center";
// divContainer.style.justifyContent = "center";
// divContainer.style.gap = "2000px";
// divContainer.style.width = "450px";

// const image = document.createElement("img");
// image.setAttribute("src", "https://s3-alpha-sig.figma.com/img/5002/1c76/c497a03229364f34d1cfcaa710a37ada?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y5iOLdPkIjMK5bllLKSVdoI4pHEDQMiE2rcfg76P9YokLe~ceez16GWM1Hl3AoYVnPoFkbFfVjC8O-u9kezox3YOFO4trxtrvYyt7unbFkJ2vnyYsvw7hucHWTdccqt6Aoxh~XBJgf~52uYLlyns5czb0SPuAAgiIPkawdG5yVDwakFIqwklq~oPJmxPfsRXHTdKB7JPfQOrKPAnet2duhkkAWIka6VokEBYt-JVBRK7NlQWhA~Jjam59TQeaGbZKQ8kwFOi45skvO9BZaOXBrwL6XTtyJQT2NMF9wlS8O8anm0-8eo2TuCviBKHFjs86CiR3x0tLuDs5TZ2DdETVw__")
// image.style.width = "322px";
// image.style.height = "239px";
// image.style.marginTop = "23px";
// image.style.marginLeft = "100px";


const thirdHead = document.createElement("h3");
thirdHead.textContent = "Gets things done with to do";
thirdHead.style.marginTop = "53px";
thirdHead.style.marginLeft = "100px";

// const fourthHead = document.createElement("h4");
// fourthHead.textContent = "Lorem ipsum dolor sit amet consectetur. Enim.";
// fourthHead.style.fontSize = "16px"
// fourthHead.style.alignItems = "center"
// fourthHead.style.marginTop = "62px";
// fourthHead.style.marginLeft = "100px";
// fourthHead.style.marginRight = "200px"

// const btn = document.createElement("button");
// btn.style.width = "320px";
// btn.style.height = "52px";
// btn.style.top = "789px";
// btn.style.left = "100px";
// btn.style.marginTop = "78px";
// btn.style.marginLeft = "55px";
// btn.style.marginBottom = "55px"


const body = document.querySelector("body");
// body.append(thirdHead);
// divContainer.append(image);
// divContainer.append(thirdHead);
// divContainer.append(fourthHead);
// divContainer.append(btn);


// Оптимизация DOM / Repaint / Reflow
// Repaint - легкая операция - стили, цвет, прозрачность
// Reflow - тяжелая операция - меняется позиционирование, размеры, удаление и перезапись


// innerHtml
// const title = document.querySelector(".tittle");
// console.log('title.innerHTML', title.innerHTML);
// title.innerHTML = "Hello my <span class='accent'>friends</span>";

// const footer = document.querySelector(".footer");
// const markup = '<h2 class="footer__tittle">Footer tittle</h2><p class="description">Some Basic information</p>';

// title.innerHTML = markup;



// const technologies = ["Css", "HTML", "JS", "React", "NextJS", "Node"];
// const techListArray = technologies.map(
//     (tech) => `<li class="list__item"><p>${tech}</p></li>`).join("");

// const list = document.createElement("ul");
// list.setAttribute("class", "tech__list");
// document.body.append(list);
// const techList = document.querySelector(".tech__list");
// techList.innerHTML = techListArray;


// insertedAdjacentHTML(position, string)
// position = 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

// --beforebegin-- <div> --afterbegin-- <h2>Hello</h2> --beforeend-- </div> --afterend--

// techList.insertAdjacentElement("afterbegin", thirdHead);

const section = document.createElement("section");
const thirdHeader = document.createElement("h3");
thirdHeader.textContent = "What makes our brand different";
thirdHeader.style.marginLeft = "250px";
section.appendChild(thirdHeader);
const factors = ["Next day as standard", "Made by true artisans", "Unbeatable prices", "Recycled packaging"];
const factorsArr = factors.map((factor) => `<li class= "list__item" style="margin-right: 50px;"><p>${factor}</p></li>`).join("");

const ul = document.createElement("ul");
ul.setAttribute("class", "factors__list")
document.body.appendChild(section);
section.appendChild(ul);
ul.style.display = "flex";
const factorsList = document.querySelector(".factors__list");
console.log(factorsList)
factorsList.innerHTML = factorsArr;
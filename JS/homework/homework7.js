// // Задача - 1: Создание интерфейсных элементов с помощью
// // JavaScript
// // В этом упражнении вы создадите набор функций для генерации различных
// // интерфейсных элементов с использованием JavaScript. Каждая функция будет
// // создавать определенный тип элемента с заданными параметрами и возвращать его в
// // виде DOM-элемента.
// // Генерация карточки товара:
// // Напишите функцию createProductCard, которая принимает следующие параметры:
// // ● productName: строка, название товара.
// // ● price: строка, цена товара.
// // ● imageUrl: строка, URL изображения товара.
// // Функция должна создать карточку товара, содержащую изображение товара, название
// // и цену, и возвратить эту карточку в виде DOM-элемента.
// function createProductCard(productName, price, imageUrl){

//     const cardContainer = document.createElement("div");
//     cardContainer.style.width = "225px";
//     cardContainer.style.height = "250px";
//     cardContainer.style.backgroundColor = "yellow";

//     const cardImage = document.createElement("img");
//     cardImage.setAttribute("src", imageUrl);
//     cardImage.style.height = "100px";
//     cardImage.style.margin = "12px";

//     const cardProductName = document.createElement("h3");
//     cardProductName.textContent = productName;
//     cardProductName.style.margin = "12px"

//     const cardPrice = document.createElement("p");
//     cardPrice.textContent = price;
//     cardPrice.style.marginLeft = "12px"

//     cardContainer.appendChild(cardImage);
//     cardContainer.appendChild(cardProductName);
//     cardContainer.appendChild(cardPrice);

//     document.body.appendChild(cardContainer);
// }
// createProductCard("маккароны с сыром", "1000$", "https://images.boosty.to/image/5d4fa127-401c-4449-bec2-fc69b8cff67b?change_time=1704297553&croped=1&mh=300&mw=480")



// // Создание сообщения комментария:
// // Напишите функцию createCommentMessage, которая принимает следующие
// // параметры:
// // ● author: строка, имя автора комментария.
// // ● message: строка, текст комментария.
// // ● timestamp: строка, временная метка комментария.
// // Функция должна создать сообщение комментария, содержащее имя автора, текст
// // комментария и временную метку, и возвратить это сообщение в виде DOM-элемента.
// function createCommentMessage(author, message, timestamp){
//     const msgContainer = document.createElement("div");
//     msgContainer.setAttribute("class", "container");
//     msgContainer.style.width = "150px";
//     msgContainer.style.height = "150px";
//     msgContainer.style.backgroundColor = "green";
//     msgContainer.style.overflowWrap = "break-word";


//     const msgAuthor = document.createElement("h2");
//     msgAuthor.textContent = author + ':';

//     const msgText = document.createElement("p");
//     msgText.textContent = message;
    
//     const msgTimestamp = document.createElement("p");
//     msgTimestamp.textContent = timestamp;

//     msgContainer.appendChild(msgAuthor);
//     msgContainer.appendChild(msgText);
//     msgContainer.appendChild(msgTimestamp);

//     document.body.appendChild(msgContainer);
// }
// createCommentMessage("test", "asfasgsadgsa5d1g+asd414sdg1sda65g1as  ", "21:50:23");

// // Генерация элемента меню:
// // Напишите функцию createMenuItem, которая принимает следующие параметры:
// // ● name: строка, название блюда в меню.
// // ● price: строка, цена блюда.
// // ● description: строка, описание блюда.
// // Функция должна создать элемент меню, содержащий название блюда, цену и
// // описание, и возвратить этот элемент в виде DOM-элемента.
// // Ваша задача заключается в том, чтобы реализовать эти три функции таким образом,
// // чтобы они создавали корректную HTML-разметку с заданными параметрами, и
// // использовать их для создания интерфейсных элементов на веб-странице.
// function createMenuItem(name, price, description){
//     const cardContainer = document.createElement("div");
//     cardContainer.style.width = "150px";
//     cardContainer.style.height = "150px";
//     cardContainer.style.backgroundColor = "red";
//     cardContainer.style.overflowWrap = "break-word";

//     const cardProductName = document.createElement("h3");
//     cardProductName.textContent = name;
//     cardProductName.style.margin = "12px"

//     const cardPrice = document.createElement("p");
//     cardPrice.textContent = price;
//     cardPrice.style.marginLeft = "12px"

//     const cardDescription = document.createElement("h3");
//     cardDescription.textContent = description;
//     cardDescription.style.height = "100px";
//     cardDescription.style.margin = "12px";

//     cardContainer.appendChild(cardProductName);
//     cardContainer.appendChild(cardPrice);
//     cardContainer.appendChild(cardDescription);

//     document.body.appendChild(cardContainer);
// }
// createMenuItem("спагетти","324$", "asgfsadgsaedghasdg651521");


const header = document.createElement("div");
header.style.width = "1800px";
// header.style.border = "2px solid black";

const topRow = document.createElement("div");
topRow.style.display = "flex";
topRow.style.justifyContent = "space-between";
topRow.style.alignItems = "center";

const loupeBtn = document.createElement("button");
loupeBtn.style.margin = "26px 125px 30px 50px";
loupeBtn.style.width = "16px";
loupeBtn.style.height = "16px";
loupeBtn.style.backgroundColor = "rgb(42, 17, 75)"

const cartBtn = document.createElement("button");
cartBtn.style.margin = "26px 0px 30px 125px";
cartBtn.style.width = "16px";
cartBtn.style.height = "16px";
cartBtn.style.backgroundColor = "rgb(42, 17, 75)"

const avatarBtn = document.createElement("button");
avatarBtn.style.margin = "26px 0px 30px 0px";
avatarBtn.style.width = "16px";
avatarBtn.style.height = "16px";
avatarBtn.style.backgroundColor = "rgb(42, 17, 75)"

const head = document.createElement("h1");
head.style.margin = "20px 688px 30px 530px";
head.style.width = "65px";
head.style.height = "30px";
head.textContent = "Avion";
head.style.fontWeight = "400";
head.style.fontFamily = "Clash Display";
head.style.fontSize = "24px";
head.style.lineHeight = "30px";

const line = document.createElement("hr");
line.style.width = "96%";
line.style.margin = "0px 26px 0px 28px";
line.style.border = "1px solid rgba(0, 0, 0, 0.1)"
// line.style.color = "yellow";
line.style.display = "block";

const bottomRow = document.createElement("div");
bottomRow.style.margin = "0px 383px 20px 383px";
bottomRow.style.width = "850px";
// bottomRow.style.backgroundColor = "black"

const bottomRowText = ["Plant pots", "Ceramics", "Tables", "Chairs", "Crockery", "Tableware", "Cutlery"];
const bottomRowTextArr = bottomRowText.map((text) => `<li class= "list__item" style="margin-right: 50px;"><p>${text}</p></li>`).join("");
const bottomRowUl = document.createElement("ul");
bottomRowUl.setAttribute("class", "bottomRow__items");
bottomRowUl.style.width = "1000px";
bottomRowUl.style.height = "22px";
bottomRowUl.style.listStyleType = "none";
bottomRowUl.style.fontFamily = "Satoshi";
bottomRowUl.style.fontSize = "20px";
bottomRowUl.style.lineHeight = "22px";
bottomRowUl.style.display = "flex";
bottomRowUl.style.color = "rgb(114, 110, 141)"
bottomRow.appendChild(bottomRowUl);
bottomRowUl.innerHTML = bottomRowTextArr;


topRow.appendChild(loupeBtn);
topRow.appendChild(head);
topRow.appendChild(cartBtn)
topRow.appendChild(avatarBtn);
header.appendChild(topRow);
header.appendChild(line);
header.appendChild(bottomRow);

document.body.appendChild(header);



const main = document.createElement("div");
main.style.width = "1800px";
main.style.height = "1000px";
// main.style.border = "2px solid black";
main.style.backgroundImage = "url(https://s3-alpha-sig.figma.com/img/b062/f355/fa9b27255272d76e665cce4314b4aedb?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BgVOsKnDnkgyf~BDAR02MC7pceIRi7gxb8OT0bsQvDTM1DWxzR9L6WA2IvmEd8uhLn4vfmgo1avljEbWiv0KgmcMjWjAaLYZfzt4y3XJOhUMt9Gzzfw8XosqwtlpcFv9XDfOlX0t3o9HZ8wtRI-aizTIgTAAE1acUNgea~9wK3ebyAJCJASFJkfC7qVNGpfyT303U~yHxtV2FVs7sllw2PVwG92DVGv6edxOY84qE1Eq8rBmErf~x62wIv6OO4COt0QsrbNRJjvjvd3SislzyAB1IQ-DL65E8ZwCRbIOpaERVyvSy-oGynQI53mfnnsU23k20avJ~uAvsJpsrK-qsw__)";
main.style.backgroundSize = "100% 100%";
main.style.position = "relative"
// main.style.margin = "20px 20px 20px 40px";

// const mainFirstImage = document.createElement("img");
// mainFirstImage.src = "https://s3-alpha-sig.figma.com/img/b062/f355/fa9b27255272d76e665cce4314b4aedb?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BgVOsKnDnkgyf~BDAR02MC7pceIRi7gxb8OT0bsQvDTM1DWxzR9L6WA2IvmEd8uhLn4vfmgo1avljEbWiv0KgmcMjWjAaLYZfzt4y3XJOhUMt9Gzzfw8XosqwtlpcFv9XDfOlX0t3o9HZ8wtRI-aizTIgTAAE1acUNgea~9wK3ebyAJCJASFJkfC7qVNGpfyT303U~yHxtV2FVs7sllw2PVwG92DVGv6edxOY84qE1Eq8rBmErf~x62wIv6OO4COt0QsrbNRJjvjvd3SislzyAB1IQ-DL65E8ZwCRbIOpaERVyvSy-oGynQI53mfnnsU23k20avJ~uAvsJpsrK-qsw__";
// mainFirstImage.style.height = "1000px";
// mainFirstImage.style.width = "1800px";

const mainInfoView = document.createElement("div");
mainInfoView.style.width = "800px";
mainInfoView.style.height = "600px";
mainInfoView.style.backgroundColor = "white";
mainInfoView.style.margin = "130px 80px 130px 900px";
mainInfoView.style.zIndex = "999";
mainInfoView.style.position = "absolute";
mainInfoView.style.backgroundColor = "white";
// mainInfoView.style.border = "1px solid black"

const infoViewHead = document.createElement("h2");
infoViewHead.textContent = "Luxury homeware for people who love timeless design quality";
infoViewHead.style.margin = "48px 61px 20px 56px";
infoViewHead.style.fontFamily = "'Clash Display', sans-serif";
infoViewHead.style.fontSize = "42px";

const infoViewText = document.createElement("p");
infoViewText.textContent = "Shop the new Spring 2022 collection today";
infoViewText.style.fontFamily = "'Satoshi', sans-serif";
infoViewText.style.fontSize = "25px";
infoViewText.style.margin = "0 231px 259px 56px"
infoViewText.style.color = "rgb(91, 86, 118)";

const infoViewBtn = document.createElement("button");
infoViewBtn.style.margin = "0 0px 0px 56px";
infoViewText.style.padding = "16px 32px 16px 32px";
infoViewBtn.style.width = "170px";
infoViewBtn.style.height = "56px";
infoViewBtn.style.backgroundColor = "rgb(249, 249, 249)";
infoViewBtn.textContent = "View collection";
infoViewBtn.style.color = "rgb(42, 37, 75)";

mainInfoView.appendChild(infoViewHead);
mainInfoView.appendChild(infoViewText);
mainInfoView.appendChild(infoViewBtn);
main.appendChild(mainInfoView);
document.body.appendChild(main);

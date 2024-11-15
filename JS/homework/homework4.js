// Задание 1
// Создать массив «Список покупок». Каждый элемент массива
// является объектом, который содержит название продукта, необходимое количество и куплен или нет. Написать несколько функций для работы с таким массивом.


// const purchase1 = {
//     name: 'banana',
//     amountNeed: 3,
//     isBuy: false,
// }
// const purchase2 = {
//     name: 'chocolate',
//     amountNeed: 0,
//     isBuy: true,
// }
// const purchase3 = {
//     name: 'apple',
//     amountNeed: 7,
//     isBuy: false,
// }
// const purchase4 = {
//     name: 'bread',
//     amountNeed: 0,
//     isBuy: true,
// }
// const purchase5 = {
//     name: 'meet',
//     amountNeed: 6,
//     isBuy: false,
// }

// const purchasesArr = [ purchase1, purchase2, purchase3, purchase4, purchase5]

// 1. Вывод всего списка на экран таким образом, чтобы сначала
// шли некупленные продукты, а потом – купленные.
// function filteredPurchasesArr(arr){
//     for(let i = 0; i < arr.length; i += 1){
//         if(arr[i].isBuy != true){
//             console.log(arr[i]);
//         }
//     }
//     for(let i = 0; i < arr.length; i += 1){
//         if(arr[i].isBuy){
//             console.log(arr[i]);
//         }
//     }
// };
// filteredPurchasesArr(purchasesArr);

// 2. Добавление покупки в список. Учтите, что при добавлении
// покупки с уже существующим в списке продуктом, необходимо увеличивать количество в существующей покупке,
// а не добавлять новую.
// function addPurchase(arr, purchase){
//     for(let i = 0; i < arr.length; i += 1){
//                 if(arr[i].name === purchase.name){
//                     arr[i].amountNeed += 1;
//                     return;
//                 }
//     }
//     return arr.push(purchase);
// }

// 3. Покупка продукта. Функция принимает название продукта
// и отмечает его как купленный.
// function changeBuyStatus(arr, ind){
//     if(arr[ind].isBuy){
//         arr[ind].isBuy = false;
//     }
//     else{
//         arr[ind].isBuy = true
//     }
// }





// Задание 2
// Создать массив, описывающий чек в магазине. Каждый элемент массива состоит из названия товара, количества и цены за
// единицу товара. Написать следующие функции.
// const bill1 = {
//     name: 'banana',
//     amount: 3,
//     price: 12,
// }
// const bill2 = {
//     name: 'chocolate',
//     amount: 6,
//     price: 8,
// }
// const bill3 = {
//     name: 'apple',
//     amount: 7,
//     price: 12,
// }
// const bill4 = {
//     name: 'bread',
//     amount: 1,
//     price: 14,
// }
// const bill5 = {
//     name: 'meet',
//     amount: 6,
//     price: 5,
// }

// const billArr = [ bill1, bill2, bill3, bill4, bill5]
// 1. Распечатка чека на экран.
// function showBills(arr){
//     for(let i = 0; i < arr.length; i += 1){
//         console.log(arr[i]);
//     }
// }
// showBills(billArr);
// 2. Подсчет общей суммы покупки.
// function billSum(arr){
//     let sum = 0;
//     for(let i = 0; i < arr.length; i += 1){
//         sum += arr[i].price * arr[i].amount;
//     }
//     return sum;
// }
// console.log(billSum(billArr));

// 3. Получение самой дорогой покупки в чеке.
// function maxBill(arr){
//     let sum = arr[0].amount * arr[0].price;
//     for(let i = 1; i < arr.length; i += 1){
//         if(sum < arr[i].price * arr[i].amount)
//         {
//             sum = arr[i].price * arr[i].amount;
//         }

//     }
//     return sum;
// }
// console.log(maxBill(billArr));

// 4. Подсчет средней стоимости одного товара в чеке.
// function midBill(arr){
//     let sum = 0;
//     let count = 0;
//     for(let i = 0; i < arr.length; i += 1){
//         sum += arr[i].price * arr[i].amount;
//         count += 1;

//     }
//     return sum / count;
// }
// console.log(midBill(billArr));



// Задание 3
// Создать массив css-стилей (цвет, размер шрифта, выравнивание, подчеркивание и т. д.). Каждый элемент массива – это объект, состоящий из двух свойств: название стиля и значение стиля.
// const cssStyles = [
//     { name: "color", value: "red" },
//     { name: "font-size", value: "16px" },
//     { name: "text-align", value: "center" },
//     { name: "text-decoration", value: "underline" },
//     { name: "background-color", value: "blue" },
//     { name: "margin", value: "10px" },
//     { name: "padding", value: "5px" }
// ];
// Написать функцию, которая принимает массив стилей и
// текст, и выводит этот текст с помощью document.write() в тегах
// <p></p>, добавив в открывающий тег атрибут style со всеми стилями, перечисленными в массиве.
// function docWrite(arr, text){
//     const styleString = arr.map(style => `${style.name}: ${style.value}`).join("; ");
//     const html = `<p style="${styleString}">${text}</p>`;
//     document.write(html);
// }
// docWrite(cssStyles, "proverka");


// Задание 4
// Создать массив аудиторий академии. Объект-аудитория состоит из названия, количества посадочных мест (от 10 до 20) и
// названия факультета, для которого она предназначена.
const audienceArr = [
    {name: 100, places: 15, fac: "a1"},
    {name: 101, places: 15, fac: "a2"},
    {name: 102, places: 17, fac: "a1"},
    {name: 103, places: 14, fac: "a2"},
    {name: 104, places: 18, fac: "a2"},
    {name: 105, places: 19, fac: "a1"},
];
// Написать несколько функций для работы с ним.
// 1. Вывод на экран всех аудиторий.
// function showAud(arr){
//     for(let i = 0; i < arr.length; i += 1){
//         console.log(arr[i]);
//     }
// }
// showAud(audienceArr);
// 2. Вывод на экран аудиторий для указанного факультета.
// function showFac(arr, fac){
//     for(let i = 0; i < arr.length; i += 1){
//         if(arr[i].fac === fac){
//             console.log(arr[i]);
//         }
        
//     }
// }
// showFac(audienceArr, "a1");

// 3. Вывод на экран только тех аудиторий, которые подходят для
// переданной группы. Объект-группа состоит из названия,
// количества студентов и названия факультета.
// const group = {
//     name: 101,
//     students: 15,
//     fac: "a2",
// };
// function findByGroup(group, arr){
//     for(let i = 0; i < arr.length; i += 1){
//         if(arr[i].fac === group.fac && arr[i].name === group.name && arr[i].places === group.students){
//             console.log(arr[i]);
//         }
//     }
// }
// findByGroup(group, audienceArr);
// 4. Функция сортировки аудиторий по количеству мест.
// function audSort(arr){
//     const sorted = arr.sort((a, b) => a.places - b.places);
//     console.log(sorted);
// }
// audSort(audienceArr);
// 5. Функция сортировки аудиторий по названию (по алфавиту).
function audSortByName(arr){
    const sorted = [...audienceArr].sort((a, b) => a.name.localeCompare(b.name));
    console.log(sorted);
}
// параметр name нужно сделать string
audSortByName(audienceArr);

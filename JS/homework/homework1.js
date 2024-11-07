// 1. Запросите у пользователя его имя и выведите в ответ:
// «Привет, его имя!».
// let userName = prompt("enter your name");
// alert("hello, " + uName);

// 2. Запросите у пользователя год его рождения, посчитайте,
// сколько ему лет и выведите результат. Текущий год укажите
// в коде как константу.
// let birthDate = Number(prompt("enter your date of birth"));
// const year = 2024;
// alert(year - bd);

// 3. Запросите у пользователя длину стороны квадрата и выведите периметр такого квадрата.
// let square = Number(prompt("enter the size"));
// alert(square * 4);

// 4. Запросите у пользователя радиус окружности и выведите
// площадь такой окружности.
// let radius = Number(prompt("enter the radius"));
// alert(2 * Math.PI * r);

// 5. Запросите у пользователя расстояние в км между двумя
// городами и за сколько часов он хочет добраться. Посчитайте скорость, с которой необходимо двигаться, чтобы
// успеть вовремя.
// let distance = Number(prompt("enter the distance"));
// let time = Number(prompt("enter time"));
// alert(distance / time);

// 6. Реализуйте конвертор валют. Пользователь вводит доллары, программа переводит в евро. Курс валюты храните в
// константе.
// const euro = 1.5;
// const dollar = 0.5;

// let dollars = Number(prompt("enter count of dollars"));
// alert(dollars * dollar);


// 7. Пользователь указывает объем флешки в Гб. Программа
// должна посчитать сколько файлов размером в 820 Мб помещается на флешку.
// let size = Number(prompt("enter the size of card"));
// alert(size / 820);

// 8. Пользователь вводит сумму денег в кошельке и цену одной
// шоколадки. Программа выводит сколько шоколадок может
// купить пользователь и сколько сдачи у него останется.
// let uMoney = Number(prompt("enter the count of money"));
// let chocolate = Number(prompt("enter the cost of chocolate"));
// alert(Math.floor(uMoney / chocolate));
// alert(uMoney % chocolate);


// 9. Запросите у пользователя трехзначное число и выведите
// его задом наперед. Для решения задачи вам понадобится
// оператор % (остаток от деления).
// let num = Number(prompt("enter a number"));
// let firstNum = String(num % 10);
// num = Math.floor(num / 10);
// let secondNum = String(num % 10);
// num = Math.floor(num / 10);
// let thirdNum = String(num % 1000);
// let res = firstNum + secondNum + thirdNum;
// alert(res);

// 10. Запросите у пользователя целое число и выведите в ответ,
// четное число или нет. В задании используйте логические
// операторы. В задании не надо использовать if или switch.
// let trueFalse = ["true", "false"];
// let number = Number(prompt("enter the number"));
// alert(trueFalse[number % 2])
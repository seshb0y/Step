// 1. Написать функцию, которая принимает 2 числа и возвращает -1, если первое меньше, чем второе; 1 – если первое
// больше, чем второе; и 0 – если числа равны.
// function compare(a, b){
//     if(a > b || a == b)
//     {
//         if(a == b)
//         {
//             return 0;
//         }
//         return 1;
//     }
//     return -1
// }
// let res = compare(2, 2);
// console.log(res);
// alert(res)

// 2. Написать функцию, которая вычисляет факториал переданного ей числа.
// function fact(a){
//     let res = 1;
//     for(let i = 1; i <= a; i++){
//         res *= i;
//     }
//     return res
// }
// alert(fact(5))

// 3. Написать функцию, которая принимает три отдельные
// цифры и превращает их в одно число. Например: цифры
// 1, 4, 9 превратятся в число 149.
// function unite(a, b, c){
//     let res = String(a) + String(b) + String(c);
//     return Number(res);
// }
// alert(unite(1, 2, 3));

// 4. Написать функцию, которая принимает длину и ширину
// прямоугольника и вычисляет его площадь. Если в функцию
// передали 1 параметр, то она вычисляет площадь квадрата.
// function area(a, b){
//     if(arguments.length === 2){
//         return a * b;
//     }

//     return a**2;
// }
// alert(area(5, 2));
// alert(area(2));

// 5. Написать функцию, которая проверяет, является ли переданное ей число совершенным. Совершенное число – это
// число, равное сумме всех своих собственных делителей.
// function excellentNum(a){
//     let res = 0;
//     for(let i = 1; i <= a / 2; i++){
//         if(a % i == 0)
//         {
//             res += i;
//         }
//     }
//     if(res == a)
//     {
//         return true;
//     }
//     return false;
// }
// alert(excellentNum(496));

// 6. Написать функцию, которая принимает минимальное и
// максимальное значения для диапазона, и выводит только
// те числа из диапазона, которые являются совершенными.
// Используйте написанную ранее функцию, чтобы узнавать,
// совершенное число или нет.
// function excellentNumInRange(a, b){
//     let res = [];

//     for(let i = a+1; i <= b; i++){
//         if(excellentNum(i))
//             {
//                 res.push(i);
//             }
//     }
//     console.log(res)

// }
// console.log(excellentNumInRange(1, 10000));

// 7. Написать функцию, которая принимает время (часы, минуты, секунды) и выводит его на экран в формате «чч:мм:сс».
// Если при вызове функции минуты и/или секунды не были
// переданы, то выводить их как 00.
// function dateTime(hours, min = "00", sec = "00"){
//     console.log(hours,":", min, ":", sec);
// }
// console.log(dateTime(2, 42, 45));

// 8. Написать функцию, которая принимает часы, минуты и
// секунды и возвращает это время в секундах.
// function intoSeconds(hours, min, sec){
//     let secondsInHours = hours * 60 * 60;
//     let secondsInMin = min * 60;
//     return secondsInHours + secondsInMin + sec;
// }
// console.log(intoSeconds(5, 26, 36));

// 9. Написать функцию, которая принимает количество секунд,
// переводит их в часы, минуты и секунды и возвращает в
// виде строки «чч:мм:сс».
// function secConvert(seconds){
//     let hours = Math.floor(seconds / 60 / 60);
//     let min = Math.floor(seconds / 60 % 60);
//     let sec = Math.floor(seconds % 60);
//     console.log(hours,":",min,":",sec);
// }
// console.log(secConvert(65196));
// 10. Написать функцию, которая считает разницу между датами.
// Функция принимает 6 параметров, которые описывают 2
// даты, и возвращает результат в виде строки «чч:мм:сс». При
// выполнении задания используйте функции из предыдущих 2-х заданий: сначала обе даты переведите в секунды,
// узнайте разницу в секундах, а потом разницу переведите
// обратно в «чч:мм:сс».
// function timeDifference(hours1, min1, sec1, hours2, min2, sec2)
// {
//     let firstTimeInSeconds = intoSeconds(hours1, min1, sec1);
//     let secondTimeInSeconds = intoSeconds(hours2, min2, sec2);
//     let dif;
//     if(firstTimeInSeconds > secondTimeInSeconds)
//     {
//         dif = firstTimeInSeconds - secondTimeInSeconds;
//     }
//     else{
//         dif = secondTimeInSeconds - firstTimeInSeconds;
//     }
//     secConvert(dif);
// }
// console.log(timeDifference(5, 24, 53, 15, 16, 47));

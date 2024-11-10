// Во всех заданиях обязательно использовать рекурсию.
// 1. Написать функцию возведения числа в степень.
// function degree(num, deg){
//     if(deg >= 2)
//     {
//         return num * degree(num, deg - 1);
//     }
//     return num;   

// }
// console.log(degree(56, 8));

// 2. Написать функцию поиска наибольшего общего делителя.
// function gcd(a, b) {
//     if (b == 0) {
//         return a;
//     }
//     return gcd(b, a % b);
//   }
// console.log(gcd(90, 25))

// 3. Написать функцию для поиска максимальной цифры в числе.
// function maxDigit(num) {
//     num = num;
//     if (num < 10) {
//         return num;
//     } 
//     const lastDigit = num % 10;
//     return Math.max(lastDigit, maxDigit(Math.floor(num / 10)));
//   }
// console.log(maxDigit(12541))
// 4. Написать функцию, которая определяет простое ли переданное число.
// function isPrime(n, div = 2) {
//     if (div * div > n) {
//         return true;
//     }
//     if (n % div === 0) {
//         return false;
//       } 
//     return isPrime(n, div + 1);
//   }
// console.log(isPrime(181));

// 5. Написать функцию для вывода всех множителей переданного числа в возрастающем порядке.
// Например: число 18 – множители 2 * 3 * 3.
// function getMultipliers(n, div = 2, result = []) {
//     if (n == 1) {
//         return result;
//     }
//     if (n % div == 0) {
//         result.push(div);
//         return factors(n / div, div, result); 
//     }
//     return factors(n, div + 1, result);
//   }
//   console.log(getMultipliers(1654));

// 6. Написать функцию, которая возвращает число Фибоначчи
// по переданному порядковому номеру.
// Числа Фибоначчи: 1, 1, 2, 3, 5, 8, 13… Ряд основывается на
// том, что каждое число равно сумме двух предыдущих чисел.
// Например: порядковый номер 3 – число 2, порядковый
// номер 6 – число 8.
// function fibonacci(n) {
//     if (n <= 0) return 0;
//     if (n == 1) {
//         return 1;
//     }
//     return fibonacci(n - 1) + fibonacci(n - 2);
//   }
//   console.log(fibonacci(156));
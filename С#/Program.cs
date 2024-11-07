using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_22_05_2024
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Задание 1 Выведите на экран цитату Бьярна Страуструпа: 
            //    It's easy to win forgiveness for being wrong; being right 
            //    is what gets you into real trouble. Пример вывода: It's easy 
            //    to win forgiveness for being wrong; being right is what gets 
            //    you into real trouble. Bjarne Stroustrup
            //Console.WriteLine("it's easy to win forgiveness for being wrong;");
            //Console.WriteLine("being right is what gets you into real trouble.");
            //Console.WriteLine("Bkarne Stroustrup");

            ////Задание 2 Пользователь вводит с клавиатуры пять чисел. 
            ////    Необходимо найти сумму чисел, максимум и 
            ////    минимум из пяти чисел, произведение чисел. Результат вычислений вывести на экран.
            //int first = int.Parse(Console.ReadLine());
            //int second = int.Parse(Console.ReadLine());
            //int third = int.Parse(Console.ReadLine());
            //int fourth = int.Parse(Console.ReadLine());
            //int fifth = int.Parse(Console.ReadLine());
            //int sum = first+ second + third + fourth + fifth;
            //int dif = first - second - third - fourth - fifth;
            //int mult = first * second * third * fourth * fifth;
            //Console.WriteLine($"sum: {sum}");
            //Console.WriteLine($"difference: {dif}");
            //Console.WriteLine($"multiplie: {mult}");

            //Задание 3 Пользователь с клавиатуры вводит шестизначное число. 
            //    Необходимо перевернуть число и отобразить результат. 
            //    Например, если введено 341256, результат 652143.
            //string str = Console.ReadLine();
            //for (int i = -1 + str.Length; i > -1; i--)
            //{
            //    Console.Write(str[i]);
            //}
            //Console.WriteLine();

            //Задание 4 Пользователь вводит с клавиатуры границы числового диапазона.
            //    Требуется показать все числа Фибоначчи из этого диапазона. 
            //    Числа Фибоначчи — элементы числовой последовательности, в которой 
            //    первые два числа равны 0 и 1, а каждое последующее число равно сумме двух 
            //    предыдущих чисел. Например, если указан диапазон 0–20, результат будет: 
            //    0, 1, 1, 2, 3, 5, 8, 13.
            //int start = int.Parse(Console.ReadLine());
            //int end = int.Parse(Console.ReadLine());
            //int value = 1;
            //int num = value;
            //int res = num + value;
            //Console.Write($" {start} {value} {num}");
            //while (true)
            //{
            //    Console.Write($" {res}");
            //    value = num;
            //    num = res;
            //    res = num + value;
            //    if (res >= end) break;
            //}

            //Задание 5 Даны целые положительные числа A и B(A < B).Вывести все целые числа
            //    от A до B включительно; каждое число должно выводиться на новой строке;
            //при этом каждое число должно выводиться количество раз, равное его значению. 
            //    Например: если А = 3, а В = 7, то программа должна сформировать в консоли 
            //    следующий вывод: 3 3 3 4 4 4 4 5 5 5 5 5 6 6 6 6 6 6 7 7 7 7 7 7 7.
            //int A = int.Parse(Console.ReadLine());
            //int B = int.Parse(Console.ReadLine());
            //for (int i = A; i != B+1; i++)
            //{
            //    for (int j = 0; j != i; j++)
            //    {
            //        Console.Write($" {i} ");
            //    }
            //}

            //Задание 6
            //Пользователь с клавиатуры вводит длину линии, символ заполнитель, направление линии(горизонтальная,
            //вертикальная).Программа отображает линию по заданным
            //параметрам.Например: +++++.
            //Параметры линии: горизонтальная линия, длина равна
            //пяти, символ заполнитель +
            //int len = int.Parse(Console.ReadLine());
            //string sym = Console.ReadLine();
            //string dir = Console.ReadLine();
            //if (dir == "h")
            //{
            //    for (int i = 0; i < len; i++)
            //    {
            //        Console.Write(sym);
            //    }
            //}
            //else 
            //{
            //    for (int i = 0; i < len; i++)
            //    {
            //        Console.WriteLine(sym);
            //    }
            //}
        }
    }
}

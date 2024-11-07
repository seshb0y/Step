using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    internal class Arr
    {
        static void Main(string[] args)
        {

            //            Задание 1
            //Создайте приложение, которое отображает количество
            //чётных, нечётных, уникальных элементов массива.
            //int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4 };
            //int even = 0;
            //int odd = 1;
            //int uniq = 0;
            //bool flag = false;
            //for (int i = 0; i < nums.Length; i++)
            //{
            //    if (nums[i] % 2 == 0)
            //    {
            //        even++;
            //    }
            //    else { odd++; };
            //    for (int j = 0; j < nums.Length; j++)
            //    {
            //        if (i!=j)
            //        {
            //            if (nums[j] == nums[i])
            //            {
            //                flag = false;
            //                break;
            //            }
            //            else { flag = true; }
            //        }
            //    }
            //    if (flag) { uniq++; }
            //}




            //Задание 2
            //Создайте приложение, отображающее количество
            //значений в массиве меньше заданного параметра пользователем. Например, количество значений меньших, чем 7
            //(7 введено пользователем с клавиатуры).
            //int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4 };
            //int count = 0;
            //int user = int.Parse(Console.ReadLine());
            //for (int i = 0; i < nums.Length; i++)
            //{
            //    if (nums[i] < user)
            //    {
            //        count++;
            //    }
            //}



            //Задание 3
            //Пользователь вводит с клавиатуры три числа. Необходимо подсчитать сколько раз последовательность из этих
            //трёх чисел встречается в массиве.
            //Например:
            //            пользователь ввёл: 7 6 5;
            //        массив: 7 6 5 3 4 7 6 5 8 7 6 5;
            //            количество повторений последовательности: 3.
            //int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4 };
            //int first = int.Parse(Console.ReadLine());
            //int second = int.Parse(Console.ReadLine());
            //int third = int.Parse(Console.ReadLine());
            //int count = 0;
            //for (int i = 0; i < nums.Length; i += 2)
            //{
            //    if (nums[i] == first && nums[i + 1] == second && nums[i + 2] == third)
            //    {
            //        count++;
            //    }
            //}
            //Console.WriteLine(count);



            //            Задание 4
            //Даны 2 массива размерности M и N соответственно.
            //Необходимо переписать в третий массив общие элементы первых двух массивов без повторений.
            //int[] nums = {1, 2, 3, 4, 5, 16, 14, 12};
            //int[] ints = { 1, 12, 13, 14, 15, 16, 4};
            //int size = 0;
            //bool flag = false;
            //for (int i = 0; i < nums.Length; i++)
            //{
            //    for (int j = 0; j < ints.Length; j++)
            //    {
            //        if (nums[i] != ints[j]) { flag = false; continue; }
            //        else
            //        {
            //            for (int z = 0; z < nums.Length; z++)
            //            {
            //                if (i != z)
            //                {
            //                    if (nums[z] == nums[i])
            //                    {
            //                        flag = false;
            //                        break;
            //                    }
            //                    else { flag = true; continue; }
            //                }
            //            }
            //            if (flag) { size++; }
            //        }
            //    }
            //}
            //int[] nums3 = new int[size];
            //int ind = 0;
            //for (int i = 0; i < nums.Length; i++)
            //{
            //    for (int j = 0; j < ints.Length; j++)
            //    {
            //        if (nums[i] != ints[j]) { flag = false; continue; }
            //        else
            //        {
            //            for (int z = 0; z < nums.Length; z++)
            //            {
            //                if (i != z)
            //                {
            //                    if (nums[z] == nums[i])
            //                    {
            //                        flag = false;
            //                        break;
            //                    }
            //                    else { flag = true; continue; }
            //                }
            //            }
            //            if (flag) {nums3[ind] = nums[i]; ind++; }
            //        }
            //    }
            //}


            //                Задание 5
            //Разработайте приложение, которое будет находить минимальное и максимальное значение в двумерном массиве.
            //const int rows = 4;
            //const int cols = 4;
            //int[,] arr = new int[rows, cols]{ { 1, 2, 3, 13 }, { 4, 5, 6, 7, }, { 8, 9, 10, 11, }, { 12, 13, 14, 15, } };
            //int min = arr[0,0];
            //int max = arr[0,0];
            //for (int i = 0; i < rows; i++)
            //{
            //    for (int j = 0; j < cols; j++)
            //    {
            //        if (arr[i, j] < min)
            //        {
            //            min = arr[i, j];
            //        }
            //        else 
            //        { 
            //            if (arr[i, j] > max)
            //            { max = arr[i, j]; } 
            //        }
            //    }
            //}


            //Задание 6
            //Пользователь вводит предложение с клавиатуры.Вам
            //необходимо подсчитать количество слов в нём.
            //string user = Console.ReadLine();
            //int count = 1;
            //for (int i = 0; user.Length > i; i++)
            //{
            //    if (user[i] == ' ')
            //    {
            //        count++;
            //    }
            //}

            //Задание 7
            //Пользователь вводит предложение с клавиатуры.Вам
            //необходимо перевернуть каждое слово предложения и
            //отобразить результат на экран.
            //Например:
            //пользователь ввёл: sun cat dogs cup tea;
            //            после переворота: nus tac sgod puc aet.
            //string user = Console.ReadLine() + " ";
            //string res = "";
            //for (int i = 0; i < user.Length; i++)
            //{
            //    if (user[i] == ' ')
            //    {
            //        for (int j = res.Length, z = i - 1; j < i; j++, z--)
            //        {
            //            res += user[z];
            //        }
            //        res += " ";
            //    }
            //}
            //Console.WriteLine(res);

            //            Задание 8
            //Пользователь вводит с клавиатуры предложение.Приложение должно посчитать количество гласных букв в нём.
            //string user = Console.ReadLine();
            //int count = 0;
            //for (int i = 0; i < user.Length; i++)
            //{
            //    switch (user[i])
            //    {
            //        case 'a':
            //            count++;
            //            break;
            //        case 'e':
            //            count++;
            //            break;
            //        case 'i':
            //            count++;
            //            break;
            //        case 'o':
            //            count++;
            //            break;
            //        case 'u':
            //            count++;
            //            break;
            //        case 'y':
            //            count++;
            //            break;
            //    }
            //}


            //Задание 9
            //Реализуйте приложение для подсчёта количество вхождений подстроки в строку.Пользователь вводит исходную
            //строку и слово для поиска. Приложений отображает результат поиска.
            //Например:
            //            пользователь ввёл: Why she had to go.I don't know, she
            //wouldn't say;
            //подстрока для поиска: she;
            //            результат поиска: 2.
            string user = Console.ReadLine() + " ";
            string search = Console.ReadLine();
            string word = "";
            int count = 0;
            for (int i = 0; i < user.Length; i++)
            {
                if (user[i] != ' ')
                {
                    word += user[i];
                }
                else
                {
                    if (search == word)
                    { 
                        count++;
                    }
                    word = "";
                }
            }
            Console.WriteLine(count);

        }
    }
}

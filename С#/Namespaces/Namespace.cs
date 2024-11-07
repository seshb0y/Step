using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework.Namespaces
{
    internal class Namespace
    {
        private static void Main(string[] args)
        {

            //Задание 1
            //Создайте классы для генерации четных чисел, нечетных чисел, простых чисел, чисел Фибоначчи. Используйте
            //механизмы пространств имён
            //int num = NumGen.getFib();
            //Console.WriteLine(num);

            //Задание 2
            //Создайте классы для отрисовки различных геометрических фигур: треугольника, прямоугольника, квадрата.
            //Используйте механизмы пространств имён
            //PaintFuigure.square();
            //PaintFuigure.triangle();
            //PaintFuigure.rectangle();

            //Задание 3
            //Создайте игру «Угадай число». Пользователь загадывает число в указанном диапазоне, компьютер угадывает.
            //Используйте механизмы пространств имён.
            //int range = int.Parse(Console.ReadLine());
            //int num = GuessNum.randomNum(range);
            //while (range != num)
            //{
            //    range = int.Parse(Console.ReadLine());
            //}

            //Задание 4
            //Создайте приложение для генерации псевдотекста.
            //Пользователь вводит количество гласных и согласных,
            //максимальную длину слова. Приложение генерирует текст
            //на основании выбранных параметров.Используйте механизмы пространств имён.
            int vowels = int.Parse(Console.ReadLine());
            int cons = int.Parse(Console.ReadLine());
            int length = int.Parse(Console.ReadLine());
            int word_count = int.Parse(Console.ReadLine());
            string cons_word = "";
            string vowels_word = "";
            string res = "";
            string[] cons_Arr = new string[] { "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z" };
            string[] vow_Arr = new string[] { "a", "e", "i", "o", "u", "y" };
            Random rnd = new Random();
            for(int i = 0; i < word_count; i++)
            {
                int min_len = rnd.Next((cons + vowels), length + 1);
                for (int j = 0; j < cons; j++)
                {
                    int rnd_cons = rnd.Next(20);
                    cons_word += cons_Arr[rnd_cons];
                }
                for (int k = 0; k < vowels; k++)
                {
                    int rnd_vow = rnd.Next(5);
                    vowels_word += vow_Arr[rnd_vow];
                }
                for (int z = 0; z < min_len; z++)
                {
                    if (z < cons_word.Length)
                    {
                        res += cons_word[z];
                    }
                    if (z < vowels_word.Length)
                    {
                        res += vowels_word[z];
                    }
                }
                Console.Write($"{res} ");
                res = "";
                cons_word = "";
                vowels_word = "";
            }

        }
    }
}

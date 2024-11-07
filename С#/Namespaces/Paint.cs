using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework.Namespaces
{
    //Задание 2
    //Создайте классы для отрисовки различных геометрических фигур: треугольника, прямоугольника, квадрата.
    //Используйте механизмы пространств имён
    class PaintFuigure
    {
        public static void triangle()
        {
            Console.WriteLine("*");
            for (int i = 0; i < 5; i++)
            {
                Console.Write("*  ");
                for(int j = 0; j < i; j++)
                {
                    Console.Write("   ");
                }
                Console.WriteLine("*");
            }
            for (int i = 6; i > 0; i--)
            {
                Console.Write("*  ");
                for (int j = 0; j < i-1; j++)
                {
                    Console.Write("   ");
                }
                Console.WriteLine("*");
            }
            Console.WriteLine("*");
        }
        public static void rectangle()
        {
            for (int i = 0; i < 11; i++)
            {
                Console.Write("* ");
            }
            Console.WriteLine();
            for (int i = 0; i < 5; i++)
            {
                Console.Write("*");
                for(int j = 0;j < 10; j++)
                {
                    Console.Write("  ");
                }
                Console.WriteLine("*");
            }
            for (int i = 0; i < 11; i++)
            {
                Console.Write("* ");
            }
            Console.WriteLine();
        }
        public static void square()
        {
            for(int i = 0;i < 4;i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    Console.Write("* ");
                }
                Console.WriteLine();
            }
            Console.WriteLine();
            Console.WriteLine();
            ////////////////////////////

            for (int i = 0; i < 5; i++)
            {
                Console.Write(" *");
            }
            Console.WriteLine();
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    if (j == 0 || j+1 == 5)
                    {
                        Console.Write("*");
                    }
                    Console.Write("  ");
                }
                Console.WriteLine();
            }
            for (int i = 0; i < 5; i++)
            {
                Console.Write(" *");
            }
            Console.WriteLine();
        }
    }
}
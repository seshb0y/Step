using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{

    internal class Practice_03_06_ticTACtoe
    {
        private static void Main(string[] args)
        {
            //            Задание 1
            //Создайте приложение «Крестики - Нолики». Пользователь играет с компьютером. При старте игры случайным
            //образом выбирается, кто ходит первым. Игроки ходят по
            //очереди.Игра может закончиться победой одного из игроков
            ////или ничьей.Используйте механизмы пространств имён.
            //TicTacToe game = new TicTacToe();
            //Console.WriteLine(game.ToString());
            //Random rnd = new Random();
            //int user1;
            //int user2;
            //for (int i = 0; i < 10; i++)
            //{
            //    Console.WriteLine(game.ToString());
            //    if (i % 2 == 0)
            //    {
            //        Console.WriteLine("Enter the first coordinate");
            //        user1 = int.Parse(Console.ReadLine());
            //        Console.WriteLine("Enter the second coordinate");
            //        user2 = int.Parse(Console.ReadLine());
            //        game.Mark(user1, user2);
            //        if (game.Check())
            //        {
            //            Console.WriteLine(game.ToString());
            //            break;
            //        }
            //    }
            //    else
            //    {
            //        game.Mark(rnd.Next(3), rnd.Next(3), false);
            //    }
            //    if (game.Check())
            //    {
            //        Console.WriteLine(game.ToString());
            //        break;
            //    }
            //    else
            //    {
            //        Console.Clear();
            //    }
            //}

            ///////////////////////////

            //Задание 2
            //Добавьте к первому заданию возможность игры с
            //другим пользователем.
            //TicTacToe game = new TicTacToe();
            //Console.WriteLine(game.ToString());
            //int user1;
            //int user2;
            //int user3;
            //int user4;
            //for (int i = 0; i < 10; i++)
            //{
            //    Console.WriteLine(game.ToString());
            //    if (i % 2 == 0)
            //    {
            //        Console.WriteLine("Enter the first coordinate");
            //        user1 = int.Parse(Console.ReadLine());
            //        Console.WriteLine("Enter the second coordinate");
            //        user2 = int.Parse(Console.ReadLine());
            //        game.Mark(user1, user2);
            //        if (game.Check())
            //        {
            //            Console.WriteLine(game.ToString());
            //            break;
            //        }
            //    }
            //    else
            //    {
            //        Console.WriteLine("Enter the first coordinate");
            //        user3 = int.Parse(Console.ReadLine());
            //        Console.WriteLine("Enter the second coordinate");
            //        user4 = int.Parse(Console.ReadLine());
            //        game.Mark(user3, user4, false);
            //    }
            //    if (game.Check())
            //    {
            //        Console.WriteLine(game.ToString());
            //        break;
            //    }
            //    else
            //    {
            //        Console.Clear();
            //    }
            //}

            ///////////////////////

            //Задание 3
            //Создайте приложение для перевода обычного текста
            //в азбуку Морзе.Пользователь вводит текст.Приложение
            //отображает введенный текст азбукой Морзе. Используйте
            //механизмы пространств имён.

            //string[] morse = { ". - ", "-...", "-.-.", "-..", "..-.", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-",
            //"...-", ".--", "-..-", "-.--", "--.."};
            //char[] alpha = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
            //string user = Console.ReadLine();
            //string res = "";
            //for (int i = 0; i < user.Length; i++)
            //{
            //    for (int j = 0; j < alpha.Length; j++)
            //    {
            //        if (user[i] == alpha[j])
            //        {
            //            res += morse[j];
            //            break;
            //        }
            //    }
            //}
            //Console.WriteLine(res);

            //Задание 4
            //Добавьте к предыдущему заданию механизм перевода
            //текста из азбуки Морзе в обычный текст.
            string[] morse = { ".-", "-...", "-.-.", "-..", "..-.", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-",
            "...-", ".--", "-..-", "-.--", "--.."};
            char[] alpha = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
            string user = Console.ReadLine() + " ";
            string res = "";
            string comp = "";
            for (int i = 0; i < user.Length; i++)
            {
                if (user[i] != ' ')
                {
                    comp += user[i];
                }
                else
                {
                    for (int j = 0; j < morse.Length; j++)
                    {
                        if (comp == morse[j])
                        {
                            res += alpha[j];
                            break;
                        }
                    }
                    comp = "";
                }
            }
            Console.WriteLine(res);

        }
    }
}

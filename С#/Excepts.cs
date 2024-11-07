using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    internal class Excepts
    {
        //private static void Main(string[] args)
        //{
        //Задание 1
        //Создайте приложение калькулятор для перевода числа
        //из одной системы исчисления в другую. Пользователь с помощью меню выбирает направление перевода.Например,
        //из десятичной в двоичную. После выбора направления,
        //пользователь вводит число в исходной системе исчисления.
        //Приложение должно перевести число в требуемую систему.Предусмотреть случай выхода за границы диапазона,
        //определяемого типом int, неправильный ввод.
        //try
        //{
        //    string user = Console.ReadLine();
        //    int user_ch = int.Parse(Console.ReadLine());
        //    int deg = user.Length - 1;
        //    int res = 0;
        //    string toDouble = "";
        //    int div;
        //    int mult = 2;
        //    switch (user_ch)
        //    {
        //        case 1:
        //            foreach (char i in user)
        //            {
        //                int a;
        //                if (i == '0') { a = 0; }
        //                else { a = 1; }
        //                for (int j = 0; j < deg - 1; j++)
        //                {
        //                    mult *= 2;
        //                }
        //                if (deg == 0)
        //                {
        //                    mult = 1;
        //                }
        //                res += (a * mult);
        //                deg--;
        //                mult = 2;
        //            }
        //            Console.WriteLine(res);
        //            break;
        //        case 2:
        //            {
        //                while (user != "0")
        //                {
        //                    div = Convert.ToInt32(user) % 2;
        //                    toDouble += Convert.ToString(div);
        //                    user = Convert.ToString(Convert.ToInt32(user) / 2);
        //                }
        //                string newDouble = "";
        //                for (int i = toDouble.Length - 1; i >= 0; i--)
        //                {
        //                    newDouble += toDouble[i];
        //                }
        //                Console.WriteLine(newDouble);
        //                break;
        //            }
        //    }
        //}
        //catch
        //{
        //    Console.WriteLine("wrong data");
        //}

        //Задание 2
        //Пользователь вводит словами цифру от 0 до 9.Приложение должно перевести слово в цифру.Например, если
        //пользователь ввёл five, приложение должно вывести на
        //экран 5.
        //string user = Console.ReadLine();
        //switch (user)
        //{
        //    case "one":
        //        Console.WriteLine(1);
        //        break;
        //    case "two":
        //        Console.WriteLine(2);
        //        break;
        //    case "three":
        //        Console.WriteLine(3);
        //        break;
        //    case "four":
        //        Console.WriteLine(4);
        //        break;
        //    case "five":
        //        Console.WriteLine(5);
        //        break;
        //    case "six":
        //        Console.WriteLine(6);
        //        break;
        //    case "seven":
        //        Console.WriteLine(7);
        //        break;
        //    case "eight":
        //        Console.WriteLine(8);
        //        break;
        //    case "nine":
        //        Console.WriteLine(9);
        //        break;
        //}
        //user = Console.ReadLine();
        //string[] units = { " zero", " one", " two", " three", " four", " five", " six", " seven", " eight", " nine" };
        //string[] tens = { " ", " ten", " twenty", " thirty", " fourty", " fifty", " sixty", " seventy", " eighty", " ninety" };
        //int count = 0;
        //string val = "";
        //foreach (char unit in user)
        //{
        //    count++;
        //}
        //switch (count)
        //{
        //    case 1:
        //        Console.WriteLine(units[Convert.ToInt32(user)]);
        //        break;
        //    case 2:
        //        val += user[0];
        //        if (Convert.ToInt32(val) > 1)
        //        {
        //            Console.Write(tens[Convert.ToInt32(val)]);
        //            val = "";
        //            val += user[1];
        //            Console.WriteLine(units[Convert.ToInt32(val)]);
        //            break;
        //        }
        //        val = "";
        //        val += user[1];
        //        if (Convert.ToInt32(val) > 3)
        //        {
        //            Console.Write(units[Convert.ToInt32(val)]);
        //            Console.WriteLine("teen");
        //            break;
        //        }
        //        else
        //        {
        //            val = "";
        //            val += user[0];
        //            val += user[1];
        //            switch (Convert.ToInt32(val))
        //            {
        //                case 10:
        //                    Console.WriteLine(" ten");
        //                    break;
        //                case 11:
        //                    Console.WriteLine(" eleven");
        //                    break;
        //                case 12:
        //                    Console.WriteLine(" twelve");
        //                    break;
        //                case 13:
        //                    Console.WriteLine(" thirteen");
        //                    break;
        //            }
        //        }
        //        break;
        //    case 3:
        //        val += user[0];
        //        Console.Write(units[Convert.ToInt32(val)]);
        //        Console.Write(" hundred");
        //        val = "";
        //        val += user[1];
        //        if (Convert.ToInt32(val) == 0)
        //        {
        //            val = "";
        //            val += user[2];
        //            Console.WriteLine(units[Convert.ToInt32(val)]);
        //            break;
        //        }
        //        val += user[2];
        //        if (Convert.ToInt32(val) > 19)
        //        {
        //            val = "";
        //            val += user[1];
        //            Console.Write(tens[Convert.ToInt32(val)]);
        //            val = "";
        //            val += user[2];
        //            Console.WriteLine(units[Convert.ToInt32(val)]);
        //        }

        //        else
        //        {
        //            if (Convert.ToInt32(val) > 12)
        //            {
        //                val = "";
        //                val += user[2];
        //                Console.Write(units[Convert.ToInt32(val)]);
        //                Console.WriteLine("teen");
        //                break;
        //            }
        //            else
        //            {
        //                switch (Convert.ToInt32(val))
        //                {
        //                    case 10:
        //                        Console.WriteLine(" ten");
        //                        break;
        //                    case 11:
        //                        Console.WriteLine(" eleven");
        //                        break;
        //                    case 12:
        //                        Console.WriteLine(" twelve");
        //                        break;
        //                }
        //            }
        //            break;
        //        }
        //        break;
        //}

        //Задание 3
        //Создайте класс «Заграничный паспорт». Вам необходимо
        //хранить информацию о номере паспорта, ФИО владельца,
        //дате выдачи и т.д.Предусмотреть механизмы для инициализации полей класса. Если значение для инициализации
        //неверное, генерируйте исключение. 
        //class Passport
        //{
        //    public Passport(int num, string name, string date)
        //    {
        //        this.num = num;
        //        this.name = name;
        //        this.date = date;
        //    }

        //    public int num { get; set; }
        //    public string name { get; set; }
        //    public string date {  get; set; }
        //}
        //private static void Main(string[] args)
        //{
        //    try
        //    {
        //        Passport pas = new Passport(1231, "sad", "asdas");
        //        pas.num = int.Parse(Console.ReadLine());
        //        pas.name = Console.ReadLine();
        //        pas.date = Console.ReadLine();

        //    }
        //    catch { Console.WriteLine("wrong data"); }

        //}

        //Задание 4
        //Пользователь вводит в строку с клавиатуры логическое
        //выражение.Например, 3>2 или 7<3. Программа должна
        //посчитать результат введенного выражения и дать результат true или false. В строке могут быть только целые числа
        //и операторы: <, >, <=, >=, ==, !=.Для обработки ошибок
        //ввода используйте механизм исключений.
        private static void Main(string[] args)
        {

            int a = 0;
            int b = 0;
            string sign = "";
            string val = "";
            bool flag = true;
            while (true) {
                string user = Console.ReadLine() + " ";
                for (int i = 0; i < user.Length; i++)
                {
                    if (Convert.ToInt32(user[i]) >= 48 && Convert.ToInt32(user[i]) <= 57)
                    {
                        val += user[i];
                    }
                    else
                    {
                        if (flag && val != "")
                        {
                            a = Convert.ToInt32(val);
                        }
                        else if  (val != "")
                        {
                            b = Convert.ToInt32(val);
                        }
                        sign += user[i];
                        val = "";
                        flag = false;
                    }
                }
                switch (sign)
                {
                    case "< ":
                        Console.WriteLine(a < b);
                        break;
                    case "> ":
                        Console.WriteLine(a > b);
                        break;
                    case "== ":
                        Console.WriteLine(a == b);
                        break;
                    case "!= ":
                        Console.WriteLine(a != b);
                        break;
                    case ">= ":
                        Console.WriteLine(a >= b);
                        break;
                    case "<= ":
                        Console.WriteLine(a <= b);
                        break;
                }
                sign = "";
                flag = true;
            }
            

        }
    }
}

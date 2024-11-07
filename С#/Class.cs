using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    internal class Class
    {
        private static void Main(string[] args)
        {

            //Задание 1 Напишите метод, который возвращает произведение чисел
            //    в указанном диапазоне. Границы диапазона передаются в качестве параметров.
            //int res;
            //void mult(int first, int second, out int result) 
            //{
            //    result = first;
            //    for (int i = first + 1; i < second + 1; i++)
            //    {
            //        result *= i;
            //    }
            //}
            //int start = int.Parse(Console.ReadLine());
            //int end = int.Parse(Console.ReadLine());
            //mult(start, end, out res);
            //Console.WriteLine(res);


            //Задание 2 Напишите метод, который проверяет является 
            //    ли число числом Фибоначчи. Число передаётся в качестве
            //    параметра.Если число простое нужно вернуть из метода true, иначе false.

            //bool isFibo(int num)
            //{
            //    int a = 0;
            //    int b = 1;
            //    int c = a + b;
            //    for (int i = 0; i < num; i++) 
            //    {
            //        a = b;
            //        b = c;
            //        c = a + b;
            //        if (c == num) 
            //        {
            //            return true;
            //        }
            //        else if (c > num) 
            //        {
            //            return false;
            //        }
            //    }
            //    return false;
            //}


            //Задание 3
            //Напишите метод, сортирующий массив по убыванию
            //или возрастанию в зависимости от выбора пользователя. 
            //Алгоритм сортировки реализуйте самостоятельно. 
            //Например, может быть реализована сортировка методом
            //перестановок.

            //void swap(ref int a, ref int b)
            //{
            //    int c = a;
            //    a = b;
            //    b = c;
            //}
            //void bubleSort(ref int[] arr, int size)
            //{   
            //    while(size != 0)
            //    {
            //        bool swaped = false;
            //        for (int i = 0; i < size - 1; i++)
            //        {
            //            if (arr[i] > arr[i+1])
            //            {
            //                swap(ref arr[i], ref arr[i+1]);
            //                swaped = true;
            //            }
            //        }
            //        if(swaped == false)
            //        {
            //            break;
            //        }
            //        size--;
            //    }
            //}
            //int[] arrays = new int[10] { 2, 8, 12, 54, 1, 12, 5, 235, 1, 49 };
            //bubleSort(ref arrays, arrays.Length);


            Random num = new Random();
            Matrix mat = new Matrix(5, 7);
            for (int i = 0; i < mat.cols; i++)
            {
                for (int j = 0; j < mat.rows; j++)
                {
                    mat.arr[i, j] = num.Next(1000);
                }
            }

            for (int i = 0; i < mat.cols; i++)
            {
                for (int j = 0; j < mat.rows; j++)
                {
                    Console.Write($" {mat.arr[i, j]} ");
                }
                Console.WriteLine();
            }

            Console.WriteLine(mat.max());
            Console.WriteLine(mat.min());

        }
        //            Задание 4
        //Создайте класс «Город». Необходимо хранить в полях
        //класса: название города, название страны, количество
        //жителей в городе, телефонный код города, название районов города.
        //Реализуйте методы класса для ввода данных,
        //вывода данных, реализуйте доступ к отдельным полям
        //через методы класса.

        //class City
        //{
        //    public string name { get; set; }
        //    public string country { get; set; }
        //    public int residents { get; set; }
        //    public int phone { get; set; }

        //    public string[] areas;
        //    public int sizeAreas = 0;

        //    public void addArea(string name)
        //    {
        //        string[] newArr = new string[sizeAreas + 1];
        //        for (int i = 0; areas.Length > i; i++)
        //        {
        //            newArr[i] = areas[i];
        //        }
        //        newArr[sizeAreas] = name;
        //        sizeAreas++;
        //        areas = newArr;
        //    }
        //    public City(string name, string country, int residents, int phone)
        //    {
        //        this.name = name;
        //        this.country = country;
        //        this.residents = residents;
        //        this.phone = phone;
        //        this.areas = new string[sizeAreas];
        //    }
        //}


        //Задание 5
        //Реализуйте класс «Сотрудник». Необходимо хранить в
        //полях класса: ФИО, дату рождения, контактный телефон,
        //рабочий email, должность, описание служебных обязанностей.Реализуйте методы класса для ввода данных, вывода данных, реализуйте доступ к отдельным полям через
        //методы класса

        //class Employee
        //{
        //    public string name { get; set; }
        //    public string dateBirth { get; set; }
        //    public int phone { get; set; }
        //    public string email { get; set; }
        //    public string post { get; set; }
        //    public string fucntion { get; set; }

        //    public Employee(string name, string dateBirth, int phone, string email, string post, string fucntion)
        //    {
        //        this.name = name;
        //        this.dateBirth = dateBirth;
        //        this.phone = phone;
        //        this.email = email;
        //        this.post = post;
        //        this.fucntion = fucntion;
        //    }

        //}


        //Задание 6
        //Реализуйте класс «Самолёт». Необходимо хранить в
        //полях класса: название самолёта, название производителя, год выпуска, тип самолёта.Реализуйте конструкторы
        //и методы класса для ввода данных, вывода данных, реализуйте доступ к отдельным полям через методы класса.
        //Используйте механизм перегрузки методов.

        //class Plane
        //{
        //    public string name { get; set; }
        //    public string creater { get; set; }
        //    public int date { get; set; }
        //    public string type { get; set; }
        //    public Plane(string name, string creater, int date, string type)
        //    {
        //        this.name = name;
        //        this.creater = creater;
        //        this.date = date;
        //        this.type = type;
        //    }   
        //}
    }


    //Задание 7
    //Реализуйте класс «Матрица». Реализуйте конструкторы и методы класса для ввода данных, вывода данных,
    //подсчёта максимума, подсчёта минимума.Используйте
    //механизм перегрузки методов.

    class Matrix
    {
        public int cols;
        public int rows;
        public int[,] arr;

        public Matrix(int cols, int rows)
        {
            this.cols = cols;
            this.rows = rows;
            this.arr = new int[cols,rows];
        }
        public int min()
        {
            int min = arr[0, 0];
            for (int i = 1; i < cols; i++)
            {
                for (int j = 1; j < rows; j++)
                {
                    if (arr[i, j] < min)
                    {
                        min = arr[i, j];
                    }
                }
            }
            return min;
        }

        public int max()
        {
            int max = arr[0, 0];
            for (int i = 1; i < cols; i++)
            {
                for (int j = 1; j < rows; j++)
                {
                    if (arr[i, j] > max)
                    {
                        max = arr[i, j];
                    }
                }
            }
            return max;
        }
    }
}

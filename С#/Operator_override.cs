using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    //    Задание 1
    //Ранее в одном из практических заданий вы создавали
    //класс «Сотрудник». Добавьте к уже созданному классу
    //информацию о заработной плате сотрудника.Выполните
    //перегрузку + (для увеличения зарплаты на указанную величину), – (для уменьшения зарплаты на указанную величину), == (проверка на равенство зарплат сотрудников), < и >
    //(проверка на меньше или больше зарплат сотрудников), != 
    //и Equals.Используйте механизм свойств для полей класса.
    //class Employer
    //{
    //    public int Salary { get; set; }

    //    public Employer(int salary)
    //    {
    //        Salary = salary;
    //    }
    //    public static Employer operator +(Employer emp, int value)
    //    {
    //        return new Employer(emp.Salary + value);
    //    }
    //    public static Employer operator -(Employer emp, int value)
    //    {
    //        return new Employer(emp.Salary - value);
    //    }
    //    public static bool operator ==(Employer emp, Employer emp2)
    //    {
    //        return emp.Salary == emp2.Salary;
    //    }
    //    public static bool operator !=(Employer emp, Employer emp2)
    //    {
    //        return emp.Salary != emp2.Salary;
    //    }
    //    public static bool operator <(Employer emp, Employer emp2)
    //    {
    //        return emp.Salary < emp2.Salary;
    //    }
    //    public static bool operator >(Employer emp, Employer emp2)
    //    {
    //        return emp.Salary > emp2.Salary;
    //    }

    //}

    //    Задание 2
    //Ранее в одном из практических заданий вы создавали
    //класс «Матрица». Выполните перегрузку + (для сложения матриц), – (для вычитания матриц). * (умножение
    //матриц друг на друга, умножение матрицы на число), == 
    //(проверка матриц на равенство), != и Equals.Используйте
    //механизм свойств для полей класса.Также используйте
    //механизм индексаторов
    //class Matrix
    //{
    //    public int cols { get; set; } = 3;
    //    public int rows { get; set; } = 3;
    //    public int[,] arr;

    //    public Matrix()
    //    {
    //        this.arr = new int[cols, rows];
    //    }

    //    public static Matrix operator +(Matrix mtr, Matrix mtr2)
    //    {
    //        for (int i = 0; i < mtr.cols; i++)
    //        {
    //            for (int j = 0; j < mtr.rows; j++)
    //            {
    //                mtr.arr[i, j] += mtr2.arr[i,j]; 
    //            }
    //        }
    //        return mtr;
    //    }
    //    public static Matrix operator -(Matrix mtr, Matrix mtr2)
    //    {
    //        for (int i = 0; i < mtr.cols; i++)
    //        {
    //            for (int j = 0; j < mtr.rows; j++)
    //            {
    //                mtr.arr[i, j] -= mtr2.arr[i, j];
    //            }
    //        }
    //        return mtr;
    //    }
    //    public static bool operator ==(Matrix mtr, Matrix mtr2)
    //    {
    //        for (int i = 0; i < mtr.cols; i++)
    //        {
    //            for (int j = 0; j < mtr.rows; j++)
    //            {
    //                if(mtr.arr[i, j] != mtr2.arr[i, j])
    //                {
    //                    return false;
    //                }
    //            }
    //        }
    //        return true;
    //    }
    //    public static bool operator !=(Matrix mtr, Matrix mtr2)
    //    {
    //        for (int i = 0; i < mtr.cols; i++)
    //        {
    //            for (int j = 0; j < mtr.rows; j++)
    //            {
    //                if (mtr.arr[i, j] != mtr2.arr[i, j])
    //                {
    //                    return true;
    //                }
    //            }
    //        }
    //        return false;
    //    }
    //    public static bool operator <(Matrix mtr, Matrix mtr2)
    //    {
    //        for (int i = 0; i < mtr.cols; i++)
    //        {
    //            for (int j = 0; j < mtr.rows; j++)
    //            {
    //                if (mtr.arr[i, j] > mtr2.arr[i, j])
    //                {
    //                    return false;
    //                }
    //            }
    //        }
    //        return true;
    //    }
    //    public static bool operator >(Matrix mtr, Matrix mtr2)
    //    {
    //        for (int i = 0; i < mtr.cols; i++)
    //        {
    //            for (int j = 0; j < mtr.rows; j++)
    //            {
    //                if (mtr.arr[i, j] < mtr2.arr[i, j])
    //                {
    //                    return false;
    //                }
    //            }
    //        }
    //        return true;
    //    }


    //    Задание 3
    //Ранее в одном из практических заданий вы создавали
    //класс «Город». Выполните перегрузку + (для увеличения количества жителей на указанную величину)
    //    , — (для уменьшения количества жителей на указанную величину), ==
    //(проверка на равенство двух городов по количеству жителей), < и > (проверка на меньше или больше количества
    //жителей), != и Equals.Используйте механизм свойств для
    //полей класса
    //class City
    //{
    //    public int Capacity { get; set; }
    //    public City(int capacity)
    //    {
    //        Capacity = capacity;
    //    }
    //    public static City operator + (City left, City right)
    //    {
    //        return new City (left.Capacity + right.Capacity);
    //    }
    //    public static City operator -(City left, City right)
    //    {
    //        return new City (left.Capacity - right.Capacity);
    //    }
    //    public static bool operator ==(City left, City right)
    //    {
    //        return left.Capacity == right.Capacity;
    //    }
    //    public static bool operator !=(City left, City right)
    //    {
    //        return left.Capacity != right.Capacity;
    //    }
    //    public static bool operator >(City left, City right)
    //    {
    //        return left.Capacity > right.Capacity;
    //    }
    //    public static bool operator <(City left, City right)
    //    {
    //        return left.Capacity < right.Capacity;
    //    }
    //}

    //    Задание 4
    //Ранее в одном из практических заданий вы создавали
    //класс «Кредитная карточка». Добавьте к уже созданному
    //классу информацию о сумме денег на карте.Выполните
    //перегрузку + (для увеличения суммы денег на указанную
    //величину), – (для уменьшения суммы денег на указанную
    //величину), == (проверка на равенство CVC кода), < и > 
    //(проверка на меньше или больше суммы денег), != и Equals.
    //Используйте механизм свойств для полей класса.

    class Card
    {
        public Card(int sum)
        {
            this.sum = sum;
        }

        public int sum { get; set; }

        public static Card operator +(Card left, Card right)
        {
            return new Card(left.sum + right.sum);
        }
        public static Card operator -(Card left, Card right)
        {
            return new Card(left.sum - right.sum);
        }
        public static bool operator ==(Card left, Card right)
        {
            return left.sum == right.sum;
        }
        public static bool operator !=(Card left, Card right)
        {
            return left.sum != right.sum;
        }
        public static bool operator >(Card left, Card right)
        {
            return left.sum > right.sum;
        }
        public static bool operator <(Card left, Card right)
        {
            return left.sum < right.sum;
        }
    }
    internal class Operator_override
    {
        private static void Main(string[] args)
        {
            Card c1 = new Card(1);
            Card c2 = new Card(2);
            
            Console.WriteLine(c1 < c2);
        }
    }
}

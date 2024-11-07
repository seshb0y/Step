using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class Person
    {
        string Name;
        string Surname;
        int Age;

        public Person(string name, string surname, int age)
        {
            Name = name;
            Surname = surname;
            Age = age;
        }
        public void Print()
        {
            Console.WriteLine($"Person: \nName: {Name}\nSurname: {Surname}\nAge: {Age}");
        }
    }

    public class Employee : Person
    {
        string Positon;
        double Salary;

        public Employee(string name, string surname, int age, string positon, double salary) : base(name, surname, age)
        {
            this.Positon = positon;
            this.Salary = salary;
        }
    }
}
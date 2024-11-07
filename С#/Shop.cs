using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Homework
{
    // Zadaniye
    // Napisat prograammu Magazin.
    // Arxitektura programmi doljan sostoiyat iz klassov
    // raznix tovarov, klassov rabotnikov, anbara i vitrina, i cheka


    class Shop
    {
        public Shop(string name, string description)
        {
            Name = name;
            Description = description;
            Employers = new List<Employers>();
            showcase = new Showcase();
            stock = new Stock();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        Showcase showcase;
        Stock stock;
        public List<Employers> Employers { get; set; }
    }

    abstract class Goods
    {
        protected Goods(string name, int id)
        {
            Name = name;
            Id = id;
        }
        public string Name { get; set; }
        public int Id { get; set; }
    }
    class Piece : Goods
    {
        public int Amount { get; set; }
        public Piece(string name, int id, int amount) : base(name, id)
        {
            Amount = amount;
        }
        public override string ToString()
        {
            string str = Name + ' ' + Id + ' ' + Amount;
            return str;
        }
    }
    class Loose : Goods
    {
        public double Amount { get; set; }
        public Loose(string name, int id, double amount) : base(name, id)
        {
            Amount = amount;
        }
        public override string ToString()
        {
            string str = Name + ' ' + Id + ' ' + Amount;
            return str;
        }
    }
    class Stock
    {
        public List<Goods> GoodsArr;
        public Stock()
        {
            GoodsArr = new List<Goods>();
        }
       public void AddPiece(string name, int id, int amount)
        {
            Goods newGoods = new Piece(name, id, amount);
            GoodsArr.Add(newGoods);
        }
        public void AddLoose(string name, int id, double amount)
        {
            Goods newGoods = new Loose(name, id, amount);
            GoodsArr.Add(newGoods);
        }
    }
    class Showcase
    {
        public List<Goods> GoodsArr;
        public Showcase()
        {
            GoodsArr = new List<Goods>();
        }
        public void AddPiece(string name, int id, int amount)
        {
            Goods newGoods = new Piece(name, id, amount);
            GoodsArr.Add(newGoods);
        }
        public void AddLoose(string name, int id, double amount)
        {
            Goods newGoods = new Loose(name, id, amount);
            GoodsArr.Add(newGoods);
        }
    }

    abstract class Employers
    {
        protected Employers(string firstName, string lastName, int id, int salary)
        {
            FirstName = firstName;
            LastName = lastName;
            Id = id;
            Salary = salary;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }
        public int Salary { get; set; }
        abstract public void Doing();
        public override string ToString()
        {
            string str = FirstName + ' ' + Id + ' ' + Salary;
            return str;
        }
    }
    class Seller : Employers
    {
        public int AmountOfSells { get; set; }
        public Seller(string firstName, string lastName, int id, int salary, int amountOfSells) : base(firstName, lastName, id, salary)
        {
            AmountOfSells = amountOfSells;
        }
        public override void Doing()
        {
            Console.WriteLine("Seller is selling");
        }
    }
    class Manager : Employers
    {
        public double Quality { get; set; }
        public Manager(string firstName, string lastName, int id, int salary, double quality) : base(firstName, lastName, id, salary)
        {
            Quality = quality;
        }
        public override void Doing()
        {
            Console.WriteLine("Manager is talking with clients");
        }
    }
    class Cleaner : Employers
    {
        public Cleaner(string firstName, string lastName, int id, int salary, int workingDays) : base(firstName, lastName, id, salary)
        {
            WorkingDays = workingDays;
        }

        public int WorkingDays { get; set; }
        public override void Doing()
        {
            Console.WriteLine("Cleaner is cleaning");
        }
    }

    internal class Shoping
    {
        public static void Main(string[] args)
        {
            Showcase s1 = new Showcase();
            Goods g1 = new Loose("sadas", 2, 4);
        }
    }
}

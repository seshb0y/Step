using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

//Sozdat classLibrary Transport i ierarxixuyu naslednikov Car, Bike, Airplane
 
//Dinamiceski podklucit fayl biblioteki k proyektu, proinicilizirovat kajdiy iz klassov
//(sozdat obyekt kajdoco iz klassov)
 
//Prodemonstrirovat rezultat na konsole.

namespace TransportLib
{
    public class Transport
    {
        public string Name;
        public int Price;
        public int Amount;
        public string Manufacturer;

        public Transport(string name, int price, int amount, string manufacturer)
        {
            Name = name;
            Price = price;
            Amount = amount;
            Manufacturer = manufacturer;
        }

        public void Print()
        {
            Console.WriteLine($"Name: {Name}\nPrice: {Price}\nAmount: {Amount}\nManufacturer: {Manufacturer}");
        }
    }

    public class Car : Transport
    {
        public string ClassType;
        public int Horsepower;

        public Car(string name, int price, int amount, string manufacturer, string classtype, int horsepower) : base(name, price, amount, manufacturer)
        {
            ClassType = classtype;
            Horsepower = horsepower;
        }

        public void PrintCar()
        {
            Console.WriteLine($"Name: {Name}\nPrice: {Price}\nAmount:{Amount}\nManufacturer: {Manufacturer}\nClass type: {ClassType}\nHorsepower: {Horsepower}");
        }
    }

    public class Bike : Transport
    {
        public string Chain;
        public string Frame;

        public Bike(string name, int price, int amount, string manufacturer,  string chain, string frame) : base(name, price, amount, manufacturer)
        {
            Chain = chain;
            Frame = frame;
        }
        public void PrintBike()
        {
            Console.WriteLine($"Name: {Name}\nPrice: {Price}\nAmount:{Amount}\nManufacturer: {Manufacturer}\nChain: {Chain}\nFrame: {Frame}");
        }
    }

    public class Plain : Transport
    {
        public string Wings;
        public string Chassis;

        public Plain(string name, int price, int amount, string manufacturer, string wings, string chassis) : base(name, price, amount, manufacturer)
        {
            Wings = wings;
            Chassis = chassis;
        }

        public void PrintPlain()
        {
            Console.WriteLine($"Name: {Name}\nPrice: {Price}\nAmount:{Amount}\nManufacturer: {Manufacturer}\nWings: {Wings}\nChassis: {Chassis}");
        }
    }
}

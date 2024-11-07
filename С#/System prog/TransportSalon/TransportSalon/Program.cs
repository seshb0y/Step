using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TransportSalon
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "My programm";
            Assembly asm = Assembly.Load(AssemblyName.GetAssemblyName("TransportLib.dll"));
            Module mod = asm.GetModule("TransportLib.dll");
            Console.WriteLine($"Modules data type: ");
            Console.WriteLine(mod.GetTypes());
            foreach (Type item in mod.GetTypes())
            {
                Console.WriteLine(item.FullName);
            }
            Type Car = mod.GetType("TransportLib.Car") as Type;
            Type Bike = mod.GetType("TransportLib.Bike") as Type;
            Type Plain = mod.GetType("TransportLib.Plain") as Type;
            Type Transport = mod.GetType("TransportLib.Transport") as Type;
            List<object> Transports = new List<object>();


            string name;
            string manufacturer;
            int amount;
            int price;
            string chassis;
            string frame;
            string wings;
            string chain;
            string classtype;
            int horsepower;


            string user_ch;
            while (true)
            {
                Console.Clear();
                Console.WriteLine("1. Cars\n2. Bikes\n3. Plains\n4. Show all transports\n5. Exit");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":
                        Console.Clear();
                        foreach(var c in Transports)
                        {
                            if(c.GetType() == Car)
                            {
                                Car.GetMethod("PrintCar").Invoke(c, null);
                                Console.WriteLine();
                            }
                        }
                        Console.WriteLine("1. Add new car\n2. Back");
                        user_ch = Console.ReadLine();
                        switch(user_ch)
                        {
                            case "1":
                                Console.Write("Name: ");
                                name = Console.ReadLine();
                                Console.Write("\nAmount: ");
                                amount = int.Parse(Console.ReadLine());
                                Console.Write("\nPrice: ");
                                price = int.Parse(Console.ReadLine());
                                Console.WriteLine("\nManufacturer: ");
                                manufacturer = Console.ReadLine();
                                Console.WriteLine("\nClass type: ");
                                classtype = Console.ReadLine();
                                Console.WriteLine("\nHorsepower: ");
                                horsepower = int.Parse(Console.ReadLine());
                                object car = Activator.CreateInstance(Car, new object[] { name, price, amount, manufacturer, classtype, horsepower });
                                Transports.Add(car);
                                continue;
                            case "2":
                                break;
                        }
                        continue;
                    case "2":
                        Console.Clear();
                        foreach (var b in Transports)
                        {
                            if (b.GetType() == Bike)
                            {
                                Bike.GetMethod("PrintBike").Invoke(b, null);
                                Console.WriteLine();
                            }
                        }
                        Console.WriteLine("1. Add new bike\n2. Back");
                        user_ch = Console.ReadLine();
                        switch (user_ch)
                        {
                            case "1":
                                Console.Write("Name: ");
                                name = Console.ReadLine();
                                Console.Write("\nAmount: ");
                                amount = int.Parse(Console.ReadLine());
                                Console.Write("\nPrice: ");
                                price = int.Parse(Console.ReadLine());
                                Console.WriteLine("\nManufacturer: ");
                                manufacturer = Console.ReadLine();
                                Console.WriteLine("\nChain: ");
                                chain = Console.ReadLine();
                                Console.WriteLine("\nFrame: ");
                                frame = Console.ReadLine();
                                object bike = Activator.CreateInstance(Bike, new object[] { name, price, amount, manufacturer, chain, frame });
                                Transports.Add(bike);
                                continue;
                            case "2":
                                break;
                        }
                        continue;
                    case "3":
                        Console.Clear();
                        foreach (var p in Transports)
                        {
                            if (p.GetType() == Plain)
                            {
                                Plain.GetMethod("PrintPlain").Invoke(p, null);
                                Console.WriteLine();
                            }
                        }
                        Console.WriteLine("1. Add new plain\n2. Back");
                        user_ch = Console.ReadLine();
                        switch (user_ch)
                        {
                            case "1":
                                Console.Write("Name: ");
                                name = Console.ReadLine();
                                Console.Write("\nAmount: ");
                                amount = int.Parse(Console.ReadLine());
                                Console.Write("\nPrice: ");
                                price = int.Parse(Console.ReadLine());
                                Console.WriteLine("\nManufacturer: ");
                                manufacturer = Console.ReadLine();
                                Console.WriteLine("\nWings: ");
                                wings = Console.ReadLine();
                                Console.WriteLine("\nChassis: ");
                                chassis = Console.ReadLine();
                                object plain = Activator.CreateInstance(Plain, new object[] { name, price, amount, manufacturer, wings, chassis });
                                Transports.Add(plain);
                                continue;
                            case "2":
                                break;
                        }
                        continue;
                    case "4":
                        foreach(var t in Transports)
                        {
                            Transport.GetMethod("Print").Invoke(t, null);
                            Console.WriteLine();
                        }
                        Console.ReadLine();
                        continue;
                    case "5":
                        break;
                }
                break;
            }
        }
    }
}

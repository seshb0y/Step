using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

//Sozdat ierarxiyu classov Person->User v Proyekte Dll library.

//Takje Sozdat Dva proyekta BankApplication i UmicoMarket v kajdom iz kotorix budet zareferensin i ispolzovan Dll file Person.
//V etix Dvux proyektax Nujno realizovat DoBavlenie i udalenie Userov.


namespace ConsoleApp1
{
    internal class Bank
    {
        static void Main(string[] args)
        {
            Console.Title = "My programm";
            Assembly asm = Assembly.Load(AssemblyName.GetAssemblyName("PersonLib.dll"));
            Module mod = asm.GetModule("PersonLib.dll");
            Console.WriteLine($"Modules data type: ");
            Console.WriteLine(mod.GetTypes());
            foreach (Type item in mod.GetTypes())
            {
                Console.WriteLine(item.FullName);
            }
            Type Person = mod.GetType("PersonLib.Person") as Type;
            List<object> Persons = new List<object>();

            string user_ch;
            while (true)
            {
                Console.Clear();
                Console.WriteLine("1. Create person\n2. Delete person\n3. Show all persons\n4. Exit");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":
                        Console.Clear();
                        Console.WriteLine("Enter person info:");
                        Console.Write("Name: ");
                        string name = Console.ReadLine();
                        Console.Write("\nSurname: ");
                        string surname = Console.ReadLine();
                        Console.Write("\nAge: ");
                        int age = int.Parse(Console.ReadLine());
                        object person = Activator.CreateInstance(Person, new object[] { name, surname, age });
                        Persons.Add(person);
                        Console.WriteLine();
                        Person.GetMethod("Print").Invoke(person, null);
                        Console.ReadLine();
                        continue;
                    case "2":
                        Console.Clear();
                        int id = 1;
                        int u_choice;
                        foreach (var p in Persons)
                        {
                            Console.WriteLine();
                            Console.WriteLine(id);
                            Person.GetMethod("Print").Invoke(p, null);
                            Console.WriteLine();
                            id++;
                        }
                        Console.WriteLine("Enter person id:");
                        u_choice = int.Parse(Console.ReadLine()) - 1;
                        Persons.RemoveAt(u_choice);

                        continue;
                    case "3":
                        Console.Clear();
                        int person_id = 1;
                        foreach (var p in Persons)
                        {
                            Console.WriteLine();
                            Console.WriteLine(person_id);
                            Person.GetMethod("Print").Invoke(p, null);
                            Console.WriteLine();
                            person_id++;
                        }
                        Console.ReadLine();
                        continue;
                    case "4":
                        break;
                }
                break;
            }
        }
    }
}
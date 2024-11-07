using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Sozdat prilojeniye KonstruirovaniyaTelefona s primineniyem patterna AbstractnayaFabrika.
            //Dva vida telefonov SamsungPhone, ApplePhone, kotoriye realiziuyut interface IPhone.
            //Sozdat takje Screen, Button, Case, Processor dla kajdogo iz tipov konkretnix telefonov kotorie
            //budut realizovivat interfeysi IScreen, IButton, ICase, IProcessor sootvetstvenno.

            //Prodemonstrirovat rabotu programmi s pomowyu menu obweniya s polzovatelem.


            Console.WriteLine("Choose phone");
            string user_ch;
            Console.WriteLine("1. Samsung\n2. Apple");
            user_ch = Console.ReadLine();
            Console.Clear();
            IFabric samFabric = new SamsungFabric();
            IFabric appleFabric = new AppleFabric();
            switch (user_ch)
            {
                case "1":
                    IScreen samScreen = null;
                    IButton samButton = null;
                    IProcessor samProcessor = null;
                    IPhone samPhone = null;
                    ICase samCase = null;
                    while (true)
                    {

                        Console.WriteLine("1. Create screen");
                        Console.WriteLine("2. Create button");
                        Console.WriteLine("3. Create processor");
                        Console.WriteLine("4. Create phone");
                        Console.WriteLine("5. Create case");
                        Console.WriteLine("6. Create samsung phone");
                        user_ch = Console.ReadLine();
                        switch (user_ch)
                        {
                            case "1":
                                samScreen = samFabric.CreateScreen();
                                Console.Clear();
                                continue;
                            case "2":
                                samButton = samFabric.CreateButton();
                                Console.Clear();
                                continue;
                            case "3":
                                samProcessor = samFabric.CreateProcessor();
                                Console.Clear();
                                continue;
                            case "4":
                                samPhone = samFabric.CreatePhone();
                                Console.Clear();
                                continue;
                            case "5":
                                samCase = samFabric.CreateCase();
                                Console.Clear();
                                continue;
                            case "6":
                                if(samScreen != null && samButton != null && samProcessor != null && samPhone != null && samCase != null)
                                {
                                    samPhone.CreatePhone(samScreen, samButton, samCase, samProcessor);
                                }
                                else { Console.WriteLine("Components empty"); continue; }
                                break;
                        }
                        break;
                    }
                    

                    break;
                case "2":
                    IScreen appleScreen = null;
                    IButton appleButton = null;
                    IProcessor appleProcessor = null;
                    IPhone applePhone = null;
                    ICase appleCase = null;
                    while (true)
                    {
                        Console.WriteLine("1. Create screen");
                        Console.WriteLine("2. Create button");
                        Console.WriteLine("3. Create processor");
                        Console.WriteLine("4. Create phone");
                        Console.WriteLine("5. Create case");
                        Console.WriteLine("6. Create apple phone");
                        user_ch = Console.ReadLine();
                        switch (user_ch)
                        {
                            case "1":
                                appleScreen = appleFabric.CreateScreen();
                                Console.Clear();
                                continue;
                            case "2":
                                appleButton = appleFabric.CreateButton();
                                Console.Clear();
                                continue;
                            case "3":
                                appleProcessor = appleFabric.CreateProcessor();
                                Console.Clear();
                                continue;
                            case "4":
                                applePhone = appleFabric.CreatePhone();
                                Console.Clear();
                                continue;
                            case "5":
                                appleCase = appleFabric.CreateCase();
                                Console.Clear();
                                continue;
                            case "6":
                                if (appleScreen != null && appleButton != null && appleProcessor != null && applePhone != null && appleCase != null)
                                {
                                    applePhone.CreatePhone(appleScreen, appleButton, appleCase, appleProcessor);
                                }
                                else { Console.WriteLine("Components empty"); continue; }
                                break;
                        }
                        break;
                    }
                    break;
            }
            
        }
    }
}

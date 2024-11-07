using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

namespace Processes
{
    internal class Program
    {
        static void Main(string[] args)
        {
            

            //Posredstvom System.Diagnostics realizovat 
            //funkcional zapuska i zakritiya odnoy programmi.

            //Takje realizovat funkcional vivoda vsex zapuwennix processov na komputore.
            //IdProcessa  ImaProcessa PrioritetProcessa
            //IdProcessa2  ImaProcessa2 PrioritetProcessa2
            //IdProcessa3  ImaProcessa3 PrioritetProcessa3

            //Realizovat menu obweniye s polzovatelem.

            Console.Title = "Programm check";
            string user_ch;

            while (true)
            {
                Console.WriteLine("1. Create process\n2. Show all process\n3. Exit");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":
                        Console.WriteLine("Enter the process name: ");
                        Process new_process = new Process();
                        new_process.StartInfo.FileName = Console.ReadLine();
                        try
                        {
                            new_process.Start();
                        }
                        catch
                        {
                            Console.WriteLine("Error starting process, check the name of the file being launched");
                            continue;
                        }
                        Console.WriteLine($"Running process + {new_process.Id} -  {new_process.ProcessName} - {new_process.PriorityClass.ToString()}");
                        new_process.WaitForExit();
                        Console.WriteLine($"Process exited with code {new_process.ExitCode}");
                        continue;
                    case "2":
                        Process[] processes = Process.GetProcesses();
                        foreach (Process process in processes)
                        {
                            try
                            {
                                Console.WriteLine($"Running process + {process.Id} -  {process.ProcessName} - {process.PriorityClass.ToString()}");
                            }
                            catch
                            {
                                Console.WriteLine("Access denied"); ;
                            }
                        }
                        continue;
                    case "3":
                        break;
                }
                break;
            }
        }
    }
}

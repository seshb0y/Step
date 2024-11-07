using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
//using static TcpListenere.Programm;

namespace TCPCLient1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var client = new TcpClient();
            client.Connect("127.0.0.1", 27001);

            var stream = client.GetStream();

            var br = new BinaryReader(stream);
            var bw = new BinaryWriter(stream);

            while(true) 
            {
                var str = Console.ReadLine().ToUpper();
                if(str == "HELP")
                {
                    Console.WriteLine(Command.ProcList);
                    Console.WriteLine(Command.Run);
                    Console.WriteLine("HELP");
                    continue;
                }
                //else if (str == "ECHO")
                //{

                //}

                Command cmd = null;
                string response = null;
                var input = str.Split(' ');
                Console.WriteLine(input[0]);
                string cmdSerialized;
                byte[] cmdBytes;
                int responseLength;

                switch (input[0]) 
                {
                    case Command.Echo:

                        cmd = new Command { Text = Command.Echo, Param = Console.ReadLine() };
                        cmdSerialized = JsonSerializer.Serialize(cmd);
                        cmdBytes = Encoding.UTF8.GetBytes(cmdSerialized);
                        bw.Write(cmdBytes.Length);
                        bw.Write(cmdBytes);
                        bw.Flush();

                        responseLength = br.ReadInt32();
                        byte[] echo = br.ReadBytes(responseLength);
                        string echoResponse = Encoding.UTF8.GetString(echo);
                        var echoDes = JsonSerializer.Deserialize<string>(echoResponse);
                        Console.WriteLine(echoDes);
                        break;
                    case Command.Exe:
                        Console.WriteLine("------------");
                        cmd = new Command { Text = Command.Exe, Param = Console.ReadLine() };
                        cmdSerialized = JsonSerializer.Serialize(cmd);
                        cmdBytes = Encoding.UTF8.GetBytes(cmdSerialized);
                        bw.Write(cmdBytes.Length);
                        bw.Write(cmdBytes);
                        bw.Flush();
                        break;

                    case Command.Run:
                        //code logic
                        break;
                    default:
                        break;
                    
                }
            }
        }

        public class Command
        {
            public const string ProcList = "PROCLIST";
            public const string Run = "RUN";
            public const string Echo = "ECHO";
            public const string Exe = "EXECUTE";
            public string Text { get; set; }
            public string Param { get; set; }

        }
    }
}

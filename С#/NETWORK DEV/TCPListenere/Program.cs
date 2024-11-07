using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.IO;
//using Newtonsoft.Json;
using System.Text.Json;
using System.Diagnostics;


//Na primere napisannogo na uroke TcpClienta
//Napisat interfeys na Winforms
//Takje dobavit funkcional echo soobweniy.

//Klient otpravlaet 'ping' na server i ot servera vozvrawaetsa otvetniy ping

//2) a takje dobavte komandi zapuska prilojeniy nna servere. 
//Naprimer client vvodit nazvanie programmi "notepad" i na servernom komputere doljen zapustitsa notepad i vernutsa soobwenie 
//clientu "Notepad udacno zapuwen"


//Proverat zapuwennie na servere prilojeniya mojete takje cerez komadnu "Proclist" (napisannuyu na uroke)

namespace TCPListenere
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var ip = IPAddress.Parse("127.0.0.1");
            //var list
            //var ListenerEP = new IPEndPoint(ip, 27001);
            
            //var buffer = new byte[27001];
            var listener = new TcpListener(ip, 27001);
            listener.Start(100);

            while (true) 
            {
                var client = listener.AcceptTcpClient();
                var stream = client.GetStream();
                var br = new BinaryReader(stream);
                var bw = new BinaryWriter(stream);

                while (true)
                {
                    int length = br.ReadInt32();
                    byte[] inputBytes = br.ReadBytes(length);
                    string input = Encoding.UTF8.GetString(inputBytes);
                    var command = JsonSerializer.Deserialize<Command>(input);
                    if (command == null)
                    {
                        continue;
                    }
                    Console.WriteLine(command.Text);
                    Console.WriteLine(command.Param);
                    switch (command.Text)
                    {
                        //case Command.ProcList:
                        //    var processes = Process.GetProcesses();
                        //    bw.Write(JsonSerializer.Serialize(processes.Select(p => p.ProcessName)));
                        //    break;
                        case Command.Echo:
                            //string[] response = { br.ReadString() };
                            //bw.Write(JsonSerializer.Serialize(response.Select(p => p)));
                            //var response = br.ReadString();
                            //var echoSer = JsonSerializer.Serialize<string>(response);
                            //bw.Write(echoSer);

                            //int length = br.ReadInt32();
                            //byte[] word = br.ReadBytes(length);
                            //string responce = Encoding.UTF8.GetString(word);
                            string echoResponce = JsonSerializer.Serialize(command.Param);
                            //string serRespone = JsonSerializer.Serialize(responce);
                            byte[] responseData = System.Text.Encoding.UTF8.GetBytes(echoResponce);
                            bw.Write(responseData.Length);
                            bw.Write(responseData);
                            bw.Flush();

                            break;
                        case Command.Exe:
                            try
                            {
                                Process process = new Process();
                                process.StartInfo.FileName = command.Param;
                                process.Start(); 
                            }
                            catch(Exception ex)
                            {
                                Console.WriteLine(ex);
                            }

                            break;
                        case Command.Run:
                            // some commands logic
                            break;
                        default:
                            break;
                    }
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

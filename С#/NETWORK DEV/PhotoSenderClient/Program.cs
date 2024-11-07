using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Diagnostics;
using System.Text.Json;
using static SendİmageConsole.Program;

namespace SendİmageConsole
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

            int count = 1;



            while (true)
            {
                var str = Console.ReadLine().ToUpper();

                Command cmd = null;
                string response = null;

                string cmdSerialized;
                byte[] cmdBytes;
                int responseLength;

                switch (str)
                {
                    case Command.SendToServer:


                        cmd = new Command { Text = str, Param = Console.ReadLine() };
                        bw.Write(JsonSerializer.Serialize(cmd));

                        //cmdSerialized = JsonSerializer.Serialize(cmd);
                        //cmdBytes = Encoding.UTF8.GetBytes(cmdSerialized);
                        //bw.Write(cmdBytes.Length);
                        //bw.Write(cmdBytes);
                        //bw.Flush();

                        byte[] imgByte = File.ReadAllBytes(cmd.Param);
                        bw.Write(imgByte.Length);
                        bw.Write(imgByte);
                        break;

                    case Command.RecieveFromServer:

                        cmd = new Command { Text= str };
                        bw.Write(JsonSerializer.Serialize(cmd));

                        var filesFromServer = br.ReadString();
                        var files = JsonSerializer.Deserialize<string[]>(filesFromServer);
                        foreach (var file in files)
                        {
                            Console.WriteLine(file);
                        }
                        string userCh = Console.ReadLine();
                        bw.Write(JsonSerializer.Serialize(userCh));

                        string imgPath = $"C:\\Users\\Batyr_lg06\\Pictures\\ClientImages\\serverImage{count}.png";

                        int length = br.ReadInt32();
                        byte[] inputBytes = br.ReadBytes(length);
                        File.WriteAllBytes(imgPath, inputBytes);
                        Process.Start(new ProcessStartInfo(imgPath)
                        {
                            UseShellExecute = true
                        });
                        count++;
                        break;
                }
            }
        }

        public class Command
        {

            public const string SendToServer = "SEND";
            public const string RecieveFromServer = "RECIEVE";

            public string Text { get; set; }
            public string Param { get; set; }

        }
    }
}
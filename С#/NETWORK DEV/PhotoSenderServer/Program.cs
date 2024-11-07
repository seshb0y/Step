using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.IO;
//using System.Text.Json;
using System.Diagnostics;
using System.Text.Json;

namespace PhotoSenderServer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var ip = IPAddress.Parse("127.0.0.1");
            var listener = new TcpListener(ip, 27001);
            listener.Start(100);

            int count = 1;
            string folder = "C:\\Users\\Batyr_lg06\\Pictures\\ServerImages";
            while (true)
            {
                var client = listener.AcceptTcpClient();
                var stream = client.GetStream();
                var br = new BinaryReader(stream);
                var bw = new BinaryWriter(stream);

                while (true)
                {


                    var response = br.ReadString();
                    var command = JsonSerializer.Deserialize<Command>(response);

                    switch (command.Text)
                    {
                        case Command.SendToServer:


                            string imgPath = $"C:\\Users\\Batyr_lg06\\Pictures\\ServerImages\\receivedImg{count}.png";
                            int length = br.ReadInt32();
                            byte[] inputBytes = br.ReadBytes(length);
                            File.WriteAllBytes(imgPath, inputBytes);
                            Process.Start(new ProcessStartInfo(imgPath)
                            {
                                UseShellExecute = true
                            });
                            count++;
                            break;
                        case Command.RecieveFromServer:


                            string[] files = Directory.GetFiles(folder);
                            bw.Write(JsonSerializer.Serialize(files));

                            var userCh = br.ReadString();
                            var choice = JsonSerializer.Deserialize<string>(userCh);

                            string imagePath = files[int.Parse(choice) - 1];
                            byte[] imgByte = File.ReadAllBytes(imagePath);
                            bw.Write(imgByte.Length);
                            bw.Write(imgByte);
                            break;
                    }
                    

                }
            }
            

            

            //string input = Encoding.UTF8.GetString(inputBytes);
            //var command = JsonSerializer.Deserialize<Command>(input);

            //switch (command.Text)
            //{
            //    case Command.Send:

            //    case Command.Recieve:
                    
            //        break;
            //}

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
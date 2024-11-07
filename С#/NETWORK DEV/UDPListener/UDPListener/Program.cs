using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
namespace UDPListener
{
    //napisat chat sluwatel, v kotorom user budet vpisivat ip i port dla svazi a takje svoy nik name.
    //Realizovat otpravku i poluceniya sootvetvennix dannix v vide teksta.
    //Prilojeniye mojet bit konsolnim linbo okonim(Winforms.)
    //Takje realizuyte menu obweniya s polzovatelem.

    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter IP: ");
            string ip = Console.ReadLine();
            Console.WriteLine("Enter port: ");
            int port = int.Parse(Console.ReadLine());
            MainAsync(args, ip, port).GetAwaiter().GetResult();
        }
        static async Task MainAsync(string[] strings, string IP, int port)
        {
            var listener = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            var ip = IPAddress.Parse(IP);
            var listenerEP = new IPEndPoint(ip, port);
            listener.Bind(listenerEP);


            EndPoint ep = new IPEndPoint(IPAddress.Any, 0);
            var buffer = new byte[ushort.MaxValue];
            var segment = new ArraySegment<byte>(buffer);

            while (true)
            {
                var res = await listener.ReceiveFromAsync(segment, SocketFlags.None, ep);
                int len = res.ReceivedBytes;
                //var endPoint = res.RemoteEndPoint;
                var str = Encoding.Default.GetString(buffer, 0, len);

                Console.WriteLine(str);
            }
        }
    }
}

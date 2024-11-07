using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace UDPUser
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var client = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

            Console.WriteLine("Enter IP: ");
            string u_ip = Console.ReadLine();
            Console.WriteLine("Enter port: ");
            int port = int.Parse(Console.ReadLine());
            var ip = IPAddress.Parse(u_ip);
            Console.WriteLine("Enter name: ");
            string userN = Console.ReadLine();
            var connectEP = new IPEndPoint(ip, port);

            while (true)
            {
                Console.Clear();
                Console.WriteLine("Enter \'***\' to change name or \'!!!\' to change ip or \'???\' to change port");
                var str = Console.ReadLine();
                if (str == "***")
                {
                    Console.WriteLine("Enter new name: ");
                    userN = Console.ReadLine();
                    continue;
                }
                else if (str == "!!!")
                {
                    Console.WriteLine("Enter new ip: ");
                    ip = IPAddress.Parse(Console.ReadLine());
                    connectEP = new IPEndPoint(ip, port);
                    continue;
                }
                else if (str == "???")
                {
                    Console.WriteLine("Enter new port: ");
                    port = int.Parse(Console.ReadLine());
                    connectEP = new IPEndPoint(ip, port);
                    continue;
                }
                var bytes = Encoding.Default.GetBytes(userN + ": " + str);
                client.SendTo(bytes, connectEP);
            }
        }
    }
}

using ChatServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatServer
{
    internal class Users
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<Messages> Messages { get; set; } = new List<Messages>();
        public List<Images> Images { get; set; } = new List<Images>();
    }
}

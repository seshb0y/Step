using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatServer
{
    internal class Images
    {
        public int Id { get; set; }
        public byte[] ByteMassive { get; set; }

        public string Time { get; set; }
        public Users User { get; set; }
    }
}

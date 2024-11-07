using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Umico
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; } = 0;
        public int Amount { get; set; }

        public List<Order> Orders { get; set; } = new List<Order>();

    }
}

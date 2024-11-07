using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENtity_Market_CRUD
{
    public class Bill
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int? Price { get; set; }

        public List<Product>? Products { get; set; } = new List<Product>();

        public int CustomerId { get; set; }
        public Customer Customers { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Umico
{
    public class Order
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int? Price { get; set; }

        public int? StatusId { get; set; }
        public Status? Status { get; set; }

        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
        public List<int>? ProductAmount { get; set; } = new List<int>();
        
        public int? PickPointId { get; set; }
        public PickPoint? PickPoint { get; set; }

    }
}

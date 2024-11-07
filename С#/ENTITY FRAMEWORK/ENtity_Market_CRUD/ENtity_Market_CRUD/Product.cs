using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENtity_Market_CRUD
{
    public class Product
    {
        [Column("ProductId")]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
        //public int? BillId { get; set; }
        public List<Bill>? Bills { get; set; } = new List<Bill>();
        public List<Shop> Shops { get; set; } = new List<Shop>();
    }
}

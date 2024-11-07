using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Umico
{
    public class Status
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public List<Order>? Orders { get; set; } = new List<Order>();
    }
}

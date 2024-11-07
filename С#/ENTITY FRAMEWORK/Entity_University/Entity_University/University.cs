using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_University
{
    public class University
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? City { get; set; }
        public List<Faculty> Faculties { get; set; } = new();
    }
}

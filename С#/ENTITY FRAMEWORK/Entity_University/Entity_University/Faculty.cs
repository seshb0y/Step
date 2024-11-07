using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_University
{
    public class Faculty
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Places { get; set; }
        public List<University> Universities { get; set; } = new();
    }
}

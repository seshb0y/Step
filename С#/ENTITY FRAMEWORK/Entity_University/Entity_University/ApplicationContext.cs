using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_University
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Faculty> Faculties { get; set; } = null!;
        public DbSet<University> Universities { get; set; } = null!;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = DESKTOP-ADMB59T; Initial Catalog = Universities; Trust Server Certificate = True; Integrated Security = True");
        }
    }
}

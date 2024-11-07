using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityAvtoSalon
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Car> Cars => Set<Car>();
        public ApplicationContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = DESKTOP-ADMB59T; Initial Catalog =ShowRoom; Trust Server Certificate = True; Integrated Security = True");
        }
    }
}

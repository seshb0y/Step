using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityMarket
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; } = null!;

        public DbSet<Products> Products { get; set; } = null!;

        public ApplicationContext() 
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = DESKTOP-ADMB59T; Initial Catalog =NewMArket; Trust Server Certificate = True; Integrated Security = True");
        }
    }
}

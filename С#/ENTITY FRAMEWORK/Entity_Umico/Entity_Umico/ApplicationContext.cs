using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Umico
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Status> Status { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<PickPoint> Points { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = DESKTOP-ADMB59T; Initial Catalog = Entity_UMICO; Trust Server Certificate = True; Integrated Security = True");
        }
    }
}

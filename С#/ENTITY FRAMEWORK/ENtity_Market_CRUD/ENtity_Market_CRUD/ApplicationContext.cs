using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENtity_Market_CRUD
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Bill> Bills { get; set; } = null!;
        public DbSet<Shop> Shops { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = DESKTOP-ADMB59T; Initial Catalog = Entity_Market_CRUD; Trust Server Certificate = True; Integrated Security = True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasMany(p => p.Shops).WithMany(s => s.Products).UsingEntity(j => j.ToTable("Products in shops"));
            modelBuilder.Entity<Bill>().HasMany(b => b.Products).WithMany(p => p.Bills).UsingEntity(j => j.ToTable("Bills with products"));
            modelBuilder.Entity<Customer>().HasMany(c => c.Bills).WithOne(b => b.Customers).HasForeignKey(b => b.CustomerId);
        }
    }
}

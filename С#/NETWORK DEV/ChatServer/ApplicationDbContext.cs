using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatServer
{
    internal class ApplicationDbContext : DbContext
    {
        public DbSet<Users> Users { get; set; } = null;
        public DbSet<Messages> Messages { get; set; } = null;
        public DbSet<Images> Images { get; set; } = null;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = DESKTOP-ADMB59T; Initial Catalog = NewTelegram1; Trust Server Certificate = True; Integrated Security = True");
        }


    }
}

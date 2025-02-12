using ControllerFirst.Data.Models;

using Microsoft.EntityFrameworkCore;

namespace ControllerFirst.Contexts;

public class AuthContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }

    public AuthContext()
    {
        
    }
    public AuthContext(DbContextOptions<AuthContext> ops): base(ops)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=localhost; Initial Catalog=Auth_23; User Id=sa; Password=Elvin123; Trust Server Certificate=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AuthContext).Assembly); 
    }
}
using CRMSolution.Data.Models;
using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Contexts;

public class CRMContext : DbContext
{
    
    
    public DbSet<User> Users { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Tasks> Tasks { get; set; }
    public DbSet<Order> Orders { get; set; }

  

    public CRMContext(DbContextOptions<CRMContext> ops): base(ops)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CRMContext).Assembly); 
    }
}
using LibraryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Data.Context;

public class LibContext : DbContext
{
    public DbSet<Authors> Authors { get; set; }
    public DbSet<Books> Books { get; set; }
    public DbSet<Genres> Genre { get; set; }

    public LibContext(DbContextOptions<LibContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LibContext).Assembly);
    }
}
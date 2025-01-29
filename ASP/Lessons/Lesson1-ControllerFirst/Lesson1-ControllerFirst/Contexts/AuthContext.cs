using Lesson1_ControllerFirst.Models;
using Microsoft.EntityFrameworkCore;

namespace Lesson1_ControllerFirst.Contexts;

public class AuthContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public AuthContext(DbContextOptions<AuthContext> ops) : base(ops)
    {
        
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CRMSolution.Contexts;

public class CRMContextFactory : IDesignTimeDbContextFactory<CRMContext>
{
    public CRMContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<CRMContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        Console.WriteLine($"Строка подключения: {connectionString}");

        optionsBuilder.UseSqlServer(connectionString);

        return new CRMContext(optionsBuilder.Options);
    }
}
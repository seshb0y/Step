using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

namespace CRMSolution.Data.Repository.UserRep;

public interface IUserRep : IRepository<User>
{
    public Task<User?> FindByNameAsync(string name);
    public Task<User?> FindByEmailAsync(string name);
    
    public Task SaveChangesAsync();
}
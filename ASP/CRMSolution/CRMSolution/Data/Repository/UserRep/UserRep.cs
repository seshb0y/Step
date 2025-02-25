using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace CRMSolution.Data.Repository.UserRep;

public class UserRep : Repository<User>, IUserRep
{
    public UserRep(CRMContext context) : base(context)
    {
        
    }
    
    public async Task<User> FindByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.UserName == name);
    }
    
    public async Task<User> FindByEmailAsync(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }
    
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
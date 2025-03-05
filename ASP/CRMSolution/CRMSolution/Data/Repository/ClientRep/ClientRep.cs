using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Data.Repository.SpecialRepClass.ClientRep;

public class ClientRep : Repository<Client>, IClientRep
{
    public ClientRep(CRMContext context) : base(context)
    {
        
    }

    public async Task<IEnumerable<Client>> GetClientsByManagerIdAsync(int managerId)
    {
        return await _dbSet
            .Where(c => c.ClientUsers.Any(cu => cu.UserId == managerId))
            .ToListAsync();
    }

    public async Task<Client?> GetClientByEmail(String email)
    {
        return await _dbSet.FirstOrDefaultAsync(c => c.Email == email);
    }

    public async Task<Client?> GetClientByName(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(c => c.Name == name);
    }

    public async Task<List<Client>> GetLowInfoClientsList()
    {
        return await _dbSet.Select(c => new Client
        {
            Name = c.Name,
            Email = c.Email,
            Phone = c.Phone,
            Address = c.Address,
            CreatedAt = c.CreatedAt,
        }).ToListAsync();
    }
}
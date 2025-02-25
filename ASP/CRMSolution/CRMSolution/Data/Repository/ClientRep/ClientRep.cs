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

    public async Task<IEnumerable<Client>> GetClientsByManagerIdAsync(Guid managerId)
    {
        return await _dbSet.Where(c => c.ManagerId == managerId).ToListAsync();
    }
}
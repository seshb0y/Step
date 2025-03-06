using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
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

    public async Task<List<Client>> GetLowInfoClientsList(SortClientsRequest sortClientsRequest)
    {
        var query = _dbSet.Select(c => new Client
        {
            Id = c.Id,
            Name = c.Name,
            Email = c.Email,
            Phone = c.Phone,
            Address = c.Address,
            CreatedAt = c.CreatedAt,
        });
        
        query = sortClientsRequest.sortBy?.ToLower() switch
        {
            "name" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.Name) : query.OrderBy(c => c.Name),
            "email" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.Email) : query.OrderBy(c => c.Email),
            "id" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.Id) : query.OrderBy(c => c.Id),
            "address" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.Address) : query.OrderBy(c => c.Address),
            "createdat" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.CreatedAt) : query.OrderBy(c => c.CreatedAt),
            _ => query
        };

        return await query.ToListAsync();
    }

}
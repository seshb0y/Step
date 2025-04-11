using System.Diagnostics;
using ControllerFirst.DTO.Responses;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Data.Repository.SpecialRepClass.ClientRep;

public class ClientRep : Repository<Client>, IClientRep
{
    
    private readonly Stopwatch _stopwatch;
    public ClientRep(CRMContext context) : base(context)
    {
        _stopwatch = new Stopwatch();
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

    public async Task<FindClientResponse?> GetClientsOrdersAndUsersAsync(string email)
    {
        var client = await _dbSet
            .Where(c => c.Email == email)
            .Include(c => c.ClientOrders)
            .ThenInclude(co => co.Order)
            .Include(c => c.ClientUsers)
            .ThenInclude(cu => cu.User)
            .FirstOrDefaultAsync();

        if (client == null) return null;

        var orders = client.ClientOrders.Select(co => new OrderDto
        {
            Id = co.Order.Id,
            Amount = co.Order.TotalAmount,
            Status = co.Order.Status
        }).ToArray();

        var users = client.ClientUsers.Select(cu => new UserDto
        {
            Id = cu.User.Id,
            Name = cu.User.Username,
            Email = cu.User.Email
        }).ToArray();
        
        return new FindClientResponse
        {
            Orders = orders,
            Users = users
        };
    }
    
    public async Task<List<Order>> GetOrdersByUsername(string username)
    {
        return await _context.Orders
            .Include(o => o.Tasks)
            .Include(o => o.UserOrders)
            .ThenInclude(uo => uo.User)
            .Where(o => o.UserOrders.Any(uo => uo.User.Username == username))
            .ToListAsync();
    }

    public async Task<List<Client>> GetClientsByOrdersAsync(List<Order> orders)
    {
        return await _context.Clients
            .Include(c => c.ClientOrders)
            .ThenInclude(co => co.Order)
            .Where(c => c.ClientOrders.Any(co => orders.Contains(co.Order)))
            .ToListAsync();
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
            "phone" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.Phone) : query.OrderBy(c => c.Phone),
            "createdat" => sortClientsRequest.Descending ? query.OrderByDescending(c => c.CreatedAt) : query.OrderBy(c => c.CreatedAt),
            _ => query
        };

        return await query.ToListAsync();
    }

}
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Orders;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Data.Repository.OrderResp;

public class OrderRep : Repository<Order>, IOrderRep
{
    public OrderRep(CRMContext context) : base(context)
    {
    }

    public async Task AddOrderToClientAndUser(Client client, Order order, User user)
    {
        order.ClientOrders.Add(
            new ClientOrder
            {
                OrderId = order.Id,
                ClientId = client.Id,
                Order = order,
                Client = client,
            });
        order.UserOrders.Add(
            new UserOrders
            {
                OrderId = order.Id,
                UserId = user.Id,
                Order = order,
                User = user,
            });
        
        await _context.SaveChangesAsync();
    }

    // public async Task<Order> GetOrderInclude(int orderId)
    // {
    //     return await _dbSet
    //         .Include(o => o.ClientOrders)
    //         .ThenInclude(o => o.Client)
    //         .Include(o => o.Tasks)
    //         .Include(o => o.UserOrders)
    //         .ThenInclude(o => o.User)
    //         .FirstOrDefaultAsync(o => o.Id == orderId);
    // }
    
    public async Task<Order> GetOrderWithClientAndTasks(int orderId)
    {
        return await _context.Orders
            .Include(o => o.ClientOrders)
            .ThenInclude(co => co.Client)
            .Include(o => o.Tasks)
            .Include(o => o.UserOrders)
            .ThenInclude(uo => uo.User)
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }



    public async Task<List<Order>> GetLowInfoOrdersList(SortOrdersRequest sortOrdersRequest)
    {
        var query = _dbSet.Select(o => new Order()
        {
            Id = o.Id,
            TotalAmount = o.TotalAmount,
            Status = o.Status,
            CreatedAt = o.CreatedAt,
        });
        
        query = sortOrdersRequest.sortBy?.ToLower() switch
        {
            "id" => sortOrdersRequest.Descending ? query.OrderByDescending(c => c.Id) : query.OrderBy(c => c.Id),
            "totalamount" => sortOrdersRequest.Descending ? query.OrderByDescending(c => c.TotalAmount) : query.OrderBy(c => c.TotalAmount),
            "status" => sortOrdersRequest.Descending ? query.OrderByDescending(c => c.Status) : query.OrderBy(c => c.Status),
            "createdat" => sortOrdersRequest.Descending ? query.OrderByDescending(c => c.CreatedAt) : query.OrderBy(c => c.CreatedAt),
            _ => query
        };

        return await query.ToListAsync();
    }

    
}
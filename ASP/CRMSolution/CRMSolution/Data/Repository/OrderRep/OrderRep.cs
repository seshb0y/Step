using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Data.Repository.OrderResp;

public class OrderRep : Repository<Order>, IOrderRep
{
    public OrderRep(CRMContext context) : base(context)
    {
    }

    public async Task AddOrderToClient(Client client, Order order)
    {
        order.ClientOrders.Add(
            new ClientOrder
            {
                OrderId = order.Id,
                ClientId = client.Id,
                Order = order,
                Client = client,
            });
        await _context.SaveChangesAsync();
    }

    public async Task<Order> GetOrderInclude(int orderId)
    {
        return await _dbSet
            .Include(o => o.ClientOrders)
            .ThenInclude(o => o.Client)
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }
    
    public async Task<Order> GetOrderWithClientAndTasks(int orderId)
    {
        return await _context.Orders
            .AsNoTracking()
            .Include(o => o.ClientOrders)
            .ThenInclude(co => co.Client)
            .Include(o => o.Tasks)
            .Include(o => o.UserOrders) 
            .ThenInclude(uo => uo.User) 
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }



}
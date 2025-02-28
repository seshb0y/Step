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
}
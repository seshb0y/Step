using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

namespace CRMSolution.Data.Repository.OrderResp;

public interface IOrderRep : IRepository<Order>
{
    public Task AddOrderToClient(Client client, Order order);
    public Task<Order> GetOrderInclude(int orderId);
}
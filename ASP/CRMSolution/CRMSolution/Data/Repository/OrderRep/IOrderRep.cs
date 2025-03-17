using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Orders;

namespace CRMSolution.Data.Repository.OrderResp;

public interface IOrderRep : IRepository<Order>
{
    public Task AddOrderToClientAndUser(Client client, Order order, User user);
    // public Task<Order> GetOrderInclude(int orderId);
    public Task<Order> GetOrderWithClientAndTasks(int orderId);
    public Task<List<Order>> GetLowInfoOrdersList(SortOrdersRequest sortOrdersRequest);
    public Task<Order> GetByIdAsync(int orderId);
}
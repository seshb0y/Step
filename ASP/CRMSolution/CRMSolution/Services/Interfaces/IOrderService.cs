using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;

namespace CRMSolution.Services.Interfaces;

public interface IOrderService
{
    public Task CreateOrder(CreateOrderRequest request);
    public Task ChangeDataOrder(ChangeOrderDataRequest request);
    public Task DeleteOrder(DeleteOrderRequest request);
    public Task<Order> FindOrder(FindOrderRequest request);
}
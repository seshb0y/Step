using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Order;
using CRMSolution.DTO.Requests.Orders;

namespace CRMSolution.Services.Interfaces;

public interface IOrderService
{
    public Task CreateOrder(CreateOrderRequest request);
    public Task ChangeDataOrder(ChangeOrderDataRequest request);
    public Task DeleteOrder(DeleteOrderRequest request);
    // public Task<OrderResponse> FindOrder(FindOrderRequest request);
    Task<OrderDetailsResponse> GetOrderDetailsAsync(int orderId);
    public Task<GetAllOrdersResponse> GetAllOrders(SortOrdersRequest sortOrdersRequest);
    public Task ChangeResponsible(int orderId, ChangeResponsibleRequest request);
}
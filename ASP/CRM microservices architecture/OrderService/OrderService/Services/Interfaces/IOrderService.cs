using CRMSolution.Grpc.Orders;
using OrderService.Data.Models;
using OrderService.DTO.Requests;
using OrderService.DTO.Requests.Order;
using OrderService.DTO.Requests.Orders;
using OrderService.DTO.Responses;

namespace OrderService.Services.Interfaces;

public interface IOrderService
{
    public Task CreateOrder(CreateOrderRequest request);
    public Task ChangeDataOrder(ChangeOrderDataRequest request);
    public Task DeleteOrder(DeleteOrderRequest request);
    // public Task<OrderResponse> FindOrder(FindOrderRequest request);
    Task<OrderDetailsResponse> GetOrderDetailsAsync(int orderId);
    public Task<GetAllOrdersResponse> GetAllOrders(SortOrdersRequest sortOrdersRequest);
    public Task ChangeResponsible(int orderId, ChangeResponsibleRequest request);
    Task<Order> GetByIdAsync(int orderId);

}
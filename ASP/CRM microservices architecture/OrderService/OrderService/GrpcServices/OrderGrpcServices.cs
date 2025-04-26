using Grpc.Core;
using CRMSolution.Grpc.Orders; // <-- Только этот using правильный!
using OrderService.Services.Interfaces;
using OrderService.DTO.Requests.Order;

namespace OrderService.GrpcServices;

public class OrderGrpcService : CRMSolution.Grpc.Orders.OrderGrpcService.OrderGrpcServiceBase 
{
    private readonly IOrderService _orderService;

    public OrderGrpcService(IOrderService orderService)
    {
        _orderService = orderService;
    }

    public override async Task<OrderDto> GetOrderById(GetOrderByIdRequest request, ServerCallContext context)
    {
        var order = await _orderService.GetByIdAsync(request.OrderId);

        return new OrderDto
        {
            Id = order.Id.ToString(),
            TotalAmount = (double)order.TotalAmount,
            Status = order.Status.ToString(),
            UserId = order.UserId,
            ClientId = order.ClientId
        };
    }
}
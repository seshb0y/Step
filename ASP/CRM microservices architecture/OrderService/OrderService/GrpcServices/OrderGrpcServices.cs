using Grpc.Core;
using CRMSolution.Grpc.Orders;
using OrderService.DTO.Requests; // <-- Только этот using правильный!
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
            UserId = order.UserId ?? 0,
            ClientId = order.ClientId ?? 0,
        };
    }

    public override async Task<CreateOrderResponse> CreateOrder(CreateOrderRequest request,
        ServerCallContext context)
    {
        _orderService.CreateOrder(request);
        return new CreateOrderResponse
        {
            Success = true,
            Message = "Order created successfully!"
        };
    }

    public override async Task<ChangeOrderDataResponse> ChangeOrderData(ChangeOrderDataRequest request,
        ServerCallContext context)
    {
        await _orderService.ChangeDataOrder(request);

        return new ChangeOrderDataResponse
        {
            Success = true,
            Message = "Order updated"
        };
    }

    public override async Task<DeleteOrderResponse> DeleteOrder(DeleteOrderRequest request, ServerCallContext context)
    {
        await _orderService.DeleteOrder(request);
        
        return new DeleteOrderResponse
        {
            Success = true,
            Message = "Order updated"
        }; 
    }
}
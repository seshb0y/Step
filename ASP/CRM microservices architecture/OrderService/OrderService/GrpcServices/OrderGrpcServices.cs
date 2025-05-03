using CRMSolution.Grpc.Client;
using CRMSolution.Grpc.Orders;
using CRMSolution.Grpc.Tasks;
using CRMSolution.Grpc.Users;
using Grpc.Core;
using OrderService.Data.Models;
using OrderService.DTO.Requests; // <-- Только этот using правильный!
using OrderService.Services.Interfaces;
using OrderService.DTO.Requests.Order;
using OrderStatus = CRMSolution.Grpc.Orders.OrderStatus;

namespace OrderService.GrpcServices;

public class OrderGrpcService : CRMSolution.Grpc.Orders.OrderGrpcService.OrderGrpcServiceBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrderGrpcService> _logger;
    private readonly UserService.UserServiceClient _userGrpcClient;
    private readonly ClientGrpcService.ClientGrpcServiceClient _clientGrpcClient;
    private readonly TaskGrpcService.TaskGrpcServiceClient _taskGrpcService;

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

    public override async Task<GetOrderFullInfoResponse> GetOrderFullInfo(GetOrderFullInfoRequest request,
        ServerCallContext context)
    {
        Order order =  await _orderService.GetOrderAsync(request.OrderId);
        var grpcTaskRequest = new GetTaskByIdRequest
        {
            Id = order.Id
        };
        var grpcClientRequest = new GetClientByIdRequest
        {
            ClientId = order.ClientId.Value
        };
        var grpcUserRequest = new GetUserByIdRequest
        {
            Id = order.UserId.Value
        };
        
        var grpcTaskResponse = await _taskGrpcService.GetTaskByIdAsync(grpcTaskRequest);
        var grpcClientResponse = await _clientGrpcClient.GetClientByIdAsync(grpcClientRequest);
        var grpcUserResponse = await _userGrpcClient.GetUserByIdAsync(grpcUserRequest);

        return new GetOrderFullInfoResponse
        {
            ClientId = grpcClientResponse.Id,
            ClientName = grpcClientResponse.Name,
            ClientEmail = grpcClientResponse.Email,
            ClientPhone = grpcClientResponse.Phone,
            ClientAddress = grpcClientResponse.Address,
            ClientCreatedAt = grpcClientResponse.CreatedAt,

            OrderId = order.Id,
            OrderTotalAmount = (double)order.TotalAmount,
            OrderStatus = (OrderStatus)order.Status,

            TaskId = grpcTaskResponse.Id,
            TaskTitle = grpcTaskResponse.Title,
            TaskDescription = grpcTaskResponse.Description,
            TaskStatus = grpcTaskResponse.Status,

            UserId = grpcUserResponse.Id,
            UserName = grpcUserResponse.Username,
            UserEmail = grpcUserResponse.Email,
            UserRole = grpcUserResponse.Role,
            IsUserEmailConfirmed = grpcUserResponse.IsEmailConfirmed,
        };
    }
}
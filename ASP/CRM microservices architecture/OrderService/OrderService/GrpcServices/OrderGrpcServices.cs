using AutoMapper;
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
    private readonly IMapper _mapper;

    public OrderGrpcService(IOrderService orderService,  ILogger<OrderGrpcService> logger, UserService.UserServiceClient userGrpcClient,
        ClientGrpcService.ClientGrpcServiceClient clientGrpcClient,  TaskGrpcService.TaskGrpcServiceClient taskGrpcService,
        IMapper mapper)
    {
        _orderService = orderService;
        _logger = logger;
        _userGrpcClient = userGrpcClient;
        _clientGrpcClient = clientGrpcClient;
        _taskGrpcService = taskGrpcService;
        _mapper = mapper;
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
        return await _orderService.GetOrderInfo(request);
    }
    
    public override async Task<GetLowInfoOrdersListResponse> GetLowInfoOrdersList(GetLowInfoOrdersListRequest request, ServerCallContext context)
    {
        return await _orderService.GetLowInfoOrdersAsync(request.Sort);
    }
}
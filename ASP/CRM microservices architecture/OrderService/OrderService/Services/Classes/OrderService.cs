using AutoMapper;
using CRMSolution.Grpc.Client;
using Microsoft.AspNetCore.SignalR;
using OrderService.Data.Models;
using OrderService.Data.Repository.OrderResp;
using OrderService.DTO.Requests;
using OrderService.DTO.Requests.Order;
using OrderService.DTO.Requests.Orders;
using OrderService.DTO.Responses;
using OrderService.Hubs;
using OrderService.Services.Interfaces;
using CRMSolution.Grpc.Users;
using CRMSolution.Grpc.Client;
using CRMSolution.Grpc.Orders;
using CRMSolution.Grpc.Tasks;
using Google.Protobuf.WellKnownTypes;



namespace OrderService.Services.Classes;

public class OrderService : IOrderService
{
    private readonly IOrderRep _orderRep;
    private readonly IMapper _mapper;
    private readonly ILogger<OrderService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly UserService.UserServiceClient _userGrpcClient;
    private readonly ClientGrpcService.ClientGrpcServiceClient _clientGrpcClient;
    private readonly TaskGrpcService.TaskGrpcServiceClient _taskGrpcService;
    
    public OrderService(IOrderRep orderRep, IMapper mapper, ILogger<OrderService> logger, 
        IHubContext<NotificationHub> notificationHub, UserService.UserServiceClient userGrpcClient,
        ClientGrpcService.ClientGrpcServiceClient clientGrpcClient, TaskGrpcService.TaskGrpcServiceClient taskGrpcService)
    {
        _orderRep = orderRep;
        _mapper = mapper;
        _logger = logger;
        _notificationHub = notificationHub;
        _userGrpcClient = userGrpcClient;
        _clientGrpcClient = clientGrpcClient;
        _taskGrpcService = taskGrpcService;
    }
    
    public async Task<Order> GetByIdAsync(int orderId)
    {
        return await _orderRep.GetByIdAsync(orderId);
    }

    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        _logger.LogInformation("Создаем заказ. Проверка пользователя через gRPC: {@Request}", request);

        // gRPC-запрос на получение пользователя по Email
        

        Order order = _mapper.Map<Order>(request);
        
        await _orderRep.AddAsync(order);
        await _orderRep.SaveChangesAsync();

        var grpcUserRequest = new FindUserRequest
        {
            OrderId = order.Id,
            Email = request.UserEmail
        };

        var grpcUserResponse = await _userGrpcClient.FindUserAsync(grpcUserRequest);
        
        var lastOrder = _orderRep.GetAllAsync();
        var grpcClientRequest = new GetClientByEmailRequest
        {
            OrderId = order.Id,
            Email = request.ClientEmail
        }; 
        var grpcClientResponse = await _clientGrpcClient.GetClientByEmailAsync(grpcClientRequest);
        
        order.UserId = grpcUserResponse.Id;
        order.ClientId = grpcClientResponse.Id;
        
        await _orderRep.SaveChangesAsync();
        
        var grpcTaskRequest = new CreateTaskRequest
        {
            Title = "First contact",
            Description = "Connect the client",
            DueDate = Timestamp.FromDateTime(DateTime.UtcNow),
            OrderId = order.Id,
        };
        var grpcTaskReponse = await _taskGrpcService.CreateFirstTaskAsync(grpcTaskRequest);
        _logger.LogInformation("Задача создана через gRPC: ", grpcTaskReponse.Success, grpcTaskReponse.Message);
        
        await _notificationHub.Clients.All.SendAsync("OrderCreated", new
        {
            order.Id,
            order.CreatedAt,
            order.TotalAmount,
            order.Status,
        });
    }

    public async Task ChangeDataOrder(ChangeOrderDataRequest request)
    {
        _logger.LogInformation("Изменяем заказ: {@Request}", request);
        Order order = await _orderRep.GetById(request.OrderId);
        
        order = _mapper.Map(request, order);
        _orderRep.Update(order);
        await _orderRep.SaveChangesAsync();
        await _notificationHub.Clients.All.SendAsync("OrderUpdated", new
        {
            order.Id,
            order.CreatedAt,
            order.TotalAmount,
            order.Status,
        });
    }

    public async Task DeleteOrder(DeleteOrderRequest request)
    {
        Order order = await _orderRep.GetByIdAsync(request.OrderId);
        order.IsDeleted = true;
        await _orderRep.SaveChangesAsync();
    }

    public Task<OrderDetailsResponse> GetOrderDetailsAsync(int orderId)
    {
        throw new NotImplementedException();
    }

    public Task<GetAllOrdersResponse> GetAllOrders(SortOrdersRequest sortOrdersRequest)
    {
        throw new NotImplementedException();
    }
    
    public async Task ChangeResponsible(int orderId, ChangeResponsibleRequest request)
    {
        _logger.LogInformation("Изменение ответственного. Проверка пользователя через gRPC: {@UserId}", request.userId);

        // gRPC-запрос на получение пользователя по Id
        var grpcUserRequest = new GetUserByIdRequest
        {
            Id = request.userId
        };

        var grpcUserResponse = await _userGrpcClient.GetUserByIdAsync(grpcUserRequest);

        if (grpcUserResponse == null || grpcUserResponse.Id == 0)
        {
            _logger.LogWarning("Пользователь с ID {UserId} не найден.", request.userId);
            throw new KeyNotFoundException($"User with id {request.userId} not found.");
        }

        _logger.LogInformation("Пользователь найден через gRPC: {UserId} - {Email}", grpcUserResponse.Id, grpcUserResponse.Email);

        // Здесь могла бы быть логика изменения ответственного, но она убрана по твоему запросу
    }


}
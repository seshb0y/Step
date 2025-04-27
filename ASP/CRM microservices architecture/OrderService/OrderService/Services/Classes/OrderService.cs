using AutoMapper;
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


namespace OrderService.Services.Classes;

public class OrderService : IOrderService
{
    private readonly IOrderRep _orderRep;
    private readonly IMapper _mapper;
    private readonly ILogger<OrderService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly UserService.UserServiceClient _userGrpcClient;
    
    public OrderService(IOrderRep orderRep, IMapper mapper, ILogger<OrderService> logger, 
        IHubContext<NotificationHub> notificationHub, UserService.UserServiceClient userGrpcClient)
    {
        _orderRep = orderRep;
        _mapper = mapper;
        _logger = logger;
        _notificationHub = notificationHub;
        _userGrpcClient = userGrpcClient;
    }
    
    public async Task<Order> GetByIdAsync(int orderId)
    {
        return await _orderRep.GetByIdAsync(orderId);
    }

    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        _logger.LogInformation("Создаем заказ. Проверка пользователя через gRPC: {@Request}", request);

        // gRPC-запрос на получение пользователя по Email
        var grpcUserRequest = new FindUserRequest
        {
            Email = request.userEmail
        };

        var grpcUserResponse = await _userGrpcClient.FindUserAsync(grpcUserRequest);

        if (grpcUserResponse == null || grpcUserResponse.Id == 0)
        {
            _logger.LogWarning("Пользователь с email {Email} не найден.", request.userEmail);
            throw new KeyNotFoundException($"User with email {request.userEmail} not found.");
        }

        _logger.LogInformation("Пользователь найден через gRPC: {UserId} - {Email}", grpcUserResponse.Id, grpcUserResponse.Email);

        // Здесь могла бы быть логика создания ордера, но она убрана по твоему запросу
    }

    public Task ChangeDataOrder(ChangeOrderDataRequest request)
    {
        throw new NotImplementedException();
    }

    public Task DeleteOrder(DeleteOrderRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<OrderDetailsResponse> GetOrderDetailsAsync(int orderId)
    {
        throw new NotImplementedException();
    }

    public Task<GetAllOrdersResponse> GetAllOrders(SortOrdersRequest sortOrdersRequest)
    {
        throw new NotImplementedException();
    }


    // public async Task ChangeDataOrder(ChangeOrderDataRequest request)
    // {
    //     _logger.LogInformation("Изменяем заказ: {@Request}", request);
    //     Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
    //     
    //     order = _mapper.Map(request, order);
    //     _unitOfWork.OrderRep.Update(order);
    //     await _unitOfWork.SaveChangesAsync();
    //     await _notificationHub.Clients.All.SendAsync("OrderUpdated", new
    //     {
    //         order.Id,
    //         order.CreatedAt,
    //         order.TotalAmount,
    //         order.Status,
    //     });
    // }
    
    // public async Task DeleteOrder(DeleteOrderRequest request)
    // {
    //     _logger.LogInformation("Удаляем заказ: {@Request}", request);
    //     Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
    //     
    //     if (order == null)
    //     {
    //         throw new KeyNotFoundException($"Client with id {request.orderId} not found");
    //     }
    //     
    //     _unitOfWork.OrderRep.Delete(order);
    //     await _unitOfWork.SaveChangesAsync();
    //     await _notificationHub.Clients.All.SendAsync("OrderDeleted", new
    //     {
    //         order.Id,
    //     });
    // }
    
    // public async Task<OrderResponse> FindOrder(FindOrderRequest request)
    // {
    //     _logger.LogInformation("Поиск клиента: {@Request}", request);
    //     Order order = await _unitOfWork.OrderRep.GetOrderInclude(request.orderId);
    //     return _mapper.Map<OrderResponse>(order);
    // }
    
    // public async Task<OrderDetailsResponse> GetOrderDetailsAsync(int orderId)
    // {
    //     _logger.LogInformation("Получение деталей заказа: {OrderId}", orderId);
    //
    //     var order = await _unitOfWork.OrderRep.GetOrderWithClientAndTasks(orderId);
    //     if (order == null)
    //     {
    //         _logger.LogWarning("Заказ с ID {OrderId} не найден", orderId);
    //         return null;
    //     }
    //
    //     var response = _mapper.Map<OrderDetailsResponse>(order);
    //     
    //     if (order.ClientOrders.Any())
    //     {
    //         response.Client = _mapper.Map<ClientResponse>(order.ClientOrders.First().Client);
    //     }
    //
    //     return response;
    // }
    
    // public async Task<GetAllOrdersResponse> GetAllOrders(SortOrdersRequest sortOrdersRequest)
    // {
    //     var orders = await _unitOfWork.OrderRep.GetLowInfoOrdersList(sortOrdersRequest);
    //     return new GetAllOrdersResponse()
    //     {
    //         Orders = _mapper.Map<List<OrderDTO>>(orders)
    //     };
    // }
    
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
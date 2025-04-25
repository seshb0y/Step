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

namespace OrderService.Services.Classes;

public class OrderService : IOrderService
{
    private readonly IOrderRep _orderRep;
    private readonly IMapper _mapper;
    private readonly ILogger<OrderService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    
    public OrderService(IOrderRep orderRep, IMapper mapper, ILogger<OrderService> logger,  IHubContext<NotificationHub> notificationHub)
    {
        _orderRep = orderRep;
        _mapper = mapper;
        _logger = logger;
        _notificationHub = notificationHub;
    }
    
    // public async Task CreateOrder(CreateOrderRequest request)
    // {
    //     _logger.LogInformation("Создаем новый заказ: {@Request}", request);
    //     Client client = await _orderRep.ClientRep.GetClientByEmail(request.clientEmail);
    //     User user = await _orderRep.UserRep.FindByEmailAsync(request.userEmail);
    //     
    //     Order order = _mapper.Map<Order>(request);
    //     
    //     Tasks firstTask = new Tasks
    //     {
    //         Title = "First contact",
    //         Description = "Connect the client",
    //         DueDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day),
    //         OrderId = order.Id,
    //         Order = order,
    //     };
    //     
    //     order.Tasks.Add(firstTask);
    //     
    //     await _orderRep.OrderRep.AddAsync(order); 
    //     await _orderRep.SaveChangesAsync();
    //     
    //     await _orderRep.OrderRep.AddOrderToClientAndUser(client, order, user);
    //     await _orderRep.SaveChangesAsync();
    //     await _notificationHub.Clients.All.SendAsync("OrderCreated", new
    //     {
    //         order.Id,
    //         order.CreatedAt,
    //         order.TotalAmount,
    //         order.Status,
    //     });
    // }
    //
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
    //
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
    //
    // // public async Task<OrderResponse> FindOrder(FindOrderRequest request)
    // // {
    // //     _logger.LogInformation("Поиск клиента: {@Request}", request);
    // //     Order order = await _unitOfWork.OrderRep.GetOrderInclude(request.orderId);
    // //     return _mapper.Map<OrderResponse>(order);
    // // }
    //
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
    //
    // public async Task<GetAllOrdersResponse> GetAllOrders(SortOrdersRequest sortOrdersRequest)
    // {
    //     var orders = await _unitOfWork.OrderRep.GetLowInfoOrdersList(sortOrdersRequest);
    //     return new GetAllOrdersResponse()
    //     {
    //         Orders = _mapper.Map<List<OrderDTO>>(orders)
    //     };
    // }
    //
    // public async Task ChangeResponsible(int orderId, ChangeResponsibleRequest request)
    // {
    //     var order = await _unitOfWork.OrderRep.GetOrderWithClientAndTasks(orderId);
    //     var user = await _unitOfWork.UserRep.GetById(request.userId);
    //     var existingUser = order.UserOrders.FirstOrDefault();
    //     order.UserOrders.Remove(existingUser);
    //     order.UserOrders.Add(new UserOrders
    //     {
    //         OrderId = order.Id,
    //         UserId = user.Id,
    //         Order = order,
    //         User = user
    //     });
    //     
    //     _unitOfWork.OrderRep.Update(order);
    //     await _unitOfWork.SaveChangesAsync();
    //     await _notificationHub.Clients.All.SendAsync("ResponsibleUpdated", new
    //     {
    //         userId =  user.Id,
    //         orderId = order.Id,
    //     });
    // }
    public Task CreateOrder(CreateOrderRequest request)
    {
        throw new NotImplementedException();
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

    public Task ChangeResponsible(int orderId, ChangeResponsibleRequest request)
    {
        throw new NotImplementedException();
    }
}
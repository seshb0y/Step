using AutoMapper;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<OrderService> _logger;
    
    public OrderService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<OrderService> logger)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
    }
    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        _logger.LogInformation("Создаем новый заказ: {@Request}", request);
        Client client = await _unitOfWork.ClientRep.GetClientByEmail(request.clientEmail);
        
        Order order = _mapper.Map<Order>(request);
        await _unitOfWork.OrderRep.AddAsync(order); 
        await _unitOfWork.SaveChangesAsync();
        
        await _unitOfWork.OrderRep.AddOrderToClient(client, order);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task ChangeDataOrder(ChangeOrderDataRequest request)
    {
        _logger.LogInformation("Изменяем заказ: {@Request}", request);
        Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
        
        order = _mapper.Map(request, order);
        _unitOfWork.OrderRep.Update(order);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteOrder(DeleteOrderRequest request)
    {
        _logger.LogInformation("Удаляем заказ: {@Request}", request);
        Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
        
        if (order == null)
        {
            throw new KeyNotFoundException($"Client with id {request.orderId} not found");
        }
        
        _unitOfWork.OrderRep.Delete(order);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<OrderResponse> FindOrder(FindOrderRequest request)
    {
        _logger.LogInformation("Поиск клиента: {@Request}", request);
        Order order = await _unitOfWork.OrderRep.GetOrderInclude(request.orderId);
        return _mapper.Map<OrderResponse>(order);
    }
}
using AutoMapper;
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

    public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        Client client = await _unitOfWork.ClientRep.GetById(Guid.Parse(request.clientId));
        
        Order order = _mapper.Map<Order>(request);
        await _unitOfWork.OrderRep.AddAsync(order); 
        await _unitOfWork.OrderRep.SaveChangesAsync();
        
        await _unitOfWork.OrderRep.AddOrderToClient(client, order);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task ChangeDataOrder(ChangeOrderDataRequest request)
    {
        Order order = await _unitOfWork.OrderRep.GetById(Guid.Parse(request.orderId));
        
        order = _mapper.Map<Order>(request);
        _unitOfWork.OrderRep.Update(order);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteOrder(DeleteOrderRequest request)
    {
        Order order = await _unitOfWork.OrderRep.GetById(Guid.Parse(request.orderId));
        
        _unitOfWork.OrderRep.Delete(order);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<Order> FindOrder(FindOrderRequest request)
    {
        Order order = await _unitOfWork.OrderRep.GetById(Guid.Parse(request.orderId));
        return order;
    }
}
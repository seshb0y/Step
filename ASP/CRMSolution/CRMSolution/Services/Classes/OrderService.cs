using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class OrderService : IOrder
{
    IRepository<Order> _orderRepository;

    public OrderService(IRepository<Order> orderRepository)
    {
        _orderRepository = orderRepository;
    }
    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        Order order = new Order{TotalAmount = request.totalAmount};
        await _orderRepository.AddAsync(order);
    }

    public async Task ChangeDataOrder(ChangeOrderDataRequest request)
    {
        Order order = await _orderRepository.GetById(Guid.Parse(request.orderId));
        order.TotalAmount = request.totalAmount;
        _orderRepository.Update(order);
        await _orderRepository.SaveChangesAsync();
    }

    public async Task DeleteOrder(DeleteOrderRequest request)
    {
        Order order = await _orderRepository.GetById(Guid.Parse(request.orderId));
        _orderRepository.Delete(order);
        await _orderRepository.SaveChangesAsync();
    }

    public async Task<Order> FindOrder(FindOrderRequest request)
    {
        Order order = await _orderRepository.GetById(Guid.Parse(request.orderId));
        return order;
    }
}
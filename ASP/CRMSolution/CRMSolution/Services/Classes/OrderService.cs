using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class OrderService : IOrder
{
    IRepository<Order> _orderRepository;
    IRepository<Client> _clientRepository;
    IOrderRep _specialOrderRepository;

    public OrderService(IRepository<Order> orderRepository, IRepository<Client> clientRepository, IOrderRep specialOrderRepository)
    {
        _orderRepository = orderRepository;
        _clientRepository = clientRepository;
        _specialOrderRepository = specialOrderRepository;
    }
    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        Client client = await _clientRepository.GetById(Guid.Parse(request.clientId));
        Order order = new Order{TotalAmount = request.totalAmount, Client = client};
        await _orderRepository.AddAsync(order);
        await _specialOrderRepository.AddOrderToClient(client, order);
        await _orderRepository.SaveChangesAsync();
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
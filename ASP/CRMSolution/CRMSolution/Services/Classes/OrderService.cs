using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class OrderService : IOrderService
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<Client> _clientRepository;
    private readonly IOrderRep _specialOrderRepository;
    private readonly IMapper _mapper;

    public OrderService(IRepository<Order> orderRepository, IRepository<Client> clientRepository, IOrderRep specialOrderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _clientRepository = clientRepository;
        _specialOrderRepository = specialOrderRepository;
        _mapper = mapper;
    }
    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        Client client = await _clientRepository.GetById(Guid.Parse(request.clientId));
        Order order = _mapper.Map<Order>(request);
        await _orderRepository.AddAsync(order);
        await _specialOrderRepository.AddOrderToClient(client, order);
        await _orderRepository.SaveChangesAsync();
    }

    public async Task ChangeDataOrder(ChangeOrderDataRequest request)
    {
        Order order = await _orderRepository.GetById(Guid.Parse(request.orderId));
        order = _mapper.Map<Order>(request);
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
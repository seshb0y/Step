// Unit Tests for OrderService
using Xunit;
using Moq;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Order;
using CRMSolution.DTO.Requests.Orders;
using CRMSolution.Data.Models;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Repository;

public class OrderServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ILogger<OrderService>> _loggerMock;
    private readonly OrderService _orderService;

    public OrderServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _loggerMock = new Mock<ILogger<OrderService>>();

        _orderService = new OrderService(
            _unitOfWorkMock.Object,
            _mapperMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task CreateOrder_Should_Create_Order_And_Task()
    {
        var request = new CreateOrderRequest(1000, "client@mail.com", "user@mail.com");
        var client = new Client();
        var user = new User();
        Order capturedOrder = null;

        _unitOfWorkMock.Setup(x => x.ClientRep.GetClientByEmail(request.clientEmail)).ReturnsAsync(client);
        _unitOfWorkMock.Setup(x => x.UserRep.FindByEmailAsync(request.userEmail)).ReturnsAsync(user);

        _mapperMock
            .Setup(x => x.Map<Order>(It.Is<CreateOrderRequest>(r =>
                r.clientEmail == request.clientEmail &&
                r.userEmail == request.userEmail &&
                r.totalAmount == request.totalAmount
            )))
            .Returns(() =>
            {
                capturedOrder = new Order
                {
                    Tasks = new List<Tasks>(),
                    ClientOrders = new List<ClientOrder>(),
                    UserOrders = new List<UserOrders>()
                };
                return capturedOrder;
            });

        await _orderService.CreateOrder(request);

        Assert.NotNull(capturedOrder);
        Assert.NotNull(capturedOrder.Tasks);
        Assert.Single(capturedOrder.Tasks);
        Assert.Equal("First contact", capturedOrder.Tasks.First().Title);

        _unitOfWorkMock.Verify(x => x.OrderRep.AddAsync(capturedOrder), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Exactly(2));
        _unitOfWorkMock.Verify(x => x.OrderRep.AddOrderToClientAndUser(client, capturedOrder, user), Times.Once);
    }


    [Fact]
    public async Task ChangeDataOrder_Should_Update_Order()
    {
        var request = new ChangeOrderDataRequest(1500, OrderStatus.Processing, 1);
        var order = new Order();

        _unitOfWorkMock.Setup(x => x.OrderRep.GetById(request.orderId)).ReturnsAsync(order);
        _mapperMock.Setup(x => x.Map(request, order)).Returns(order);

        await _orderService.ChangeDataOrder(request);

        _unitOfWorkMock.Verify(x => x.OrderRep.Update(order), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteOrder_Should_Remove_Order()
    {
        var request = new DeleteOrderRequest(1);
        var order = new Order();

        _unitOfWorkMock.Setup(x => x.OrderRep.GetById(request.orderId)).ReturnsAsync(order);

        await _orderService.DeleteOrder(request);

        _unitOfWorkMock.Verify(x => x.OrderRep.Delete(order), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteOrder_Should_Throw_When_Not_Found()
    {
        var request = new DeleteOrderRequest(1);
        _unitOfWorkMock.Setup(x => x.OrderRep.GetById(request.orderId)).ReturnsAsync((Order)null);

        await Assert.ThrowsAsync<KeyNotFoundException>(() => _orderService.DeleteOrder(request));
    }

    [Fact]
    public async Task GetOrderDetailsAsync_Should_Return_Details()
    {
        var orderId = 1;
        var order = new Order { ClientOrders = new List<ClientOrder> { new ClientOrder { Client = new Client() } } };
        var details = new OrderDetailsResponse();

        _unitOfWorkMock.Setup(x => x.OrderRep.GetOrderWithClientAndTasks(orderId)).ReturnsAsync(order);
        _mapperMock.Setup(x => x.Map<OrderDetailsResponse>(order)).Returns(details);
        _mapperMock.Setup(x => x.Map<ClientResponse>(It.IsAny<Client>())).Returns(new ClientResponse());

        var result = await _orderService.GetOrderDetailsAsync(orderId);

        Assert.NotNull(result);
        _mapperMock.Verify(x => x.Map<OrderDetailsResponse>(order), Times.Once);
    }

    [Fact]
    public async Task GetAllOrders_Should_Return_Response()
    {
        var request = new SortOrdersRequest { sortBy = "TotalAmount" };
        var orders = new List<Order>();
        var orderDtos = new List<OrderDTO>();

        _unitOfWorkMock.Setup(x => x.OrderRep.GetLowInfoOrdersList(request)).ReturnsAsync(orderDtos);
        _mapperMock.Setup(x => x.Map<List<OrderDTO>>(orders)).Returns(orderDtos);

        var result = await _orderService.GetAllOrders(request);

        Assert.Equal(orderDtos, result.Orders);
    }

    [Fact]
    public async Task ChangeResponsible_Should_Change_User()
    {
        var request = new ChangeResponsibleRequest(1);
        var order = new Order { Id = 10, UserOrders = new List<UserOrders> { new UserOrders() } };
        var user = new User { Id = 1 };

        _unitOfWorkMock.Setup(x => x.OrderRep.GetOrderWithClientAndTasks(order.Id)).ReturnsAsync(order);
        _unitOfWorkMock.Setup(x => x.UserRep.GetById(request.userId)).ReturnsAsync(user);

        await _orderService.ChangeResponsible(order.Id, request);

        Assert.Single(order.UserOrders);
        Assert.Equal(user.Id, order.UserOrders.First().UserId);
        _unitOfWorkMock.Verify(x => x.OrderRep.Update(order), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }
}

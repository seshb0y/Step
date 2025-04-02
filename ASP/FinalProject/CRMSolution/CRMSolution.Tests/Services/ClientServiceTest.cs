// Unit Tests for ClientService
using Xunit;
using Moq;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Data.Models;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Repository;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Http;

public class ClientServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ILogger<ClientService>> _loggerMock;
    private readonly Mock<ITokenService> _tokenServiceMock;
    private readonly ClientService _clientService;

    public ClientServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _loggerMock = new Mock<ILogger<ClientService>>();
        _tokenServiceMock = new Mock<ITokenService>();

        _clientService = new ClientService(
            _unitOfWorkMock.Object,
            _mapperMock.Object,
            _loggerMock.Object,
            _tokenServiceMock.Object);
    }

    [Fact]
    public async Task CreateClient_Should_Add_And_Return_Client()
    {
        var request = new CreateClientRequest("John", "john@mail.com", "123456", "Some St.");
        var client = new Client { Name = request.name, Email = request.email, Address = request.address, Phone =  "123456" };

        _mapperMock.Setup(m => m.Map<Client>(request)).Returns(client);
        _unitOfWorkMock.Setup(u => u.ClientRep.AddAsync(client)).Returns(Task.CompletedTask);
        _unitOfWorkMock.Setup(u => u.SaveChangesAsync()).ReturnsAsync(1);
        _unitOfWorkMock.Setup(u => u.ClientRep.GetClientByName("John")).ReturnsAsync(client);

        var result = await _clientService.CreateClient(request);

        Assert.Equal(client, result);
    }

    [Fact]
    public async Task ChangeDataClient_Should_Update_And_Return_Client()
    {
        var request = new ChangeDataClientRequest("NewName", "new@mail.com", "123", "Addr", "old@mail.com");
        var client = new Client { Email = "old@mail.com" };

        _unitOfWorkMock.Setup(u => u.ClientRep.GetClientByEmail("old@mail.com")).ReturnsAsync(client);
        _mapperMock.Setup(m => m.Map(request, client)).Returns(client);
        _unitOfWorkMock.Setup(u => u.SaveChangesAsync()).ReturnsAsync(1);
        _unitOfWorkMock.Setup(u => u.ClientRep.GetClientByEmail("new@mail.com")).ReturnsAsync(client);

        var result = await _clientService.ChangeDataClient(request);

        Assert.Equal(client, result);
    }

    [Fact]
    public async Task DeleteClient_Should_Remove_Client()
    {
        var request = new DeleteClientRequest("delete@mail.com");
        var client = new Client { Email = "delete@mail.com" };

        _unitOfWorkMock.Setup(u => u.ClientRep.GetClientByEmail("delete@mail.com")).ReturnsAsync(client);
        _unitOfWorkMock.Setup(u => u.SaveChangesAsync()).ReturnsAsync(1);

        await _clientService.DeleteClient(request);

        _unitOfWorkMock.Verify(u => u.ClientRep.Delete(client), Times.Once);
    }

    [Fact]
    public async Task FindClient_Should_Return_Client_Response()
    {
        var request = new FindClientRequest("client@mail.com");
        var response = new FindClientResponse();

        _unitOfWorkMock.Setup(u => u.ClientRep.GetClientsOrdersAndUsersAsync("client@mail.com")).ReturnsAsync(response);

        var result = await _clientService.FindClient(request);

        Assert.Equal(response, result);
    }

    [Fact]
    public async Task GetAllClients_Should_Return_Response()
    {
        var request = new SortClientsRequest { sortBy = "Name", Descending = false };
        var clients = new List<Client>();

        _unitOfWorkMock.Setup(u => u.ClientRep.GetLowInfoClientsList(request)).ReturnsAsync(clients);
        _mapperMock.Setup(m => m.Map<List<Client>>(clients)).Returns(clients);

        var result = await _clientService.GetAllClients(request);

        Assert.Equal(clients, result.Clients);
    }

    [Fact]
    public async Task GetClientsWithOrdersAndTasks_Should_Return_Mapped_Clients()
    {
        var context = new DefaultHttpContext();
        var username = "user";
        var orders = new List<Order> { new Order { Id = 1, Tasks = new List<Tasks>() } };
        var clients = new List<Client>();
        var mappedClients = new List<ClientWithOrdersAndTasksResponse>();

        _tokenServiceMock.Setup(t => t.GetNameFromCookies(context)).ReturnsAsync(username);
        _unitOfWorkMock.Setup(u => u.ClientRep.GetOrdersByUsername(username)).ReturnsAsync(orders);
        _unitOfWorkMock.Setup(u => u.ClientRep.GetClientsByOrdersAsync(It.IsAny<List<Order>>())).ReturnsAsync(clients);
        _mapperMock.Setup(m => m.Map<List<ClientWithOrdersAndTasksResponse>>(clients)).Returns(mappedClients);

        var result = await _clientService.GetClientsWithOrdersAndTasks(context);

        Assert.Equal(mappedClients, result);
    }
}

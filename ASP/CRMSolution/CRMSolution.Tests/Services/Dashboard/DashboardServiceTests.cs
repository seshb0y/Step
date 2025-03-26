using Xunit;
using Moq;
using AutoMapper;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO;
using CRMSolution.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;
using CRMSolution.Data.Repository;

public class DashboardServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly DashboardService _dashboardService;

    public DashboardServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _dashboardService = new DashboardService(
            _unitOfWorkMock.Object,
            _mapperMock.Object);
    }

    [Fact]
    public async Task GetDashboard_Should_Return_Correct_Statistics()
    {
        // Arrange
        var clients = new List<Client> { new Client(), new Client(), new Client() };
        var orders = new List<Order>
        {
            new Order { TotalAmount = 100, CreatedAt = DateTime.UtcNow.AddDays(-3) },
            new Order { TotalAmount = 200, CreatedAt = DateTime.UtcNow.AddDays(-2) },
            new Order { TotalAmount = 300, CreatedAt = DateTime.UtcNow.AddDays(-1) }
        };
        var tasks = new List<Tasks>
        {
            new Tasks { Status = TasksStatus.InProgress },
            new Tasks { Status = TasksStatus.Completed }
        };
        var users = new List<User> { new User(), new User() };

        _unitOfWorkMock.Setup(x => x.ClientRep.GetAllAsync()).ReturnsAsync(clients);
        _unitOfWorkMock.Setup(x => x.OrderRep.GetAllAsync()).ReturnsAsync(orders);
        _unitOfWorkMock.Setup(x => x.TasksRep.GetAllAsync()).ReturnsAsync(tasks);
        _unitOfWorkMock.Setup(x => x.UserRep.GetAllAsync()).ReturnsAsync(users);

        // Act
        var result = await _dashboardService.GetDashboard();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(3, result.ClientsAmount);
        Assert.Equal(3, result.OrdersCount);
        Assert.Equal(2, result.TasksCount);
        Assert.Equal(600, result.OrdersTotalAmount);
        Assert.Equal(orders.Select(o => o.CreatedAt), result.OrdersCreatedDates);
        Assert.Equal(tasks.Select(t => t.Status), result.TasksStatuses);
    }
} 
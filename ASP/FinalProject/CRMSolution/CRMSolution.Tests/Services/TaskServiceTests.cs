using Xunit;
using Moq;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using CRMSolution.Data.Models;
using ControllerFirst.DTO.Responses;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.TasksRep;
using CRMSolution.Hubs;
using Microsoft.AspNetCore.SignalR;

public class TasksServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ILogger<TasksService>> _loggerMock;
    private readonly TasksService _tasksService;
    private readonly Mock<IHubContext<NotificationHub>> _hubContextMock;


    public TasksServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _loggerMock = new Mock<ILogger<TasksService>>();
        _hubContextMock = new Mock<IHubContext<NotificationHub>>();


        _tasksService = new TasksService(
            _unitOfWorkMock.Object,
            _mapperMock.Object,
            _loggerMock.Object,
            _hubContextMock.Object);
    }

    [Fact]
    public async Task CreateTaskAsync_Should_Create_Task()
    {
        var request = new CreateTaskRequest("Test Task", "Description", DateTime.UtcNow, "testuser", 1);
        var order = new Order();
        var user = new User();
        var task = new Tasks();

        var tasksRepMock = new Mock<ITasksRep>();
        _unitOfWorkMock.Setup(x => x.TasksRep).Returns(tasksRepMock.Object);

        _unitOfWorkMock.Setup(x => x.OrderRep.GetById(request.orderId)).ReturnsAsync(order);
        _unitOfWorkMock.Setup(x => x.UserRep.FindByNameAsync(request.userName)).ReturnsAsync(user);
        _mapperMock.Setup(x => x.Map<Tasks>(request)).Returns(task);

        var mockClients = new Mock<IHubClients>();
        var mockClientProxy = new Mock<IClientProxy>();

        mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
        mockClientProxy
            .Setup(proxy => proxy.SendCoreAsync(
                It.IsAny<string>(),
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _hubContextMock.Setup(h => h.Clients).Returns(mockClients.Object);
        
        await _tasksService.CreateTaskAsync(request);

        tasksRepMock.Verify(x => x.AddDependency(order, user, task), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateTaskAsync_Should_Update_Task()
    {
        var request = new UpdateTaskRequest("Completed", "Updated description", 1);
        var task = new Tasks();

        _unitOfWorkMock.Setup(x => x.TasksRep.GetById(request.taskId)).ReturnsAsync(task);
        _mapperMock.Setup(x => x.Map(request, task)).Returns(task);

        var mockClients = new Mock<IHubClients>();
        var mockClientProxy = new Mock<IClientProxy>();

        mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
        mockClientProxy
            .Setup(proxy => proxy.SendCoreAsync(
                It.IsAny<string>(),
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _hubContextMock.Setup(h => h.Clients).Returns(mockClients.Object);
        
        await _tasksService.UpdateTaskAsync(request);

        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteTaskAsync_Should_Delete_Task()
    {
        var request = new DeleteTaskRequest(1);
        var task = new Tasks();

        _unitOfWorkMock.Setup(x => x.TasksRep.GetById(request.taskId)).ReturnsAsync(task);

        var mockClients = new Mock<IHubClients>();
        var mockClientProxy = new Mock<IClientProxy>();

        mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
        mockClientProxy
            .Setup(proxy => proxy.SendCoreAsync(
                It.IsAny<string>(),
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _hubContextMock.Setup(h => h.Clients).Returns(mockClients.Object);
        
        await _tasksService.DeleteTaskAsync(request);

        _unitOfWorkMock.Verify(x => x.TasksRep.Delete(task), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task FindTaskByIdAsync_Should_Return_Task()
    {
        var request = new FindTaskRequest(1);
        var task = new Tasks();
        var taskResponse = new TaskResponse();

        _unitOfWorkMock.Setup(x => x.TasksRep.GetById(request.taskId)).ReturnsAsync(task);
        _mapperMock.Setup(x => x.Map<TaskResponse>(task)).Returns(taskResponse);

        var result = await _tasksService.FindTaskByIdAsync(request);

        Assert.NotNull(result);
        _mapperMock.Verify(x => x.Map<TaskResponse>(task), Times.Once);
    }

    [Fact]
    public async Task GetAllTasks_Should_Return_Tasks()
    {
        var request = new SortTasksRequest { sortBy = "DueDate", Descending = true };
        var tasks = new List<Tasks>();
        var mappedTasks = new List<TaskDto>();

        _unitOfWorkMock.Setup(x => x.TasksRep.GetLowInfoTasksList(request)).ReturnsAsync(mappedTasks);
        _mapperMock.Setup(x => x.Map<List<TaskDto>>(tasks)).Returns(mappedTasks);

        var result = await _tasksService.GetAllTasks(request);

        Assert.NotNull(result);
        Assert.Equal(mappedTasks, result.Tasks);
    }
}
using AutoMapper;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace CRMSolution.Services.Classes;

public class TasksService : ITasksService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<TasksService> _logger;
    private readonly IHubContext<NotificationHub>  _hubContext;

    public TasksService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<TasksService> logger,  IHubContext<NotificationHub> hubContext)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
        _hubContext = hubContext;
    }
    
    public async Task CreateTaskAsync(CreateTaskRequest request)
    {
        _logger.LogInformation("Создаем новую задачу: {@Request}", request);
        
        Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
        
        User user = await _unitOfWork.UserRep.FindByNameAsync(request.userName);
        
        Tasks task = _mapper.Map<Tasks>(request);
        Console.Write(order);
        Console.WriteLine(task);
        Console.WriteLine(user);
        await _unitOfWork.TasksRep.AddDependency(order, user, task);
        await _unitOfWork.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("TaskCreated", new
        {
            task.Id,
            task.Title,
            task.Description,
            task.Status,
            task.DueDate,
            orderId = order.Id
        });
    }

    public async Task UpdateTaskAsync(UpdateTaskRequest request)
    {
        _logger.LogInformation("Обновляем задачу: {@Request}", request);
        Tasks task = await _unitOfWork.TasksRep.GetById(request.taskId);
        task = _mapper.Map(request, task);
        await _unitOfWork.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("TaskUpdated", new
        {
            task.Id,
            task.Title,
            task.Description,
            task.Status,
            task.DueDate
        });
    }

    public async Task DeleteTaskAsync(DeleteTaskRequest request)
    {
        _logger.LogInformation("Удаляем задачу: {@Request}", request);
        Tasks task = await _unitOfWork.TasksRep.GetById(request.taskId);
        _unitOfWork.TasksRep.Delete(task);
        await _unitOfWork.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("TaskDeleted", new
        {
            task.Id,
        });
    }

    public async Task<TaskResponse> FindTaskByIdAsync(FindTaskRequest request)
    {
        _logger.LogInformation("Находим задачу: {@Request}", request);
        Tasks task = await _unitOfWork.TasksRep.GetById(request.taskId);
        return _mapper.Map<TaskResponse>(task);
    }
    
    public async Task<GetAllTasksResponse> GetAllTasks(SortTasksRequest sortTasksRequest)
    {
        var tasks = await _unitOfWork.TasksRep.GetLowInfoTasksList(sortTasksRequest);
        return new GetAllTasksResponse()
        {
            Tasks = _mapper.Map<List<TaskDto>>(tasks)
        };
    }
}
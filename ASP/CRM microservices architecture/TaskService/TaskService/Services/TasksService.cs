using AutoMapper;
using CRMSolution.Grpc.Tasks;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.SignalR;
using TaskService.Data.Models;
using TaskService.Data.Repository.TasksRep;
using TaskService.DTO.Requests.Task;
using TaskService.DTO.Responses;
using TaskService.Hubs;
using TaskService.Services.Interfaces;

namespace TaskService.Services.Classes;

public class TasksService : ITasksService
{
    private readonly ITasksRep _tasksRep;
    private readonly IMapper _mapper;
    private readonly ILogger<TasksService> _logger;
    private readonly IHubContext<NotificationHub>  _hubContext;

    public TasksService(ITasksRep tasksRep, IMapper mapper, ILogger<TasksService> logger,  IHubContext<NotificationHub> hubContext)
    {
        _tasksRep = tasksRep;
        _mapper = mapper;
        _logger = logger;
        _hubContext = hubContext;
    }
    
    // public async Task CreateTaskAsync(CreateTaskRequest request)
    // {
    //     _logger.LogInformation("Создаем новую задачу: {@Request}", request);
    //     
    //     Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
    //     
    //     User user = await _unitOfWork.UserRep.FindByNameAsync(request.userName);
    //     
    //     Tasks task = _mapper.Map<Tasks>(request);
    //     Console.Write(order);
    //     Console.WriteLine(task);
    //     Console.WriteLine(user);
    //     await _unitOfWork.TasksRep.AddDependency(order, user, task);
    //     await _unitOfWork.SaveChangesAsync();
    //     await _hubContext.Clients.All.SendAsync("TaskCreated", new
    //     {
    //         task.Id,
    //         task.Title,
    //         task.Description,
    //         task.Status,
    //         task.DueDate,
    //         orderId = order.Id
    //     });
    // }
    //
    // public async Task UpdateTaskAsync(UpdateTaskRequest request)
    // {
    //     _logger.LogInformation("Обновляем задачу: {@Request}", request);
    //     Tasks task = await _unitOfWork.TasksRep.GetById(request.taskId);
    //     task = _mapper.Map(request, task);
    //     await _unitOfWork.SaveChangesAsync();
    //     await _hubContext.Clients.All.SendAsync("TaskUpdated", new
    //     {
    //         task.Id,
    //         task.Title,
    //         task.Description,
    //         task.Status,
    //         task.DueDate
    //     });
    // }
    //
    // public async Task DeleteTaskAsync(DeleteTaskRequest request)
    // {
    //     _logger.LogInformation("Удаляем задачу: {@Request}", request);
    //     Tasks task = await _unitOfWork.TasksRep.GetById(request.taskId);
    //     _unitOfWork.TasksRep.Delete(task);
    //     await _unitOfWork.SaveChangesAsync();
    //     await _hubContext.Clients.All.SendAsync("TaskDeleted", new
    //     {
    //         task.Id,
    //     });
    // }
    //
    // public async Task<TaskResponse> FindTaskByIdAsync(FindTaskRequest request)
    // {
    //     _logger.LogInformation("Находим задачу: {@Request}", request);
    //     Tasks task = await _unitOfWork.TasksRep.GetById(request.taskId);
    //     return _mapper.Map<TaskResponse>(task);
    // }
    //
    // public async Task<GetAllTasksResponse> GetAllTasks(SortTasksRequest sortTasksRequest)
    // {
    //     var tasks = await _tasksRep.TasksRep.GetLowInfoTasksList(sortTasksRequest);
    //     return new GetAllTasksResponse()
    //     {
    //         Tasks = _mapper.Map<List<TaskDto>>(tasks)
    //     };
    // }
    public Task CreateTaskAsync(int orderId, string description, DateTime dueDate, string title)
    {
        TaskEntity task = new TaskEntity
        {
            Title = title,
            Description = description,
            DueDate = dueDate,
            OrderId = orderId
        };
        _tasksRep.AddAsync(task);
        _tasksRep.SaveChangesAsync();
        return Task.CompletedTask;
    }

    public Task UpdateTaskAsync(UpdateTaskRequest request)
    {
        throw new NotImplementedException();
    }

    public Task DeleteTaskAsync(DeleteTaskRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<TaskResponse> FindTaskByIdAsync(FindTaskRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<GetAllTasksResponse> GetAllTasks(SortTasksRequest sortTasksRequest)
    {
        throw new NotImplementedException();
    }
    
    public async Task<TaskEntity> GetByIdAsync(int id)
    {
        return await _tasksRep.GetById(id);
    }

    public async Task<GetTaskByOrderIdResponse> GetTasksByOrderIdAsync(int orderId)
    {
        var tasks = await _tasksRep.GetTasksByOrderId(orderId);

        var response = new GetTaskByOrderIdResponse();
        response.Tasks.AddRange(tasks.Select(t => new GetTaskByIdResponse
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Status = (int)t.Status,
            DueDate = Timestamp.FromDateTime(t.DueDate),
            OrderId = t.OrderId
        }));

        return response;
    }

}
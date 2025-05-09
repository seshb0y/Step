using Grpc.Core;
using CRMSolution.Grpc.Tasks;
using TaskService.Data.Models; // <-- Правильный namespace
using TaskService.Services.Interfaces;

namespace TaskService.GrpcServices;

public class TaskGrpcService : CRMSolution.Grpc.Tasks.TaskGrpcService.TaskGrpcServiceBase
{
    private readonly ITasksService _tasksService;

    public TaskGrpcService(ITasksService tasksService)
    {
        _tasksService = tasksService;
    }

    public override async Task<GetTasksByUserIdsResponse> GetTasksByUserIds(GetTasksByUserIdsRequest request,
        ServerCallContext context)
    {
        return await _tasksService.GetTasksByUserIdsAsync(request);
    }
    public override async Task<GetTaskByIdResponse> GetTaskById(GetTaskByIdRequest request, ServerCallContext context)
    {
        var task = await _tasksService.GetByIdAsync(request.Id);

        return new GetTaskByIdResponse
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = (int)task.Status
        };
    }
    
    public override async Task<DefaultTaskResponse> CreateTask(CreateTaskRequest request, ServerCallContext context)
    {
        await _tasksService.CreateTaskAsync(request.OrderId, request.Description, request.DueDate.ToDateTime(), request.Title);
        
        return new DefaultTaskResponse
        {
            Success = true,
            Message = "Task created"
        };
    }

    public override async Task<GetTaskByOrderIdResponse> GetTaskByOrderId(GetTaskByIdRequest request,
        ServerCallContext context)
    {
        return await _tasksService.GetTasksByOrderIdAsync(request.Id);
    }

    public override async Task<DefaultTaskResponse> UpdateTask(UpdateTaskRequest request,
        ServerCallContext context)
    {
        await _tasksService.UpdateTaskAsync(request);
        return new DefaultTaskResponse
        {
            Success = true,
            Message = "Task updated"
        };
    }
    
    public override async Task<DefaultTaskResponse> DeleteTask(DeleteTaskRequest DeleteTaskRequest,
        ServerCallContext context)
    {
        await _tasksService.DeleteTaskAsync(DeleteTaskRequest);
        return new DefaultTaskResponse
        {
            Success = true,
            Message = "Task deleted"
        };
    }
    
    public override async Task<GetAllTasksResponse> GetAllTasks(GetAllTasksRequest getAllTasksRequest,
        ServerCallContext context)
    {
        return await _tasksService.GetAllTasks(getAllTasksRequest.Sort);
    }
}
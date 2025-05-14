using AutoMapper;
using CRMSolution.Data.Validators.Tasks;
using Grpc.Core;
using CRMSolution.Grpc.Tasks;
using TaskService.Data.Models;
using TaskService.Data.Repository.TasksRep; // <-- Правильный namespace
using TaskService.Services.Interfaces;

namespace TaskService.GrpcServices;

public class TaskGrpcService : CRMSolution.Grpc.Tasks.TaskGrpcService.TaskGrpcServiceBase
{
    private readonly ITasksService _tasksService;
    private readonly ITasksRep _tasksRep;

    public TaskGrpcService(ITasksService tasksService, ITasksRep tasksRep)
    {
        _tasksService = tasksService;
        _tasksRep = tasksRep;
    }

    public override async Task<GetTasksByUserIdsResponse> GetTasksByUserIds(GetTasksByUserIdsRequest request,
        ServerCallContext context)
    {
        return await _tasksService.GetTasksByUserIdsAsync(request);
    }

    public override async Task<GetTasksByOrderIdsResponse> GetTasksByOrderIds(GetTasksByOrderIdsRequest request,
        ServerCallContext context)
    {
        return await _tasksService.GetTasksByOrderIdsAsync(request);
    }
    public override async Task<GetTaskByIdResponse> GetTaskById(GetTaskByIdRequest request, ServerCallContext context)
    {
        var validator = new FindTaskValidator(_tasksRep);
        var result = validator.Validate(request);

        if (!result.IsValid)
        {
            var errorMessages = string.Join(" | ", result.Errors.Select(e => e.ErrorMessage));
            throw new RpcException(new Status(StatusCode.InvalidArgument, errorMessages));
        }
        var task = await _tasksService.GetByIdAsync(request.Id);

        return new GetTaskByIdResponse
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = (int)task.Status
        };
    }
    
    public override async Task<CreateTaskResponse> CreateTask(CreateTaskRequest request, ServerCallContext context)
    {
        var validator = new CreateTaskValidator();
        var result = validator.Validate(request);

        if (!result.IsValid)
        {
            var errorMessages = string.Join(" | ", result.Errors.Select(e => e.ErrorMessage));
            throw new RpcException(new Status(StatusCode.InvalidArgument, errorMessages));
        }
        return await _tasksService.CreateTaskAsync(request.OrderId, request.Description, request.DueDate.ToDateTime(), request.Title);
    }

    public override async Task<GetTaskByOrderIdResponse> GetTaskByOrderId(GetTaskByIdRequest request,
        ServerCallContext context)
    {
        return await _tasksService.GetTasksByOrderIdAsync(request.Id);
    }

    public override async Task<TaskInfo> UpdateTask(UpdateTaskRequest request,
        ServerCallContext context)
    {
        var validator = new UpdateTaskValidator(_tasksRep);
        var result = await validator.ValidateAsync(request);

        if (!result.IsValid)
        {
            var errorMessages = string.Join(" | ", result.Errors.Select(e => e.ErrorMessage));
            throw new RpcException(new Status(StatusCode.InvalidArgument, errorMessages));
        }
        return await _tasksService.UpdateTaskAsync(request);
    }
    
    public override async Task<DeleteTaskResponse> DeleteTask(DeleteTaskRequest DeleteTaskRequest,
        ServerCallContext context)
    {
        var validator = new DeleteTaskValidator(_tasksRep);
        var result = validator.Validate(DeleteTaskRequest);

        if (!result.IsValid)
        {
            var errorMessages = string.Join(" | ", result.Errors.Select(e => e.ErrorMessage));
            throw new RpcException(new Status(StatusCode.InvalidArgument, errorMessages));
        }
        return await _tasksService.DeleteTaskAsync(DeleteTaskRequest);
    }
    
    public override async Task<GetAllTasksResponse> GetAllTasks(GetAllTasksRequest getAllTasksRequest,
        ServerCallContext context)
    {
        return await _tasksService.GetAllTasks(getAllTasksRequest.Sort);
    }
}
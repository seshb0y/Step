using Grpc.Core;
using CRMSolution.Grpc.Tasks; // <-- Правильный namespace
using TaskService.Services.Interfaces;

namespace TaskService.GrpcServices;

public class TaskGrpcService : CRMSolution.Grpc.Tasks.TaskGrpcService.TaskGrpcServiceBase
{
    private readonly ITasksService _tasksService;

    public TaskGrpcService(ITasksService tasksService)
    {
        _tasksService = tasksService;
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
}
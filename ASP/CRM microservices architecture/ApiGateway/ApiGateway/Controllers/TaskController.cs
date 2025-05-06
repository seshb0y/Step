using ApiGateway.DTO.Requests.Task;
using AutoMapper;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Task;
using CRMSolution.Grpc.Tasks;
using CRMSolution.Services.Interfaces;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DeleteTaskRequest = CRMSolution.Grpc.Tasks.DeleteTaskRequest;
using SortTasksRequest = CRMSolution.Grpc.Tasks.SortTasksRequest;
using UpdateTaskRequest = CRMSolution.Grpc.Tasks.UpdateTaskRequest;

namespace ApiGateway.Controllers;

[ApiController]
[Route("api/v1/tasks/")]
public class TaskController : ControllerBase
{
    private readonly TaskGrpcService.TaskGrpcServiceClient _tasksService;
    private readonly IMapper _mapper;

    public TaskController(TaskGrpcService.TaskGrpcServiceClient tasksService, IMapper mapper)
    {
        _tasksService = tasksService;
        _mapper = mapper;
    }


    [HttpPost]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddTask([FromBody] HttpCreateTaskRequest request)
    {
        var grpcRequest = new CreateTaskRequest
        {
            Title = request.title,
            Description = request.description,
            DueDate = Timestamp.FromDateTime(request.endDate.ToUniversalTime()),
            OrderId = request.orderId,
        };
        var grpcResponse = await _tasksService.CreateTaskAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpPut]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeTask([FromBody] HttpUpdateTaskRequest request)
    {
        var grpcRequest = new UpdateTaskRequest
        {
            Description = request.description,
            Status = request.status,
            TaskId = request.taskId,
        };
        var grpcResponse = await _tasksService.UpdateTaskAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpDelete]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteTask([FromBody] HttpDeleteTaskRequest request)
    {
        var grpcRequest = new DeleteTaskRequest
        {
            Id = request.taskId
        };
        var grpcResponse = await _tasksService.DeleteTaskAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpGet("search")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindTask([FromQuery] HttpFindTaskRequest request)
    {
        var grpcRequest = new GetTaskByIdRequest
        {
            Id = request.taskId
        };
        var grpcResponse = await _tasksService.GetTaskByIdAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllTasks([FromQuery] HttpSortTasksRequest sortTasksRequest)
    {
        var grpcRequest = new GetAllTasksRequest
        {
            Sort = new SortTasksRequest
            {
                Descending = sortTasksRequest.Descending,
                SortBy = sortTasksRequest.sortBy
            }
        };
        
        var grpcResponse = await _tasksService.GetAllTasksAsync(grpcRequest);
        return Ok(grpcResponse);
    }
}
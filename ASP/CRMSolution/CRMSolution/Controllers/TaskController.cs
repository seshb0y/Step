using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Task;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/")]
public class TaskController : ControllerBase
{
    private readonly ITasksService _tasksService;

    public TaskController(ITasksService tasksService)
    {
        _tasksService = tasksService;
    }


    [HttpPost("add")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddTask([FromBody] CreateTaskRequest request)
    {
        await _tasksService.CreateTaskAsync(request);
        return Ok("Task created");
    }
    
    [HttpPut("change")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeTask([FromBody] UpdateTaskRequest request)
    {
        await _tasksService.UpdateTaskAsync(request);
        return Ok("Task updated");
    }
    
    [HttpDelete("delete")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteTask([FromBody] DeleteTaskRequest request)
    {
        await _tasksService.DeleteTaskAsync(request);
        return Ok("Task deleted");
    }
    
    [HttpGet("find")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindTask([FromQuery] FindTaskRequest request)
    {
        return Ok(await _tasksService.FindTaskByIdAsync(request));
    }
    
    [HttpGet("all/sorted")]
    public async Task<IActionResult> GetAllTasks([FromQuery] SortTasksRequest sortTasksRequest)
    {
        var orders = await _tasksService.GetAllTasks(sortTasksRequest);
        return Ok(orders);
    }
}
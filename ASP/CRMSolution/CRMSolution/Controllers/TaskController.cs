using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Task;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class TaskController : ControllerBase
{
    private readonly ITasksService _tasksService;

    public TaskController(ITasksService tasksService)
    {
        _tasksService = tasksService;
    }


    [HttpPost("AddTask")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddTask([FromBody] CreateTaskRequest request)
    {
        throw new Exception();
    }
    
    [HttpPost("ChangeTask")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeTask([FromBody] UpdateTaskRequest request)
    {
        throw new Exception();
    }
    
    [HttpPost("DeleteTask")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteTask([FromBody] DeleteTaskRequest request)
    {
        throw new Exception();
    }
    
    [HttpGet("FindTask")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindTask([FromQuery] FindTaskRequest request)
    {
        throw new Exception();
    }
}
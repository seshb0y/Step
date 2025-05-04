// using CRMSolution.DTO.Requests;
// using CRMSolution.DTO.Requests.Task;
// using CRMSolution.Services.Interfaces;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
//
// namespace ApiGateway.Controllers;
//
// [ApiController]
// [Route("api/v1/tasks/")]
// public class TaskController : ControllerBase
// {
//     private readonly ITasksService _tasksService;
//
//     public TaskController(ITasksService tasksService)
//     {
//         _tasksService = tasksService;
//     }
//
//
//     [HttpPost]
//     // [Authorize(Policy = "ManagerPolicy")]
//     public async Task<IActionResult> AddTask([FromBody] CreateTaskRequest request)
//     {
//         await _tasksService.CreateTaskAsync(request);
//         return Ok("Task created");
//     }
//     
//     [HttpPut]
//     // [Authorize(Policy = "ManagerPolicy")]
//     public async Task<IActionResult> ChangeTask([FromBody] UpdateTaskRequest request)
//     {
//         await _tasksService.UpdateTaskAsync(request);
//         return Ok("Task updated");
//     }
//     
//     [HttpDelete]
//     // [Authorize(Policy = "ManagerPolicy")]
//     public async Task<IActionResult> DeleteTask([FromBody] DeleteTaskRequest request)
//     {
//         await _tasksService.DeleteTaskAsync(request);
//         return Ok("Task deleted");
//     }
//     
//     [HttpGet("search")]
//     // [Authorize(Policy = "ManagerPolicy")]
//     public async Task<IActionResult> FindTask([FromQuery] FindTaskRequest request)
//     {
//         return Ok(await _tasksService.FindTaskByIdAsync(request));
//     }
//     
//     [HttpGet]
//     public async Task<IActionResult> GetAllTasks([FromQuery] SortTasksRequest sortTasksRequest)
//     {
//         var orders = await _tasksService.GetAllTasks(sortTasksRequest);
//         return Ok(orders);
//     }
// }
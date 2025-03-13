using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }


    // [HttpPost("add")]
    // // [Authorize(Policy = "ManagerPolicy")]
    // public async Task<IActionResult> AddUser([FromBody] CreateUserRequest request)
    // {
    //     
    //     return Ok(await _userService.CreateUser(request));
    // }
    
    [HttpPut("change")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeUser([FromBody] ChangeUserDataRequest request, 
        [FromServices] IValidator<ChangeUserDataRequest> validator)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        
        return Ok(await _userService.ChangeUserData(request));
    }
    
    [HttpDelete("delete")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest request)
    {
        await _userService.DeleteUser(request);
        return Ok("User deleted");
    }
    
    [HttpGet("load/data")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> LoadUserData([FromQuery] FindUserRequest request)
    {
        return Ok(await _userService.FindUser(request));
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers([FromQuery] SortUsersRequest sortUsersRequest)
    {
        var users = await _userService.GetAllUsers(sortUsersRequest);
        return Ok(users);
    }
    //
    // [HttpGet("Get/Clients/With/Orders/And/Tasks")]
    // public async Task<IActionResult> GetClientsWithOrdersAndTasks()
    // {
    //     var clients = await _clientService.GetClientsWithOrdersAndTasks(HttpContext);
    //     return Ok(clients);
    // }



}
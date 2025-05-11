using ApiGateway.DTO.Requests;
using CRMSolution.DTO.Requests;
using CRMSolution.Grpc.Users;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    private readonly UserService.UserServiceClient _userService;

    public UserController(UserService.UserServiceClient userService)
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
    
    [HttpPut]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeUser([FromBody] HttpChangeUserDataRequest request)
    {
        // var validationResult = await validator.ValidateAsync(request);
        // if (!validationResult.IsValid)
        // {
        //     return BadRequest(validationResult.Errors);
        // }
        var grpcRequest = new ChangeUserDataRequest
        {
            NewEmail = request.newEmail,
            OldEmail = request.oldEmail,
            Role = request.role,
            Username = request.username,
        };
        var grpcResponse = await _userService.ChangeUserDataAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpDelete]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteUser([FromBody] HttpDeleteUserRequest request)
    {
        var grpcRequest = new DeleteUserRequest
        {
            Email = request.email,
        };
        var grpcResponse = await _userService.DeleteUserAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpGet("search")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> LoadUserData([FromQuery] HttpFindUserRequest request)
    {
        var grpcRequest = new GetUserByEmailRequest
        {
            Email = request.email,
        };
        var grpcResponse = await _userService.FindUserAsync(grpcRequest);
        return Ok(grpcResponse);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers([FromQuery] SortUsersRequest sortUsersRequest)
    {
        var grpcRequest = new GetAllUsersRequest
        {
            Sort = new SortUsersRequest(sortUsersRequest)
        };
        var grpcResponse = await _userService.GetAllUsersAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    //
    // [HttpGet("Get/Clients/With/Orders/And/Tasks")]
    // public async Task<IActionResult> GetClientsWithOrdersAndTasks()
    // {
    //     var clients = await _clientService.GetClientsWithOrdersAndTasks(HttpContext);
    //     return Ok(clients);
    // }



}
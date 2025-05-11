using CRMSolution.Grpc.Users;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;


[ApiController]
[Route("api/v1/account/")]
public class AccountController : ControllerBase
{
    private readonly UserService.UserServiceClient _accountService;

    public AccountController(UserService.UserServiceClient accountService)
    {
        _accountService = accountService;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var grpcRequest = new RegisterRequest
        {
            Email = request.Email,
            Password = request.Password,
            Username = request.Username
        };
        var response = await _accountService.RegisterAsync(grpcRequest);
        return Ok(response);
    }

    // [Authorize(Policy = "AdminPolicy")]
    [HttpGet("email/verify")]
    public async Task<IActionResult> VerifyEmailAsync([FromQuery] string token)
    {
        string? accessToken = Request.Cookies["accessToken"];
        var metadata = new Metadata();
        metadata.Add("token", accessToken);
        var grpcResponse = await _accountService.VerifyEmailAsync(new VerifyEmailRequest(), metadata);
        return Ok(grpcResponse);
    }
    // [Authorize(Policy = "AdminPolicy")]
    [HttpPost("email/confirm")]
    public async Task<IActionResult> ConfirmEmailAsync([FromBody] ConfirmRequest request)
    {
        var grpcRequest = new ConfirmRequest
        {
            Username = request.Username,
        };
        var grpcResponse = await _accountService.ConfirmEmailAsync(grpcRequest);
        return Ok(grpcResponse);
    }

    [HttpPost("password/reset")]
    public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordRequest request)
    {
        var grpcRequest = new ResetPasswordRequest
        {
            Username = request.Username,
        };
        var grpcResponse = await _accountService.ResetPasswordAsync(grpcRequest);
        return Ok(grpcResponse);
    }

    [HttpPost("password/change")]
    public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request)
    {
        await _accountService.ChangePasswordAsync(request);
        string? accessToken = Request.Cookies["accessToken"];
        var metadata = new Metadata();
        metadata.Add("token", accessToken);
        var grpcRequest = new ChangePasswordRequest
        {
            NewPassword = request.NewPassword,
        };
        var  grpcResponse = await _accountService.ChangePasswordAsync(grpcRequest,  metadata);
        return Ok(grpcResponse);
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMeAsync()
    {
        string? accessToken = Request.Cookies["accessToken"];
        var metadata = new Metadata();
        metadata.Add("accessToken", accessToken);
        return Ok(await _accountService.GetCurrentUserAsync(new DefaultRequest(), metadata));
    }
}
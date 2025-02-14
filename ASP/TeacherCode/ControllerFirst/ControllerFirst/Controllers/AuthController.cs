using ControllerFirst.Data.Models;
using ControllerFirst.Data.Validators;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using ControllerFirst.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace ControllerFirst.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("Login")]
    public async  Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        
        return Ok(new Result<LoginResponse>(true, response, "Successfully logged in"));
    }

    [HttpPost("Refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
    {
        var newToken = await _authService.RefreshTokenAsync(request);
        
        return Ok(new Result<RefreshTokenResponse>(true, newToken, "Successfully refreshed token"));
        
    }
    
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        return Ok("Logout");
    }
}

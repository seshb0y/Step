using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ITokenService _tokenService;

    public AuthController(IAuthService authService, ITokenService tokenService)
    {
        _tokenService = tokenService;
        _authService = authService;
    }

    [HttpPost("Login")]
    public async  Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request, HttpContext);
        
        Response.Cookies.Append("accessToken", response.accessToken);
        Response.Cookies.Append("refreshToken", response.refreshToken);
        
        
        return Ok(new Result<LoginResponse>(true, response, "Successfully logged in"));
    }

    [HttpPost("Refresh")]
    public async Task<IActionResult> Refresh()
    {
        var response = await _authService.RefreshTokenAsync(HttpContext);
        return Ok(new Result<RefreshTokenResponse>(true, response, "Successfully refreshed token"));
    }

    
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        await _authService.LogoutAsync(HttpContext);
        return Ok(new { message = "Logged out successfully" });
    }

}
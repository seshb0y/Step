using ControllerFirst.Data.Models;
using ControllerFirst.Data.Validators;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace ControllerFirst.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("Login")]
    public async  Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var token = await _userService.LoginAsync(request);
        
        return Ok(token);
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {   
        var validator = new RegisterValidator();
        var result = validator.Validate(request);
        
        if (!result.IsValid)
        {
            return BadRequest(result.Errors);
        }

        await _userService.RegisterAsync(request);
        
        return Ok("Register");
    }
    
    [HttpPost]
    [Route("Test")]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> Test()
    {
        return Ok("Test");
    }
    
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        return Ok("Logout");
    }
}

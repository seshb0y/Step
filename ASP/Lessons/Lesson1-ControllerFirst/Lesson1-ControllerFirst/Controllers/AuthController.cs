using Lesson1_ControllerFirst.Data.Validators;
using Lesson1_ControllerFirst.DTO.Requests;
using Lesson1_ControllerFirst.Services.Interface;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> Login()
    {
        return Ok("Login");
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var validator = new RegisterValidator();
        var results = validator.Validate(request);

        if (!results.IsValid)
        {
            return BadRequest(results.Errors);
        }
        
        await _userService.RegisterAsync(request);      
        
        return Ok("Register");
    }
    
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        return Ok("Logout");
    }
}
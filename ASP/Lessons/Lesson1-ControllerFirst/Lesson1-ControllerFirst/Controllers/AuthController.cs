using Microsoft.AspNetCore.Mvc;

namespace Lesson1_ControllerFirst.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login()
    {
        return Ok("Login Success");
    }

    [HttpPost("Register")]
    public IActionResult Register()
    {
        return Ok("Register");
    }
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok("Logout");
    }
}
using Microsoft.AspNetCore.Mvc;

namespace ControllerFirst.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("Login")]
    public IActionResult Login()
    {
        return Ok("Login");
    }

    [HttpPost("Register")]
    public IActionResult Register()
    {
        return Ok("Register");
    }
    
    [HttpPost("Logout")]
    public IActionResult Logout()
    {
        return Ok("Logout");
    }
}

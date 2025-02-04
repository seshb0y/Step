using Microsoft.AspNetCore.Mvc;

namespace ControllerFirst.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    [HttpPost("VerifyEmail")]
    public async Task<IActionResult> VerifyEmailAsync()
    {
        throw new System.NotImplementedException();
    }

    [HttpPost("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmailAsync()
    {
        throw new System.NotImplementedException();
    }
    
    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPasswordAsync()
    {
        throw new System.NotImplementedException();
    }
}
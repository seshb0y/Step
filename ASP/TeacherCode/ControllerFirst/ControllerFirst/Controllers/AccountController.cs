using ControllerFirst.Data.Validators;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using ControllerFirst.Services.Classes;
using ControllerFirst.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControllerFirst.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
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

        await _accountService.RegisterAsync(request);
        
        return Ok(new Result<string>(true, request.Username, "Successfully registered"));
    }
    
    [HttpPost("VerifyEmail")]
    public async Task<IActionResult> VerifyEmailAsync()
    {
        throw new NotImplementedException();
    }
    
    [HttpPost("ConfirmEmailAsync")]
    public async Task<IActionResult> ConfirmEmailAsync()
    {
        throw new NotImplementedException();
    }
    
    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPasswordAsync()
    {
        throw new NotImplementedException();
    }
}
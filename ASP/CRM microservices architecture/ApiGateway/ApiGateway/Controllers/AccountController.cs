// using ControllerFirst.DTO.Requests;
// using ControllerFirst.DTO.Responses;
// using CRMSolution.Data.Validators.Auth;
// using CRMSolution.Services.Interfaces;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
//
// namespace ApiGateway.Controllers;
//
//
// [ApiController]
// [Route("api/v1/account/")]
// public class AccountController : ControllerBase
// {
//     private readonly IAccountService _accountService;
//
//     public AccountController(IAccountService accountService)
//     {
//         _accountService = accountService;
//     }
//
//
//     [HttpPost("register")]
//     public async Task<IActionResult> Register([FromBody] RegisterRequest request)
//     {
//         var validator = new RegisterValidator();
//         var result = validator.Validate(request);
//
//         if (!result.IsValid)
//         {
//             return BadRequest(result.Errors);
//         }
//
//         await _accountService.RegisterAsync(request);
//
//         return Ok(new Result<string>(true, request.Username, "Successfully registered"));
//     }
//
//     // [Authorize(Policy = "AdminPolicy")]
//     [HttpGet("email/verify")]
//     public async Task<IActionResult> VerifyEmailAsync([FromQuery] string token)
//     {
//         await _accountService.VerifyEmailAsync(token);
//         
//         return Ok(new Result<string>(true, "Email confirmed", "Email confirmed"));
//     }
//     // [Authorize(Policy = "AdminPolicy")]
//     [HttpPost("email/confirm")]
//     public async Task<IActionResult> ConfirmEmailAsync([FromBody] ConfirmRequest request)
//     {
//         await _accountService.ConfirmEmailAsync(request, HttpContext);
//
//         return Ok(new Result<string>(true, request.username, "Email sent"));
//     }
//
//     [HttpPost("password/reset")]
//     public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordRequest request)
//     {
//         await _accountService.ResetPasswordAsync(request, HttpContext);
//
//         return Ok(new Result<string>(true, request.username, "Reset password mail sent"));
//     }
//
//     [HttpPost("password/change")]
//     public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request)
//     {
//         await _accountService.ChangePasswordAsync(request);
//
//         return Ok(new Result<string>(true, "Password changed", "Password changed"));
//     }
//
//     [HttpGet("me")]
//     public async Task<IActionResult> GetMeAsync()
//     {
//         return Ok(await _accountService.GetCurrentUserAsync());
//     }
// }
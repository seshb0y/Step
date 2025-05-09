// using ControllerFirst.DTO.Requests;
// using ControllerFirst.DTO.Responses;
// using CRMSolution.Services.Interfaces;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
//
// namespace ApiGateway.Controllers;
//
// [ApiController]
// [Route("api/v1/auth/")]
// public class AuthController : ControllerBase
// {
//     private readonly IAuthService _authService;
//     private readonly ITokenService _tokenService;
//
//     public AuthController(IAuthService authService, ITokenService tokenService)
//     {
//         _tokenService = tokenService;
//         _authService = authService;
//     }
//
//     [HttpPost("login")]
//     public async  Task<IActionResult> Login([FromBody] LoginRequest request)
//     {
//         var response = await _authService.LoginAsync(request, HttpContext);
//         
//         Response.Cookies.Append("accessToken", response.accessToken);
//         Response.Cookies.Append("refreshToken", response.refreshToken);
//         
//         
//         return Ok(new Result<LoginResponse>(true, response, "Successfully logged in"));
//     }
//
//     [HttpPost("refresh")]
//     public async Task<IActionResult> Refresh()
//     {
//         var response = await _authService.RefreshTokenAsync(HttpContext);
//         return Ok(new Result<RefreshTokenResponse>(true, response, "Successfully refreshed token"));
//     }
//
//     
//     [HttpPost("logout")]
//     public async Task<IActionResult> Logout()
//     {
//                 context.Response.Cookies.Delete("accessToken");
//                  context.Response.Cookies.Delete("refreshToken");
//                  return Task.CompletedTask;
//         return Ok(new { message = "Logged out successfully" });
//     }
//
// }

// логин
// [HttpPost("login")]
// public async Task<IActionResult> Login([FromBody] HttpLoginRequest httpRequest)
// {
//     var grpcRequest = new LoginRequest
//     {
//         Username = httpRequest.Username,
//         Password = httpRequest.Password
//     };
//
//     var grpcResponse = await _userGrpcClient.LoginAsync(grpcRequest);
//
//     Response.Cookies.Append("accessToken", grpcResponse.AccessToken, new CookieOptions
//     {
//         HttpOnly = true,
//         Secure = true,
//         SameSite = SameSiteMode.Strict,
//         Expires = DateTime.UtcNow.AddMinutes(15)
//     });
//
//     Response.Cookies.Append("refreshToken", grpcResponse.RefreshToken, new CookieOptions
//     {
//         HttpOnly = true,
//         Secure = true,
//         SameSite = SameSiteMode.Strict,
//         Expires = DateTime.UtcNow.AddDays(7)
//     });
//
//     return Ok("Login successful");
// }


//рефреш токен
// [HttpPost("refresh")]
// public async Task<IActionResult> RefreshToken()
// {
//     var accessToken = Request.Cookies["accessToken"];
//     var refreshToken = Request.Cookies["refreshToken"];
//
//     var response = await _userGrpcClient.RefreshTokenWithCookiesAsync(new RefreshTokenRequest
//     {
//         AccessToken = accessToken,
//         RefreshToken = refreshToken
//     });
//
//     Response.Cookies.Append("accessToken", response.AccessToken, new CookieOptions
//     {
//         HttpOnly = true,
//         Secure = true,
//         SameSite = SameSiteMode.Strict,
//         Expires = DateTime.UtcNow.AddMinutes(15)
//     });
//
//     Response.Cookies.Append("refreshToken", response.RefreshToken, new CookieOptions
//     {
//         HttpOnly = true,
//         Secure = true,
//         SameSite = SameSiteMode.Strict,
//         Expires = DateTime.UtcNow.AddDays(7)
//     });
//
//     return Ok("Token refreshed");
// }

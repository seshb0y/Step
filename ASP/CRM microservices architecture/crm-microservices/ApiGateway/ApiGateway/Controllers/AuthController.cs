using ApiGateway.DTO.Responses;
using ApiGateway.Hubs;
using CRMSolution.Grpc.Users;
using MailKit;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using LoginRequest = CRMSolution.Grpc.Users.LoginRequest;
using Metadata = Grpc.Core.Metadata;

namespace ApiGateway.Controllers;

 [ApiController]
 [Route("api/v1/auth/")]
 public class AuthController : ControllerBase
 {
     private readonly IHubContext<NotificationHub>  _hubContext;
     private readonly UserService.UserServiceClient _authService;
     // private readonly ITokenService _tokenService;

     public AuthController(UserService.UserServiceClient authService, IHubContext<NotificationHub> hubContext)
     {
         _hubContext = hubContext;
         // _tokenService = tokenService;
         _authService = authService;
     }

     [HttpPost("login")]
     public async  Task<IActionResult> Login([FromBody] LoginRequest request)
     {
         var grpcRequest = new LoginRequest
         {
             Username = request.Username,
             Password = request.Password
         };
         var grpcResponse = await _authService.LoginAsync(grpcRequest); 
         Response.Cookies.Append("accessToken", grpcResponse.AccessToken, 
             new CookieOptions{
                 HttpOnly = true,
                 Secure = true,
                 SameSite = SameSiteMode.Strict,
                 Expires = DateTime.UtcNow.AddMinutes(30)
         });
         Response.Cookies.Append("refreshToken", grpcResponse.RefreshToken,
             new CookieOptions{
                  HttpOnly = true,
                  Secure = true,
                  SameSite = SameSiteMode.Strict,
                  Expires = DateTime.UtcNow.AddDays(7)
          });
         var response = new HttpLoginResponse(grpcResponse.AccessToken, grpcResponse.RefreshToken);
         
         return Ok(response);
     }

     [HttpPost("refresh")]
     public async Task<IActionResult> Refresh()
     {
         string accessToken =  Request.Cookies["accessToken"];
         string  refreshToken = Request.Cookies["refreshToken"];
         var metadata = new Metadata();
         metadata.Add("accesstoken", accessToken);
         metadata.Add("refreshtoken", refreshToken);
         if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
             return Unauthorized();
         var grpcResponse = await _authService.RefreshTokenAsync(new RefreshTokenRequest(), metadata);
         // var response = new HttpRefreshTokenResponse(grpcResponse.AccessToken, grpcResponse.RefreshToken);
         return Ok(new Result<RefreshTokenResponse>(true, grpcResponse, "Successfully refreshed token"));
     }

     
     [HttpPost("logout")]
     public async Task<IActionResult> Logout()
     { 
         HttpContext.Response.Cookies.Delete("accessToken");
         HttpContext.Response.Cookies.Delete("refreshToken");
         return Ok(new { message = "Logged out successfully" });
     }

 }

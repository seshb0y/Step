using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;

namespace CRMSolution.Services.Interfaces;

public interface IAuthService
{
    public Task<LoginResponse> LoginAsync(LoginRequest request, HttpContext context);
    
    public Task<RefreshTokenResponse> RefreshTokenAsync(HttpContext context);

    public Task LogoutAsync(HttpContext context);
}
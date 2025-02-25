namespace CRMSolution.Services.Interfaces;

public interface IAuthService
{
    public Task<LoginResponse> LoginAsync(LoginRequest request);
    
    public Task<RefreshTokenResponse> RefreshTokenAsync(RefreshTokenRequest request);
}
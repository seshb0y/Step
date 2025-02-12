using ControllerFirst.DTO.Requests;

namespace ControllerFirst.Services.Interfaces;

public interface ITokenService
{
    public Task<string> CreateTokenAsync(LoginRequest request);
    
}
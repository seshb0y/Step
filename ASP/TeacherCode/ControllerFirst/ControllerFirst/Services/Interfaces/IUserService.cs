using ControllerFirst.DTO.Requests;
using ControllerFirst.Data.Models;

namespace ControllerFirst.Services.Interfaces;

public interface IUserService
{
    public Task RegisterAsync(RegisterRequest request);
    
    public Task<string> LoginAsync(LoginRequest request);
    
    
}
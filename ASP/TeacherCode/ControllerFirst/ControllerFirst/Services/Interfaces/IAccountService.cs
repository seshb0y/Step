using ControllerFirst.DTO.Requests;

namespace ControllerFirst.Services.Interfaces;

public interface IAccountService
{
    public Task RegisterAsync(RegisterRequest request);
}
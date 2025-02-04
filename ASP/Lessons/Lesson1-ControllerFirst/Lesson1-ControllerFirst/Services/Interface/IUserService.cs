using ControllerFirst.Models;
using Microsoft.AspNetCore.Identity.Data;
using RegisterRequest = Lesson1_ControllerFirst.DTO.Requests.RegisterRequest;

namespace Lesson1_ControllerFirst.Services.Interface;

public interface IUserService
{
    public Task RegisterAsync(RegisterRequest request);
    public Task<User> LoginAsync(LoginRequest request);
}
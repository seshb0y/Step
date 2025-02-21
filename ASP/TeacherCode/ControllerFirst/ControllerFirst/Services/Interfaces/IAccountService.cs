using ControllerFirst.DTO.Requests;
using Microsoft.AspNetCore.Identity.Data;
using RegisterRequest = ControllerFirst.DTO.Requests.RegisterRequest;
using ResetPasswordRequest = ControllerFirst.DTO.Requests.ResetPasswordRequest;

namespace ControllerFirst.Services.Interfaces;

public interface IAccountService
{
    public Task RegisterAsync(RegisterRequest request);
    public Task ConfirmEmailAsync(ConfirmRequest request, HttpContext context);
    public Task VerifyEmailAsync(string token);
    public Task ResetPasswordAsync(ResetPasswordRequest request, HttpContext context);
    
    public Task ChangePasswordAsync(ChangePasswordRequest request);
}
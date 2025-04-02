using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;

namespace CRMSolution.Services.Interfaces;

public interface IAccountService
{
    public Task SendEmailAsync(string to, string subject, string html);
    public Task RegisterAsync(RegisterRequest request);
    public Task ConfirmEmailAsync(ConfirmRequest request, HttpContext context);
    public Task VerifyEmailAsync(string token);
    public Task ResetPasswordAsync(ResetPasswordRequest request, HttpContext context);
    
    public Task ChangePasswordAsync(ChangePasswordRequest request);
    public Task<GetCurrentUserResponse> GetCurrentUserAsync();
}
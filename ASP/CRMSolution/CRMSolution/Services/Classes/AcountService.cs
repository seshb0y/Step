using System.Net;
using System.Net.Mail;
using System.Text;
using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using ControllerFirst.DTO.Requests;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.UserRep;

namespace CRMSolution.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AccountService> _logger;

    public AccountService(IMapper mapper, IUnitOfWork unitOfWork, IConfiguration config, ITokenService tokenService, ILogger<AccountService> logger)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _config = config;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        _logger.LogInformation("Регистрация юзера: {@Request}", request);
        if (await _unitOfWork.UserRep.FindByNameAsync(request.Username) != null || 
            await _unitOfWork.UserRep.FindByEmailAsync(request.Email) != null)
        {
            throw new Exception("User with this email or username already exists");
        }

        if (request.Password != request.ConfirmPassword)
            throw new Exception("Passwords do not match");

        var user = _mapper.Map<User>(request);
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        user.Role = UserRole.Manager; 

        await _unitOfWork.UserRep.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task ConfirmEmailAsync(ConfirmRequest request, HttpContext context)
    {
        _logger.LogInformation("Отправка письма для подтверждения мыла: {@Request}", request);
        var user = await _unitOfWork.UserRep.FindByNameAsync(request.username);
        if (user == null)
            throw new Exception("User not found");

        string token = await _tokenService.CreateEmailTokenAsync(request.username);
        string link = $"{context.Request.Scheme}://{context.Request.Host}/api/auth/verify-email?token={token}";

        using var client = new SmtpClient
        {
            Port = 587,
            EnableSsl = true,
            Host = _config["Smtp:Host"],
            Credentials = new NetworkCredential(_config["Smtp:Username"], _config["Smtp:Password"])
        };

        string emailBody = $"<p>Привет, {request.username}! Подтвердите вашу почту, нажав <a href='{link}'>сюда</a>.</p>";

        var message = new MailMessage
        {
            From = new MailAddress(_config["Smtp:Username"]),
            Subject = "Подтверждение email",
            Body = emailBody,
            IsBodyHtml = true
        };

        message.To.Add(user.Email);
        await client.SendMailAsync(message);
    }

    public async Task VerifyEmailAsync(string token)
    {
        _logger.LogInformation("Подтверждение мыла по токены: {@Token}", token);
        string username = await _tokenService.GetNameFromToken(token);
        if (string.IsNullOrEmpty(username))
            throw new Exception("Invalid token");

        bool isValid = await _tokenService.ValidateEmailTokenAsync(token);
        if (!isValid)
            throw new Exception("Token is invalid or expired");

        var user = await _unitOfWork.UserRep.FindByNameAsync(username);
        if (user == null)
            throw new Exception("User not found");

        user.IsEmailConfirmed = true;
        await _unitOfWork.SaveChangesAsync();
    }
    

    public async Task ResetPasswordAsync(ResetPasswordRequest request, HttpContext context)
    {
        _logger.LogInformation("Отправка письма для сброса пароля: {@Request}", request);
        var user = await _unitOfWork.UserRep.FindByNameAsync(request.username);
        if (user == null)
            throw new Exception("User not found");

        string token = await _tokenService.CreateResetPasswordTokenAsync(request.username);
        string link = $"http://localhost:5174/change-password?token={token}";

        using var client = new SmtpClient
        {
            Port = 587,
            EnableSsl = true,
            Host = _config["Smtp:Host"],
            Credentials = new NetworkCredential(_config["Smtp:Username"], _config["Smtp:Password"])
        };

        string emailBody = $"<p>Привет, {request.username}! Чтобы сбросить пароль, перейдите <a href='{link}'>сюда</a>.</p>";

        var message = new MailMessage
        {
            From = new MailAddress(_config["Smtp:Username"]),
            Subject = "Сброс пароля",
            Body = emailBody,
            IsBodyHtml = true
        };

        message.To.Add(user.Email);
        await client.SendMailAsync(message);
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest request)
    {
        _logger.LogInformation("Изменение пароля: {@Request}", request);
        bool isValid = await _tokenService.ValidateChangePasswordTokenAsync(request.token);
        if (!isValid)
            throw new Exception("Invalid or expired token");

        var username = await _tokenService.GetNameFromToken(request.token);
        var user = await _unitOfWork.UserRep.FindByEmailAsync(username);
        if (user == null)
            throw new Exception("User not found");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.newPassword);
        await _unitOfWork.SaveChangesAsync();
    }
}

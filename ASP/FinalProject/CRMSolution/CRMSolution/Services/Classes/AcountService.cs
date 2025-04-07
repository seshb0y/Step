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
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Hubs;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.SignalR;


namespace CRMSolution.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AccountService> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IHubContext<NotificationHub> _notificationHub;

    public AccountService(IMapper mapper, IUnitOfWork unitOfWork, IConfiguration config, ITokenService tokenService,
        ILogger<AccountService> logger,  IHttpContextAccessor httpContextAccessor, IHubContext<NotificationHub> notificationHub)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _config = config;
        _tokenService = tokenService;
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _notificationHub = notificationHub;
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
        await _notificationHub.Clients.All.SendAsync("NewUserRegistered", new
        {
            user.Id,
            user.Email,
            user.Username,
            user.CreatedAt,
            user.Role,
        });
    }

    public async Task ConfirmEmailAsync(ConfirmRequest request, HttpContext context)
    {
        _logger.LogInformation("Отправка письма для подтверждения мыла: {@Request}", request);
        var user = await _unitOfWork.UserRep.FindByNameAsync(request.username);
        if (user == null)
            throw new Exception("User not found");

        string token = await _tokenService.CreateEmailTokenAsync(request.username);
        string link = $"https://crm-solution-delta.vercel.app/verify-email?token={token}";

        string emailBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                <h2 style='color: #4F46E5;'>Email Confirmation</h2>
                <p>Hello, {request.username}!</p>
                <p>Please confirm your email address by clicking the button below:</p>
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{link}' style='background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;'>
                        Confirm Email
                    </a>
                </div>
                <p style='color: #666; font-size: 14px;'>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style='color: #666; font-size: 14px;'>{link}</p>
                <p style='color: #666; font-size: 12px; margin-top: 30px;'>This link will expire in 24 hours.</p>
            </div>";
        await SendEmailAsync(user.Email, "Email Confirmation", emailBody);
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
        string link = $"http://localhost:5173/change-password?token={token}";

        string emailBody = $"<p>Привет, {request.username}! Чтобы сбросить пароль, перейдите <a href='{link}'>сюда</a>.</p>";
        await SendEmailAsync(user.Email, "Сброс пароля", emailBody);
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest request)
    {
        _logger.LogInformation("Изменение пароля: {@Request}", request);
        bool isValid = await _tokenService.ValidateChangePasswordTokenAsync(request.token);
        if (!isValid)
            throw new Exception("Invalid or expired token");

        var username = await _tokenService.GetNameFromToken(request.token);
        var user = await _unitOfWork.UserRep.FindByNameAsync(username);
        if (user == null)
            throw new Exception("User not found");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.newPassword);
        await _unitOfWork.SaveChangesAsync();
    }
    
    public async Task<GetCurrentUserResponse> GetCurrentUserAsync()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            throw new Exception("HttpContext is not available");
        }

        var token = httpContext.Request.Cookies["accessToken"];
        if (string.IsNullOrEmpty(token))
        {
            throw new Exception("No accessToken found");
        }

        string username = await _tokenService.GetNameFromToken(token);
        if (string.IsNullOrEmpty(username))
        {
            throw new Exception("Invalid token");
        }

        var user = await _unitOfWork.UserRep.FindByNameAsync(username);
        
        
        return _mapper.Map<GetCurrentUserResponse>(user);
    }
    
    public async Task SendEmailAsync(string to, string subject, string html)
    {
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(_config["Smtp:SenderEmail"]));
        email.To.Add(MailboxAddress.Parse(to));
        email.Subject = subject;
        email.Body = new TextPart("html") { Text = html };

        using var smtp = new MailKit.Net.Smtp.SmtpClient();
        var port = int.Parse(_config["Smtp:Port"]);
        var host = _config["Smtp:Host"];
        var username = _config["Smtp:Username"];
        var password = _config["Smtp:Password"];

        var socketOption = _config["Smtp:SecureSocketOption"]?.ToLower() switch
        {
            "none" => SecureSocketOptions.None,
            "ssl" => SecureSocketOptions.SslOnConnect,
            "starttls" => SecureSocketOptions.StartTls,
            "starttlswhenavailable" => SecureSocketOptions.StartTlsWhenAvailable,
            _ => SecureSocketOptions.StartTls
        };
        
        await smtp.ConnectAsync(host, port, socketOption);
        smtp.AuthenticationMechanisms.Remove("XOAUTH2"); 
        await smtp.AuthenticateAsync(username, password);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }

}

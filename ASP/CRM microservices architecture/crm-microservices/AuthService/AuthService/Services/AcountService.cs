using System.Text;
using AutoMapper;
using ClientService.Helpers;
using CRMSolution.Data.Models;
using CRMSolution.Services.Interfaces;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Grpc.Users;
using CRMSolution.Hubs;
using Google.Protobuf.WellKnownTypes;
using MimeKit;
using MailKit.Security;
using Microsoft.AspNetCore.SignalR;
using RegisterRequest = CRMSolution.Grpc.Users.RegisterRequest;
using UserRole = CRMSolution.Data.Models.UserRole;

namespace CRMSolution.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly IUserRep _userRep;
    private readonly IConfiguration _config;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AccountService> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly CacheHelper _cacheHelper;

    public AccountService(IMapper mapper, IUserRep userRep, IConfiguration config, ITokenService tokenService,
        ILogger<AccountService> logger, IHttpContextAccessor httpContextAccessor, IHubContext<NotificationHub> notificationHub,
        CacheHelper cacheHelper)
    {
        _mapper = mapper;
        _userRep = userRep;
        _config = config;
        _tokenService = tokenService;
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _notificationHub = notificationHub;
        _cacheHelper = cacheHelper;
    }
    private async Task ClearClientsCacheAsync(string username)
    {
        await _cacheHelper.RemoveAsync($"user:current:{username}");
    }
    public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
    {
        _logger.LogInformation("Регистрация пользователя: {@Request}", request);
        if (await _userRep.FindByNameAsync(request.Username) != null || 
            await _userRep.FindByEmailAsync(request.Email) != null)
        {
            _logger.LogWarning("Пользователь уже существует: {Username} / {Email}", request.Username, request.Email);
            throw new Exception("User with this email or username already exists");
        }

        var user = _mapper.Map<User>(request);
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        user.Role = UserRole.Manager;

        await _userRep.AddAsync(user);
        await _userRep.SaveChangesAsync();

        _logger.LogInformation("Пользователь зарегистрирован: {UserId}", user.UserId);
        return new RegisterResponse
        {
            Id = user.UserId,
            Email = user.Email,
            Username = user.Username,
            CreatedAt = Timestamp.FromDateTime(user.CreatedAt.ToUniversalTime()),
            Role = (Grpc.Users.UserRole)user.Role
        };
    }

    public async Task<ConfirmResponse> ConfirmEmailAsync(ConfirmRequest request)
    {
        _logger.LogInformation("Запрос на отправку подтверждения email: {@Request}", request);
        var user = await _userRep.FindByNameAsync(request.Username);
        if (user == null)
        {
            _logger.LogWarning("Пользователь не найден для подтверждения email: {Username}", request.Username);
            throw new Exception("User not found");
        }

        string token = await _tokenService.CreateEmailTokenAsync(request.Username);
        string link = $"http://localhost:5173/verify-email?token={token}";

        string emailBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                <h2 style='color: #4F46E5;'>Email Confirmation</h2>
                <p>Hello, {request.Username}!</p>
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

        _logger.LogInformation("Письмо подтверждения email отправлено: {Email}", user.Email);
        return new ConfirmResponse { Username = user.Username };
    }

    public async Task VerifyEmailAsync(string token)
    {
        _logger.LogInformation("Подтверждение email по токену: {Token}", token);
        string username = await _tokenService.GetNameFromToken(token, _config["JWT:EmailKey"]);
        if (string.IsNullOrEmpty(username)) throw new Exception("Invalid token");

        bool isValid = await _tokenService.ValidateEmailTokenAsync(token);
        if (!isValid) throw new Exception("Token is invalid or expired");

        var user = await _userRep.FindByNameAsync(username);
        if (user == null) throw new Exception("User not found");

        user.IsEmailConfirmed = true;
        await _userRep.SaveChangesAsync();
        _logger.LogInformation("Email подтвержден: {Username}", username);
        await ClearClientsCacheAsync(user.Username);
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest request)
    {
        _logger.LogInformation("Запрос на сброс пароля: {@Request}", request);
        var user = await _userRep.FindByNameAsync(request.Username);
        if (user == null) throw new Exception("User not found");

        string token = await _tokenService.CreateResetPasswordTokenAsync(request.Username);
        string link = $"http://localhost:5173/change-password?token={token}";

        string emailBody = $"<p>Привет, {request.Username}! Чтобы сбросить пароль, перейдите по ссылке: <a href='{link}'>{link}</a></p>";
        await SendEmailAsync(user.Email, "Сброс пароля", emailBody);
        _logger.LogInformation("Письмо для сброса пароля отправлено: {Email}", user.Email);
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest request, string token)
    {
        _logger.LogInformation("Изменение пароля по токену: {Token}", token);
        bool isValid = await _tokenService.ValidateChangePasswordTokenAsync(token);
        if (!isValid) throw new Exception("Invalid or expired token");

        var username = await _tokenService.GetNameFromToken(token);
        var user = await _userRep.FindByNameAsync(username);
        if (user == null) throw new Exception("User not found");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
        await _userRep.SaveChangesAsync();
        _logger.LogInformation("Пароль успешно изменен: {Username}", username);
        await ClearClientsCacheAsync(user.Username);
    }

    public async Task<CurrentUserResponse> GetCurrentUserAsync(string token)
    {
        _logger.LogInformation("Получение текущего пользователя по токену");
        string username = await _tokenService.GetNameFromToken(token);
        if (string.IsNullOrEmpty(username)) throw new Exception("Invalid token");
        
        string cacheKey = $"user:current:{username}";
        var cached = await _cacheHelper.GetAsync<CurrentUserResponse>(cacheKey);
        if (cached != null)
        {
            _logger.LogInformation("Пользователь взят из кэша: {Username}", username);
            return cached;
        }
    
        var user = await _userRep.FindByNameAsync(username);
        _logger.LogInformation("Текущий пользователь: {Username}", username);
        await _cacheHelper.SetAsync(cacheKey, user, TimeSpan.FromHours(1));
        return _mapper.Map<CurrentUserResponse>(user);
    }

    public async Task SendEmailAsync(string to, string subject, string html)
    {
        _logger.LogInformation("Отправка email: To={To}, Subject={Subject}", to, subject);
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
        _logger.LogInformation("Email отправлен: {To}", to);
    }
}

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
using CRMSolution.Data.Repository.UserRep;

namespace CRMSolution.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly IUserRep _userRepository;
    private readonly IConfiguration _config;
    private readonly ITokenService _tokenService;

    public AccountService(IMapper mapper, IUserRep userRepository, IConfiguration config, ITokenService tokenService)
    {
        _mapper = mapper;
        _userRepository = userRepository;
        _config = config;
        _tokenService = tokenService;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        if (await _userRepository.FindByNameAsync(request.Username) != null || 
            await _userRepository.FindByEmailAsync(request.Email) != null)
        {
            throw new Exception("User with this email or username already exists");
        }

        if (request.Password != request.ConfirmPassword)
            throw new Exception("Passwords do not match");

        var user = _mapper.Map<User>(request);
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        user.Role = UserRole.Manager; 

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();
    }

    public async Task ConfirmEmailAsync(ConfirmRequest request, HttpContext context)
    {
        var user = await _userRepository.FindByNameAsync(request.username);
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
        string username = await _tokenService.GetNameFromToken(token);
        if (string.IsNullOrEmpty(username))
            throw new Exception("Invalid token");

        bool isValid = await _tokenService.ValidateEmailTokenAsync(token);
        if (!isValid)
            throw new Exception("Token is invalid or expired");

        var user = await _userRepository.FindByNameAsync(username);
        if (user == null)
            throw new Exception("User not found");

        user.IsEmailConfirmed = true;
        await _userRepository.SaveChangesAsync();
    }
    

    public async Task ResetPasswordAsync(ResetPasswordRequest request, HttpContext context)
    {
        var user = await _userRepository.FindByNameAsync(request.username);
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
        bool isValid = await _tokenService.ValidateChangePasswordTokenAsync(request.token);
        if (!isValid)
            throw new Exception("Invalid or expired token");

        var username = await _tokenService.GetNameFromToken(request.token);
        var user = await _userRepository.FindByEmailAsync(username);
        if (user == null)
            throw new Exception("User not found");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.newPassword);
        await _userRepository.SaveChangesAsync();
    }
}

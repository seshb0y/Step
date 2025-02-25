using System.Net;
using System.Net.Mail;
using System.Text;
using AutoMapper;
using BCrypt.Net;
using ControllerFirst.DTO.Requests;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly CRMContext _context;

    public AccountService(IMapper mapper, CRMContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.UserName == request.Username || u.Email == request.Email))
            throw new Exception("User with this email or username already exists");

        var user = _mapper.Map<User>(request);
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        user.Role = UserRole.Manager; // По умолчанию менеджер

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
    
    public async Task ConfirmEmailAsync(ConfirmRequest request, HttpContext context)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.username);

        SmtpClient client = new SmtpClient()
        {
            Port = 587,
            EnableSsl = true,
            Host = _config["Smtp:Host"],
            Credentials = new NetworkCredential(_config["Smtp:Username"], _config["Smtp:Password"])
        };

        using FileStream fs = new("../ControllerFirst/wwwroot/email.html", FileMode.Open);
        using StreamReader sr = new(fs);
        StringBuilder sb = new(await sr.ReadToEndAsync());

        var link =
            $"{context.Request.Scheme}://{context.Request.Host}/api/v1/Account/VerifyEmail?token={await _tokenService.CreateEmailTokenAsync(request.username)}";

        sb.Replace("{username}", request.username);
        sb.Replace("{link}", link);

        MailMessage message = new()
        {
            From = new MailAddress(_config["Smtp:Username"]),
            Subject = "Email confirmation",
            Body = sb.ToString(),
            IsBodyHtml = true
        };


        message.To.Add(user.Email);

        client.Send(message);
    }

    public async Task VerifyEmailAsync(string token)
    {
        var name = await _tokenService.GetNameFromToken(token);

        bool res = await _tokenService.ValidateEmailTokenAsync(token);
        
        if (res)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == name);

            user.IsEmailConfirmed = true;

            await _context.SaveChangesAsync();
        }
    }
}
using AutoMapper;
using BCrypt.Net;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Interfaces;
using System;
using System.Threading.Tasks;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.UserRep;

namespace CRMSolution.Services.Classes;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly ILogger<AuthService> _logger;

    public AuthService(IUnitOfWork unitOfWork, IMapper mapper, ITokenService tokenService, ILogger<AuthService> logger)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request, HttpContext context)
    {
        _logger.LogInformation("Вход в аккаунт: {@Request}", request);
        var user = await _unitOfWork.UserRep.FindByNameAsync(request.username);
        var accessToken = await _tokenService.CreateTokenAsync(user.Email);
        var refreshToken = user.RefreshToken.ToString();
        
        context.Response.Cookies.Append("accessToken", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(15)
        });

        context.Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return new LoginResponse(accessToken, refreshToken);

    }

    public async Task<RefreshTokenResponse> RefreshTokenAsync(HttpContext context)
    {
        _logger.LogInformation("Обновление токена через cookies");

        var accessToken = context.Request.Cookies["accessToken"];
        var refreshToken = context.Request.Cookies["refreshToken"];


        Console.WriteLine(refreshToken);
        if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(accessToken))
            throw new Exception("Tokens are missing");

        var username = await _tokenService.GetNameFromToken(accessToken);
        var user = await _unitOfWork.UserRep.FindByNameAsync(username);

        if (user == null || user.RefreshToken.ToString() != refreshToken || user.RefreshTokenExpiration < DateTime.UtcNow)
            throw new Exception("Invalid refresh token");
        
        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);
        await _unitOfWork.SaveChangesAsync();

        var newAccessToken = await _tokenService.CreateTokenAsync(user.Email);
        var newRefreshToken = user.RefreshToken.ToString();
        
        context.Response.Cookies.Append("accessToken", newAccessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(15)
        });

        context.Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return new RefreshTokenResponse(newAccessToken, newRefreshToken);
    }

    
    public Task LogoutAsync(HttpContext context)
    {
        context.Response.Cookies.Delete("accessToken");
        context.Response.Cookies.Delete("refreshToken");
        return Task.CompletedTask;
    }
}
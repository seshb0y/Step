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

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        _logger.LogInformation("Вход в аккаунт: {@Request}", request);
        var user = await _unitOfWork.UserRep.FindByNameAsync(request.username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.password, user.PasswordHash))
            throw new Exception("Invalid credentials");

        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);

        await _unitOfWork.SaveChangesAsync();

        return new LoginResponse(await _tokenService.CreateTokenAsync(user.Email), user.RefreshToken.ToString());
    }

    public async Task<RefreshTokenResponse> RefreshTokenAsync(RefreshTokenRequest request)
    {
        _logger.LogInformation("Создание рефреш токена: {@Request}", request);
        var user = await _unitOfWork.UserRep.FindByNameAsync(request.username);
        if (user == null || user.RefreshToken.ToString() != request.refreshToken || user.RefreshTokenExpiration < DateTime.UtcNow)
            throw new Exception("Invalid refresh token");

        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);

        await _unitOfWork.SaveChangesAsync();

        return new RefreshTokenResponse(await _tokenService.CreateTokenAsync(user.Email), user.RefreshToken.ToString());
    }
}
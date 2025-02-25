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
using CRMSolution.Data.Repository.UserRep;

namespace CRMSolution.Services.Classes;

public class AuthService : IAuthService
{
    private readonly IUserRep _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AuthService(IUserRep userRepository, IMapper mapper, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.FindByNameAsync(request.username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.password, user.PasswordHash))
            throw new Exception("Invalid credentials");

        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);

        await _userRepository.SaveChangesAsync();

        return new LoginResponse(await _tokenService.CreateTokenAsync(user.UserName), user.RefreshToken.ToString());
    }

    public async Task<RefreshTokenResponse> RefreshTokenAsync(RefreshTokenRequest request)
    {
        var user = await _userRepository.FindByNameAsync(request.username);
        if (user == null || user.RefreshToken.ToString() != request.refreshToken || user.RefreshTokenExpiration < DateTime.UtcNow)
            throw new Exception("Invalid refresh token");

        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);

        await _userRepository.SaveChangesAsync();

        return new RefreshTokenResponse(await _tokenService.CreateTokenAsync(user.UserName), user.RefreshToken.ToString());
    }
}
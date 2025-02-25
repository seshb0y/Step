using AutoMapper;
using BCrypt.Net;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Responses;
using CRMSolution.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Services.Classes;

public class AuthService : IAuthService
{
    private readonly ITokenService _tokenService;
    private readonly CRMContext _context;
    private readonly IMapper _mapper;

    public AuthService(CRMContext context, IMapper mapper, ITokenService tokenService)
    {
        _context = context;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.password, user.PasswordHash))
            throw new Exception("Invalid credentials");

        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);

        await _context.SaveChangesAsync();

        return new LoginResponse(await _tokenService.CreateTokenAsync(user.UserName), user.RefreshToken.ToString());
    }

    public async Task<RefreshTokenResponse> RefreshTokenAsync(RefreshTokenRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.username);

        if (user == null || user.RefreshToken.ToString() != request.refreshToken || user.RefreshTokenExpiration < DateTime.UtcNow)
            throw new Exception("Invalid refresh token");

        user.RefreshToken = Guid.NewGuid();
        user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);

        await _context.SaveChangesAsync();

        return new RefreshTokenResponse(await _tokenService.CreateTokenAsync(user.UserName), user.RefreshToken.ToString());
    }
}
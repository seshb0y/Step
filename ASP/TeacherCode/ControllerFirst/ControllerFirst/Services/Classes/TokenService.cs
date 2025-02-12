using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;


namespace ControllerFirst.Services.Classes;

public class TokenService : ITokenService
{
    private readonly IConfiguration config;

    public TokenService(IConfiguration config)
    {
        this.config = config;
    }

    public async Task<string> CreateTokenAsync(LoginRequest request)
    {
        // Создаю токен в payload которого будет username
        
        // Claim - это пара ключ-значение, которая содержит информацию о пользователе
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, request.username),
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("JWT:Key").Value));

        var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(10),
            issuer: config.GetSection("JWT:Issuer").Value,
            audience: config.GetSection("JWT:Audience").Value,
            signingCredentials: signingCred);

        string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return tokenString;
    }
}


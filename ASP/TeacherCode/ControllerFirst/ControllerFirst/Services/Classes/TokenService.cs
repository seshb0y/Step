using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ControllerFirst.Contexts;
using ControllerFirst.Data.Models;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace ControllerFirst.Services.Classes;

public class TokenService : ITokenService
{
    private readonly IConfiguration config;
    private readonly AuthContext _context;


    public TokenService(IConfiguration config, AuthContext context)
    {
        this.config = config;
        _context = context;
    }

    public async Task<string> CreateTokenAsync(string username)
    {
        // Создаю токен в payload которого будет username
        
        // Claim - это пара ключ-значение, которая содержит информацию о пользователе

        var userRoles = _context.UserRoles.Where(u => u.UserNameRef == username)
            .Select(u => new { Role = u.RoleNameRef })
            .AsNoTracking();
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
        };

        foreach (var role in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role.Role));
        }

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


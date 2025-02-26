using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CRMSolution.Services.Classes;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly IUserRep _userRepository;
    private readonly ILogger<TokenService> _logger;

    public TokenService(IConfiguration config, IUserRep userRepository)
    {
        _config = config;
        _userRepository = userRepository;
    }

    public async Task<string> GetNameFromToken(string token)
    {
        _logger.LogInformation("Берем информацию из токена: {@Token}", token);
        var tokenHandler = new JwtSecurityTokenHandler();

        var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

        if (securityToken == null)
            throw new SecurityTokenException("Invalid token");

        var username = securityToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);

        return username.Value;
    }
    public async Task<string> CreateTokenAsync(string username)
    {
        _logger.LogInformation("Создаем новоый токен: {@Username}", username);
        var user = await _userRepository.FindByEmailAsync(username);

        if (user == null)
            throw new SecurityTokenException("User not found");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var securityToken = new JwtSecurityToken(
            issuer: _config["JWT:Issuer"],
            audience: _config["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
    
    public async Task<string> CreateEmailTokenAsync(string username)
    {
        _logger.LogInformation("Создаем токен для подтверждения мыла: {@Username}", username);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("JWT:EmailKey").Value));

        var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(3),
            issuer: _config.GetSection("JWT:Issuer").Value,
            audience: _config.GetSection("JWT:Audience").Value,
            signingCredentials: signingCred);

        string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return tokenString;
    }

    public async Task<bool> ValidateEmailTokenAsync(string token)
    {
        _logger.LogInformation("Проверка токена для подтверждения мыла: {@Token}", token);
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("JWT:EmailKey").Value));

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _config.GetSection("JWT:Issuer").Value,
            ValidAudience = _config.GetSection("JWT:Audience").Value,
            IssuerSigningKey = securityKey,
            ClockSkew = TimeSpan.Zero
        };


        var principal = await tokenHandler.ValidateTokenAsync(token, validationParameters);
        return principal.IsValid;
    }

    public async Task<string> CreateResetPasswordTokenAsync(string username)
    {
        _logger.LogInformation("Создаем токен для сброса пароля: {@Username}", username);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Exp, DateTime.UtcNow.AddMinutes(5).ToString())
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:EmailKey"]));
        var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(60),
            issuer: _config["JWT:Issuer"],
            audience: _config["JWT:Audience"],
            signingCredentials: signingCred);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
    
    public async Task<bool> ValidateChangePasswordTokenAsync(string token)
    {
        _logger.LogInformation("Проверка токена для сброса пароля: {@Token}", token);
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:EmailKey"]));

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _config["JWT:Issuer"],
            ValidAudience = _config["JWT:Audience"],
            IssuerSigningKey = securityKey,
            ClockSkew = TimeSpan.Zero, 

            LifetimeValidator = (notBefore, expires, securityToken, parameters) =>
            {
                return expires.HasValue && expires.Value > DateTime.UtcNow;
            }
        };

        try
        {
            var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
            return true;
        }
        catch (SecurityTokenException)
        {
            return false;
        }
    }
}
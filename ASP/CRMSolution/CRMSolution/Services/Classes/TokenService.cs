using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CRMSolution.Services.Classes;

public class TokenService
{
    private readonly IConfiguration _config;
    private readonly CRMContext _context;

    public TokenService(IConfiguration config, CRMContext context)
    {
        _config = config;
        _context = context;
    }

    public async Task<string> CreateTokenAsync(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

        if (user == null)
            throw new SecurityTokenException("User not found");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role.ToString()) // Используем enum
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
}
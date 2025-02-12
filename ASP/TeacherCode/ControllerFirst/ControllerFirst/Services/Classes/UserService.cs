using AutoMapper;
using BCrypt.Net;
using ControllerFirst.Contexts;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Data.Models;

using ControllerFirst.Services.Interfaces;
using static BCrypt.Net.BCrypt;

namespace ControllerFirst.Services.Classes;

public class UserService : IUserService
{
    private readonly ITokenService _tokenService;
    private readonly AuthContext _context;
    private readonly IMapper _mapper;

    public UserService(AuthContext context, IMapper mapper, ITokenService tokenService)
    {
        _context = context;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        var user = _mapper.Map<User>(request);

        user.Password = HashPassword(user.Password);
        
        await _context.Users.AddAsync(user);
        
        await _context.SaveChangesAsync();
    }
    
    public async Task<string> LoginAsync(LoginRequest request)
    {
        var token = await _tokenService.CreateTokenAsync(request);

        return token;
    }
    
    
}
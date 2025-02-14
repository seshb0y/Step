using AutoMapper;
using ControllerFirst.Contexts;
using ControllerFirst.Data.Models;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Services.Interfaces;
using static BCrypt.Net.BCrypt;

namespace ControllerFirst.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly AuthContext _context;

    public AccountService(IMapper mapper, AuthContext authContext)
    {
        _mapper = mapper;
        _context = authContext;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        var user = _mapper.Map<User>(request);

        user.Password = HashPassword(user.Password);
        
        await _context.Users.AddAsync(user);
        
        await _context.SaveChangesAsync();
        
        await _context.UserRoles.AddAsync(new UserRole
        {
            UserNameRef = user.UserName,
            RoleNameRef = "AppUser"
        });
        
        await _context.SaveChangesAsync();
    }
}
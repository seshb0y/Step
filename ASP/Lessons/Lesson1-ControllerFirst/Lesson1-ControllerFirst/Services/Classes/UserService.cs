using AutoMapper;
using ControllerFirst.Contexts;
using ControllerFirst.Models;
using Lesson1_ControllerFirst.Services.Interface;
using Microsoft.AspNetCore.Identity.Data;
using RegisterRequest = Lesson1_ControllerFirst.DTO.Requests.RegisterRequest;
using static BCrypt.Net.BCrypt;
namespace Lesson1_ControllerFirst.Services.Classes;

public class UserService(AuthContext context, IMapper mapper) : IUserService
{
    private readonly AuthContext _context = context;
    private readonly IMapper _mapper = mapper;


    public async Task RegisterAsync(RegisterRequest request)
    {
        var user = _mapper.Map<User>(request);
        
        user.Password = HashPassword(user.Password);
        
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public Task<User> LoginAsync(LoginRequest request)
    {
        throw new NotImplementedException();
    }
}
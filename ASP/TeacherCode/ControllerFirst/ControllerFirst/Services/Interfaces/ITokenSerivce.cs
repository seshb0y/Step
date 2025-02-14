using System.Security.Claims;
using ControllerFirst.DTO.Requests;

namespace ControllerFirst.Services.Interfaces;

public interface ITokenService
{
    public Task<string> CreateTokenAsync(string username);
}
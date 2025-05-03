using Grpc.Core;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Grpc.Users;
using CRMSolution.Services.Interfaces;
using Microsoft.Extensions.Logging;

public class UserGrpcService : UserService.UserServiceBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserGrpcService> _logger;

    public UserGrpcService(IUserService userService, ILogger<UserGrpcService> logger)
    {
        
        _userService =  userService;
        _logger = logger;
    }

    public override async Task<GetUserByIdResponse> GetUserById(GetUserByIdRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по ID: {UserId}", request.Id);

        var user = await _userService.GetByIdAsync(request.Id);
        
        return new GetUserByIdResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = (int)user.Role
        };
    }

    public override async Task<FindUserResponse> FindUser(FindUserRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по Email: {Email}", request.Email);
        
        var user = await _userService.FindUser(request);
    
        return new FindUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = (int)user.Role,
            IsEmailConfirmed = user.IsEmailConfirmed,
        };
    }
}
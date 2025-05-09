using Grpc.Core;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Grpc.Users;
using CRMSolution.Services.Interfaces;
using Microsoft.Extensions.Logging;
using UserRole = CRMSolution.Grpc.Users.UserRole;

public class UserGrpcService : UserService.UserServiceBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserGrpcService> _logger;

    public UserGrpcService(IUserService userService, ILogger<UserGrpcService> logger)
    {
        
        _userService =  userService;
        _logger = logger;
    }

    public override async Task<GetUserResponse> GetUserById(GetUserByIdRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по ID: {UserId}", request.Id);

        var user = await _userService.GetByIdAsync(request.Id);
        
        return new GetUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = (UserRole)user.Role
        };
    }

    public override async Task<GetUserResponse> FindUser(GetUserByEmailRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по Email: {Email}", request.Email);
        
        var user = await _userService.FindUser(request);
    
        return new GetUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            IsEmailConfirmed = user.IsEmailConfirmed,
        };
    }

    public override async Task<GetUsersByIdsResponse> GetUsersByIds(GetUsersByIdsRequest request,
        ServerCallContext context)
    {
        return await _userService.GetUsersByIds(request);
    }

    public override async Task<GetAllUsersResponse> GetAllUsers(GetAllUsersRequest request, ServerCallContext context)
    {
        return await _userService.GetAllUsers(request.Sort);
    }
}
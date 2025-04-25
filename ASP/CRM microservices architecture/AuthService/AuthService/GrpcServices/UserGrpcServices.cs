using CRMSolution.DTO.Requests;
using Grpc.Core;
using CRMSolution.Grpc;
using CRMSolution.Services.Interfaces;

public class UserGrpcService : UserService.UserServiceBase
{
    private readonly IUserService _userService;

    public UserGrpcService(IUserService userService)
    {
        _userService = userService;
    }

    public override async Task<UserResponse> GetUserById(GetUserByIdRequest request, ServerCallContext context)
    {
        var user = await _userService.FindUser(new FindUserRequest(request.Id));
        
        return new UserResponse
        {
            Id = user.Id.ToString(),
            Username = user.Username,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }
}
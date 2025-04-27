using Grpc.Core;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Grpc.Users; // только это подключение
using Microsoft.Extensions.Logging;

public class UserGrpcService : UserService.UserServiceBase
{
    private readonly IUserRep _userRepository;
    private readonly ILogger<UserGrpcService> _logger;

    public UserGrpcService(IUserRep userRepository, ILogger<UserGrpcService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public override async Task<GetUserByIdResponse> GetUserById(GetUserByIdRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по ID: {UserId}", request.Id);

        var user = await _userRepository.GetById(request.Id);

        if (user == null)
        {
            _logger.LogWarning("Пользователь с ID {UserId} не найден.", request.Id);
            return new GetUserByIdResponse();
        }

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

        var user = await _userRepository.FindByEmailAsync(request.Email);

        if (user == null)
        {
            _logger.LogWarning("Пользователь с email {Email} не найден.", request.Email);
            return new FindUserResponse();
        }

        return new FindUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = (int)user.Role
        };
    }
}
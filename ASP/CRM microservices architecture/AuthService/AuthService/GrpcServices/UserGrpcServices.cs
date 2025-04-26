using Grpc.Core;
using CRMSolution.Grpc; 
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.DTO.Requests;
using Microsoft.Extensions.Logging;
using FindUserRequest = CRMSolution.Grpc.FindUserRequest;

public class UserGrpcService : UserService.UserServiceBase
{
    private readonly IUserRep _userRepository;
    private readonly ILogger<UserGrpcService> _logger;

    public UserGrpcService(IUserRep userRepository, ILogger<UserGrpcService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public override async Task<UserResponse> GetUserById(GetUserByIdRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по ID: {UserId}", request.Id);

        var user = await _userRepository.GetById(int.Parse(request.Id)); // string -> int

        if (user == null)
        {
            _logger.LogWarning("Пользователь с ID {UserId} не найден.", request.Id);
            return new UserResponse(); // Возвращаем пустой объект
        }

        return new UserResponse
        {
            Id = user.Id.ToString(),
            Username = user.Username,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }
    
    public override async Task<FindUserResponse> FindUser(FindUserRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск пользователя по Email: {Email}", request.Email);

        var user = await _userRepository.FindByEmailAsync(request.Email);

        if (user == null)
        {
            _logger.LogWarning("Пользователь с email {Email} не найден.", request.Email);
            return new FindUserResponse(); // Пустой объект если пользователь не найден
        }

        return new FindUserResponse
        {
            Id = user.Id.ToString(),
            Username = user.Username,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }

}
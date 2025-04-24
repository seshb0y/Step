using AutoMapper;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.DTO.Requests;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace CRMSolution.Services.Classes;

public class UserService : IUserService
{
    private readonly IUserRep _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    
    public UserService(IUserRep userRepository, IMapper mapper, ILogger<UserService> logger, IHubContext<NotificationHub> notificationHub)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
        _notificationHub = notificationHub;
    }
    
    // public async Task<User> CreateUser(CreateUserRequest request)
    // {
    //     _logger.LogInformation("Создаем нового юзера: {@Request}", request);
    //     User user = _mapper.Map<User>(request);
    //     await _userRepository.UserRep.AddAsync(user);
    //     await _userRepository.SaveChangesAsync();
    //     return await _userRepository.UserRep.FindByEmailAsync(request.email);
    // }

    public async Task<User> ChangeUserData(ChangeUserDataRequest request)
    {
        _logger.LogInformation("Изменяем данные юзера: {@Request}", request);
        User user = await _userRepository.FindByEmailAsync(request.oldEmail);
        user = _mapper.Map(request, user);
        _userRepository.Update(user);
        await _userRepository.SaveChangesAsync();
        await _notificationHub.Clients.All.SendAsync("UserUpdated", new
        {
            user.Id,
            user.Email,
            user.Username,
            user.CreatedAt,
            user.Role,
        });
        return await _userRepository.FindByEmailAsync(request.newEmail);
    }
    
    public async Task DeleteUser(DeleteUserRequest request)
    {
        _logger.LogInformation("Удаляем юзера: {@Request}", request);
        User user = await _userRepository.FindByEmailAsync(request.email);
        _userRepository.Delete(user);
        await _userRepository.SaveChangesAsync();
        await _notificationHub.Clients.All.SendAsync("UserDeleted", new
        {
            user.Id,
        });
    }

    public async Task<FindUserReponse> FindUser(FindUserRequest request)
    {
        _logger.LogInformation("Поиск юзера: {@Request}", request);
        var userEntity = await _userRepository.FindByEmailAsync(request.email);
        FindUserReponse user =  _mapper.Map<FindUserReponse>(userEntity);
        _logger.LogInformation("Юзер найден: {ClientId}", request.email);
        return user;
    }

    public async Task<GetAllUsersResponse> GetAllUsers(SortUsersRequest sortUsersRequest)
    {
        var users = await _userRepository.GetAllAsync();
        return _mapper.Map<GetAllUsersResponse>(users);
    }
    
    // public async Task<List<ClientWithOrdersAndTasksResponse>> GetClientsWithOrdersAndTasks(HttpContext httpContext)
    // {
    //     var username = await _tokenService.GetNameFromCookies(httpContext);
    //
    //     var orders = await _clientRepository.ClientRep.GetOrdersByUsername(username);
    //
    //     var clients = await _clientRepository.ClientRep.GetClientsByOrdersAsync(orders);
    //
    //     return _mapper.Map<List<ClientWithOrdersAndTasksResponse>>(clients);
    // }
}
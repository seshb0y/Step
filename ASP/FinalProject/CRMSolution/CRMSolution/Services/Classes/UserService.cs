using AutoMapper;
using ControllerFirst.DTO.Responses;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace CRMSolution.Services.Classes;

public class UserService : IUserService
{
    private readonly IUnitOfWork _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    
    public UserService(IUnitOfWork userRepository, IMapper mapper, ILogger<UserService> logger, IHubContext<NotificationHub> notificationHub)
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
        User user = await _userRepository.UserRep.FindByEmailAsync(request.oldEmail);
        user = _mapper.Map(request, user);
        _userRepository.UserRep.Update(user);
        await _userRepository.SaveChangesAsync();
        await _notificationHub.Clients.All.SendAsync("UserUpdated", new
        {
            user.Id,
            user.Email,
            user.Username,
            user.CreatedAt,
            user.Role,
        });
        return await _userRepository.UserRep.FindByEmailAsync(request.newEmail);
    }
    
    public async Task DeleteUser(DeleteUserRequest request)
    {
        _logger.LogInformation("Удаляем юзера: {@Request}", request);
        User user = await _userRepository.UserRep.FindByEmailAsync(request.email);
        _userRepository.UserRep.Delete(user);
        await _userRepository.SaveChangesAsync();
        await _notificationHub.Clients.All.SendAsync("UserDeleted", new
        {
            user.Id,
        });
    }

    public async Task<FindUserReponse> FindUser(FindUserRequest request)
    {
        _logger.LogInformation("Поиск юзера: {@Request}", request);
        FindUserReponse user = await _userRepository.UserRep.GetUsersTasksOrdersClientsAsync(request.email);
        _logger.LogInformation("Юзер найден: {ClientId}", request.email);
        return user;
    }

    public async Task<GetAllUsersResponse> GetAllUsers(SortUsersRequest sortUsersRequest)
    {
        var users = await _userRepository.UserRep.GetLowInfoUsersList(sortUsersRequest);
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
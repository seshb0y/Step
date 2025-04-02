using AutoMapper;
using ControllerFirst.DTO.Responses;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<UserService> _logger;
    private readonly INotificationService _notificationService;
    
    public UserService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UserService> logger, INotificationService notificationService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
        _notificationService = notificationService;
    }
    
    public async Task CreateUser(CreateUserRequest request)
    {
        _logger.LogInformation("Создаем нового пользователя: {@Request}", request);
        var user = _mapper.Map<User>(request);
        await _unitOfWork.UserRep.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        await _notificationService.NotifyUserCreated(user);
    }

    public async Task UpdateUser(UpdateUserRequest request)
    {
        _logger.LogInformation("Обновляем пользователя: {@Request}", request);
        var user = await _unitOfWork.UserRep.GetByIdAsync(request.Id);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {request.Id} not found");
        }

        _mapper.Map(request, user);
        _unitOfWork.UserRep.Update(user);
        await _unitOfWork.SaveChangesAsync();

        await _notificationService.NotifyUserUpdated(user);
    }

    public async Task DeleteUser(string userId)
    {
        _logger.LogInformation("Удаляем пользователя: {UserId}", userId);
        var user = await _unitOfWork.UserRep.GetByIdAsync(userId);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {userId} not found");
        }

        _unitOfWork.UserRep.Delete(user);
        await _unitOfWork.SaveChangesAsync();

        await _notificationService.NotifyUserDeleted(user);
    }

    public async Task ChangeUserRole(string userId, string newRole)
    {
        _logger.LogInformation("Изменяем роль пользователя: {UserId} на {NewRole}", userId, newRole);
        var user = await _unitOfWork.UserRep.GetByIdAsync(userId);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {userId} not found");
        }

        user.Role = newRole;
        _unitOfWork.UserRep.Update(user);
        await _unitOfWork.SaveChangesAsync();

        await _notificationService.NotifyUserRoleChanged(user, newRole);
    }

    public async Task<User> ChangeUserData(ChangeUserDataRequest request)
    {
        _logger.LogInformation("Изменяем данные юзера: {@Request}", request);
        User user = await _unitOfWork.UserRep.FindByEmailAsync(request.oldEmail);
        user = _mapper.Map(request, user);
        _unitOfWork.UserRep.Update(user);
        await _unitOfWork.SaveChangesAsync();
        return await _unitOfWork.UserRep.FindByEmailAsync(request.newEmail);
    }

    public async Task<FindUserReponse> FindUser(FindUserRequest request)
    {
        _logger.LogInformation("Поиск юзера: {@Request}", request);
        FindUserReponse user = await _unitOfWork.UserRep.GetUsersTasksOrdersClientsAsync(request.email);
        // if (user == null)
        // {
        //     _logger.LogWarning("Юзер с email {Email} не найден",request.email);
        //     throw new KeyNotFoundException($"Client with email {request.email} not found");
        // }
        _logger.LogInformation("Юзер найден: {ClientId}", request.email);
        return user;
    }

    public async Task<GetAllUsersResponse> GetAllUsers(SortUsersRequest sortUsersRequest)
    {
        var users = await _unitOfWork.UserRep.GetLowInfoUsersList(sortUsersRequest);
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
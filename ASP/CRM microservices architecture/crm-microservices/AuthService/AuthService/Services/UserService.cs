using AutoMapper;
using ClientService.Helpers;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.DTO.Requests;
using CRMSolution.Grpc.Client;
using CRMSolution.Grpc.Orders;
using CRMSolution.Grpc.Tasks;
using CRMSolution.Grpc.Users;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.SignalR;
using GrpcTaskStatus = CRMSolution.Grpc.Users.GrpcTaskStatus;
using TaskInfo = CRMSolution.Grpc.Users.TaskInfo;
using OrderStatus = CRMSolution.Grpc.Users.OrderStatus;
using UserRole = CRMSolution.Grpc.Users.UserRole;

namespace CRMSolution.Services.Classes;

public class UserService : IUserService
{
    private readonly IUserRep _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly OrderGrpcService.OrderGrpcServiceClient _orderGrpcService;
    private readonly TaskGrpcService.TaskGrpcServiceClient _taskGrpcService;
    private readonly ClientGrpcService.ClientGrpcServiceClient _clientGrpcService;
    private readonly CacheHelper _cacheHelper;
    
    public UserService(IUserRep userRepository, IMapper mapper, ILogger<UserService> logger, IHubContext<NotificationHub> notificationHub
    , OrderGrpcService.OrderGrpcServiceClient orderGrpcService,  TaskGrpcService.TaskGrpcServiceClient taskGrpcService,
    ClientGrpcService.ClientGrpcServiceClient clientGrpcService, CacheHelper cacheHelper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
        _notificationHub = notificationHub;
        _orderGrpcService = orderGrpcService;
        _taskGrpcService = taskGrpcService;
        _clientGrpcService = clientGrpcService;
        _cacheHelper = cacheHelper;
    }
    
    private async Task ClearClientsCacheAsync(string username)
    {
        string[] sortFields = { "userid", "username", "email", "role", "isemailconfirmed", "createdat" };
        foreach (var field in sortFields)
        {
            await _cacheHelper.RemoveAsync($"users:all:{field}:true");
            await _cacheHelper.RemoveAsync($"users:all:{field}:false");
        }
        await _cacheHelper.RemoveAsync("dashboard:data");
        await _cacheHelper.RemoveAsync($"user:current:{username}");
    }
    
    public async Task<ChangeUserDataResponse> ChangeUserData(ChangeUserDataRequest request)
    {
        _logger.LogInformation("Изменяем данные юзера: {@Request}", request);
        User user = await _userRepository.FindByEmailAsync(request.OldEmail);
        user = _mapper.Map(request, user);
        _userRepository.Update(user);
        await _userRepository.SaveChangesAsync();
        _logger.LogInformation("Юзер изменен: {@User}", user);
        await ClearClientsCacheAsync(user.Username);
        return _mapper.Map<ChangeUserDataResponse>(user);
    }
    
    public async Task<DeleteUserResponse> DeleteUser(DeleteUserRequest request)
    {
        _logger.LogInformation("Удаляем юзера: {@Request}", request);
        User user = await _userRepository.FindByEmailAsync(request.Email);
        _userRepository.Delete(user);
        await _userRepository.SaveChangesAsync();
        _logger.LogInformation("Юзер удален: {@User}", user);
        await ClearClientsCacheAsync(user.Username);
        return new DeleteUserResponse
        {
            UserId = user.UserId
        };
    }

    public async Task<GetUserResponse> GetUserByUsername(GetUserByEmailRequest request)
    {
        User? user;
        if (request.Email.Contains("@"))
        {
            user = await _userRepository.FindByEmailAsync(request.Email);
        }
        else
        {
            user = await _userRepository.FindByNameAsync(request.Email);
        }
        return new GetUserResponse
        {
            Email = user.Email,
            Id = user.UserId,
            Username = user.Username,
            IsEmailConfirmed = user.IsEmailConfirmed,
            Role = (UserRole)user.Role,
        };
    }
    public async Task<FindUserResponse> FindUser(GetUserByEmailRequest request)
    {
        _logger.LogInformation("Сбор расширенной информации о пользователе: {Email}", request.Email);
        var user = await _userRepository.FindByEmailAsync(request.Email);
        if (user == null) return null;

        var orderResponse = await _orderGrpcService.GetOrdersByUserIdsAsync(
            new GetOrdersByUserIdsRequest { UserIds = { user.UserId } });
        var orders = orderResponse.Orders;

        var taskResponse = await _taskGrpcService.GetTasksByUserIdsAsync(
            new GetTasksByUserIdsRequest { UserIds = { user.UserId } });
        var tasks = taskResponse.Tasks;

        var clientIds = orders.Select(o => o.ClientId).Distinct().ToList();

        var clientResponse = await _clientGrpcService.GetClientsByIdsAsync(
            new GetClientsByIdsRequest { Ids = { clientIds } });

        var clientNames = clientResponse.Clients.Select(c => c.Name);

        var response = new FindUserResponse();
        response.Orders.AddRange(orders.Select(o => new FindUserOrdersResponse
        {
            OrderId = o.Id.ToString(),
            TotalAmount = o.TotalAmount,
            Status = o.Status.ToString()
        }));

        response.Tasks.AddRange(tasks.Select(t => new FindUserTasksResponse
        {
            TaskId = t.Id.ToString(),
            Title = t.Title,
            Status = t.Status.ToString()
        }));

        response.Clients.AddRange(clientNames.Select(name => new FindUserClientsResponse { ClientName = name }));

        _logger.LogInformation("Информация о пользователе собрана: {User}", response);
        return response;
    }
    public async Task<GetAllUsersResponse> GetAllUsers(SortUsersRequest sortUsersRequest)
    {
        _logger.LogInformation("Получение всех пользователей с сортировкой: {@Sort}", sortUsersRequest);
        // string cacheKey = $"users:all:{sortUsersRequest.SortBy}:{sortUsersRequest.Descending}";
        // var cache = await _cacheHelper.GetAsync<GetAllUsersResponse>(cacheKey);
        // if(cache != null) return cache;
        var users = await _userRepository.GetAllAsync();
        users = sortUsersRequest.SortBy?.ToLower() switch
        {
            "userid" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.UserId).ToList() : users.OrderBy(u => u.UserId).ToList(),
            "username" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Username).ToList() : users.OrderBy(u => u.Username).ToList(),
            "email" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Email).ToList() : users.OrderBy(u => u.Email).ToList(),
            "role" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Role).ToList() : users.OrderBy(u => u.Role).ToList(),
            "isemailconfirmed" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.IsEmailConfirmed).ToList() : users.OrderBy(u => u.IsEmailConfirmed).ToList(),
            "createdat" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.CreatedAt).ToList() : users.OrderBy(u => u.CreatedAt).ToList(),
            _ => users
        };

        var userIds = users.Select(u => u.UserId).ToList();

        var taskResponse = await _taskGrpcService.GetTasksByUserIdsAsync(new GetTasksByUserIdsRequest { UserIds = { userIds } });
        var orderResponse = await _orderGrpcService.GetOrdersByUserIdsAsync(new GetOrdersByUserIdsRequest { UserIds = { userIds } });

        var tasksByUser = taskResponse.Tasks.GroupBy(t => t.UserId).ToDictionary(g => g.Key, g => g.ToList());
        var ordersByUser = orderResponse.Orders.GroupBy(o => o.UserId).ToDictionary(g => g.Key, g => g.ToList());

        var response = new GetAllUsersResponse();

        foreach (var user in users)
        {
            var userInfo = new UserInfo
            {
                UserId = user.UserId,
                Username = user.Username,
                Email = user.Email,
                UserRole = (UserRole)user.Role,
                IsEmailConfirmed = user.IsEmailConfirmed,
                CreatedAt = Timestamp.FromDateTime(user.CreatedAt),
            };

            if (tasksByUser.TryGetValue(user.UserId, out var userTasks))
            {
                userInfo.Tasks.AddRange(userTasks.Select(t => new TaskInfo
                {
                    TaskId = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    TaskStatus = (GrpcTaskStatus)t.Status,
                    DueDate = t.DueDate
                }));
            }

            if (ordersByUser.TryGetValue(user.UserId, out var userOrders))
            {
                userInfo.Orders.AddRange(userOrders.Select(o => new OrderInfo
                {
                    OrderId = o.Id,
                    TotalAmount = o.TotalAmount,
                    OrderStatus = (OrderStatus)o.Status
                }));
            }

            response.Users.Add(userInfo);
        }

        _logger.LogInformation("Пользователи успешно получены: {Count}", response.Users.Count);
        // await _cacheHelper.SetAsync(cacheKey, response, TimeSpan.FromHours(1));
        return response;
    }

    public async Task<User> GetByIdAsync(int userId)
    {
        _logger.LogInformation("Получение пользователя по ID: {UserId}", userId);
        return await _userRepository.GetById(userId);
    }

    public async Task<GetUsersByIdsResponse> GetUsersByIds(GetUsersByIdsRequest request)
    {
        _logger.LogInformation("Получение пользователей по ID: {@Ids}", request.Ids);
        var ids = request.Ids.ToList();
        var users = await _userRepository.GetUsersByIdsAsync(ids);
        var sortedUsers = ids.Select(id => users.FirstOrDefault(u => u.UserId == id)).ToList();
        var usernames = sortedUsers.Select(u => u?.Username ?? "Unknown").ToList();
        return new GetUsersByIdsResponse { Usernames = { usernames } };
    }
}
using AutoMapper;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.DTO.Requests;
using CRMSolution.Grpc.Orders;
using CRMSolution.Grpc.Tasks;
using CRMSolution.Grpc.Users;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using GrpcTaskStatus = CRMSolution.Grpc.Users.GrpcTaskStatus;
using TaskInfo = CRMSolution.Grpc.Users.TaskInfo;
using OrderStatus = CRMSolution.Grpc.Users.OrderStatus;

namespace CRMSolution.Services.Classes;

public class UserService : IUserService
{
    private readonly IUserRep _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserService> _logger;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly OrderGrpcService.OrderGrpcServiceClient _orderGrpcService;
    private readonly TaskGrpcService.TaskGrpcServiceClient _taskGrpcService;
    
    public UserService(IUserRep userRepository, IMapper mapper, ILogger<UserService> logger, IHubContext<NotificationHub> notificationHub
    , OrderGrpcService.OrderGrpcServiceClient orderGrpcService,  TaskGrpcService.TaskGrpcServiceClient taskGrpcService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
        _notificationHub = notificationHub;
        _orderGrpcService = orderGrpcService;
        _taskGrpcService = taskGrpcService;
    }
    
    // public async Task<User> CreateUser(CreateUserRequest request)
    // {
    //     _logger.LogInformation("Создаем нового юзера: {@Request}", request);
    //     User user = _mapper.Map<User>(request);
    //     await _userRepository.UserRep.AddAsync(user);
    //     await _userRepository.SaveChangesAsync();
    //     return await _userRepository.UserRep.FindByEmailAsync(request.email);
    // }

    public async Task<ChangeUserDataResponse> ChangeUserData(ChangeUserDataRequest request)
    {
        _logger.LogInformation("Изменяем данные юзера: {@Request}", request);
        User user = await _userRepository.FindByEmailAsync(request.OldEmail);
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
        return _mapper.Map<ChangeUserDataResponse>(user);
    }
    
    public async Task DeleteUser(DeleteUserRequest request)
    {
        _logger.LogInformation("Удаляем юзера: {@Request}", request);
        User user = await _userRepository.FindByEmailAsync(request.Email);
        _userRepository.Delete(user);
        await _userRepository.SaveChangesAsync();
        await _notificationHub.Clients.All.SendAsync("UserDeleted", new
        {
            user.Id,
        });
    }

    public async Task<GetUserResponse> FindUser(GetUserByEmailRequest request)
    {
        _logger.LogInformation("Поиск юзера: {@Request}", request);
        var userEntity = await _userRepository.FindByNameAsync(request.Email);
        if (request.OrderId != 0)
        {
            userEntity.OrderId = request.OrderId;
            await _userRepository.SaveChangesAsync();
        }
        GetUserResponse user =  _mapper.Map<GetUserResponse>(userEntity);
        _logger.LogInformation("Юзер найден: {ClientId}", request.Email);
        return user;
    }

    public async Task<GetAllUsersResponse> GetAllUsers(SortUsersRequest sortUsersRequest)
    {
        var users = await _userRepository.GetAllAsync();
        users = sortUsersRequest.SortBy?.ToLower() switch
        {
            "id" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Id).ToList() : users.OrderBy(u => u.Id).ToList(),
            "username" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Username).ToList() : users.OrderBy(u => u.Username).ToList(),
            "email" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Email).ToList() : users.OrderBy(u => u.Email).ToList(),
            "role" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.Role).ToList() : users.OrderBy(u => u.Role).ToList(),
            "isemailconfirmed" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.IsEmailConfirmed).ToList() : users.OrderBy(u => u.IsEmailConfirmed).ToList(),
            "createdat" => sortUsersRequest.Descending ? users.OrderByDescending(u => u.CreatedAt).ToList() : users.OrderBy(u => u.CreatedAt).ToList(),
            _ => users
        };

        var userIds = users.Select(u => u.Id).ToList();

        var taskResponse = await _taskGrpcService.GetTasksByUserIdsAsync(new GetTasksByUserIdsRequest { UserIds = { userIds } });
        var orderResponse = await _orderGrpcService.GetOrdersByUserIdsAsync(new GetOrdersByUserIdsRequest { UserIds = { userIds } });
        
        var tasksByUser = taskResponse.Tasks.GroupBy(t => t.UserId)
            .ToDictionary(g => g.Key, g => g.ToList());
        var ordersByUser = orderResponse.Orders.GroupBy(o => o.UserId)
            .ToDictionary(g => g.Key, g => g.ToList());
        
        var response = new GetAllUsersResponse();

        foreach (var user in users)
        {
            var userInfo = new UserInfo
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = (CRMSolution.Grpc.Users.UserRole)user.Role,
                IsEmailConfirmed = user.IsEmailConfirmed,
            };

            if (tasksByUser.TryGetValue(user.Id, out var userTasks))
            {
                userInfo.Tasks.AddRange(userTasks.Select<TaskWithUserId, TaskInfo>(t => new TaskInfo
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = (GrpcTaskStatus)t.Status,
                    DueDate = t.DueDate
                }));

            }

            // добавь заказы
            if (ordersByUser.TryGetValue(user.Id, out var userOrders))
            {
                userInfo.Orders.AddRange(userOrders.Select(o => new OrderInfo
                {
                    Id = o.Id,
                    TotalAmount = o.TotalAmount,
                    Status = (OrderStatus)o.Status
                }));
            }

            response.Users.Add(userInfo);
        }
        

        return response;
    }

    public async Task<User> GetByIdAsync(int userId)
    {
        return await _userRepository.GetById(userId);
    }

    public async Task<GetUsersByIdsResponse> GetUsersByIds(GetUsersByIdsRequest request)
    {
        var ids = request.Ids.ToList();
        
        var users = await _userRepository.GetUsersByIdsAsync(ids);
        var usernames = users.Select(u => u.Username).ToList();

        return new GetUsersByIdsResponse
        {
            Usernames = { usernames } 
        };
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
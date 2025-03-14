using AutoMapper;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;

namespace CRMSolution.Data.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterRequest, User>()
            .ForMember(dest => dest.UserName, opt =>
                opt.MapFrom(src => src.Username))
            .ForMember(dest => dest.Email, opt =>
                opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.PasswordHash, opt =>
                opt.MapFrom(src => src.Password));

        CreateMap<User, GetCurrentUserResponse>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.Id))
            .ForMember(dest => dest.Username, opt => opt
                .MapFrom(src => src.UserName))
            .ForMember(dest => dest.Role, opt => opt
                .MapFrom(src => src.Role));
        
        CreateMap<User, OrderDetailsUserResponse>()
            .ForMember(dest => dest.Username, opt => opt.
                MapFrom(src => src.UserName));

        CreateMap<CreateUserRequest, User>()
            .ForMember(dest => dest.UserName, opt => opt
                .MapFrom(src => src.username))
            .ForMember(dest => dest.Email, opt => opt
                .MapFrom(src => src.email))
            .ForMember(dest => dest.PasswordHash, opt => opt
                .MapFrom(src => src.password));

        CreateMap<ChangeUserDataRequest, User>()
            .ForMember(dest => dest.UserName, opt => opt
                .MapFrom(src => src.username))
            .ForMember(dest => dest.Email, opt => opt
                .MapFrom(src => src.newEmail))
            .ForMember(dest => dest.PasswordHash, opt => opt
                .MapFrom(src => src.password))
            .ForMember(dest => dest.Role, opt => opt
                .MapFrom(src => src.role));

        CreateMap<User, FindUserReponse>()
            .ForMember(dest => dest.clients, opt => opt
                .MapFrom(src => src.ClientUsers.Select(c => new FindUserClientsResponse
                {
                    clientName = c.Client.Name
                }).ToArray()))
            .ForMember(dest => dest.orders, opt => opt
                .MapFrom(src => src.UserOrders.Select(o => new FindUserOrdersResponse
                {
                    orderId = o.OrderId.ToString(),
                    status = o.Order.Status,
                }).ToArray()))
            .ForMember(dest => dest.tasks, opt => opt
                .MapFrom(src => src.UserTasks.Select(t => new FindUserTasksResponse
                {
                    taskId = t.TaskId.ToString(),
                    status = (TaskStatus)t.Task.Status
                }).ToArray()));
            
            
        CreateMap<User, GetAllUsersUserResponse>()
            .ForMember(dest => dest.UserId, opt => opt
                .MapFrom(src => src.Id))
            .ForMember(dest => dest.IsEmailConfirmed, opt => opt
                .MapFrom(src => src.IsEmailConfirmed))
            .ForMember(dest => dest.UserName, opt => opt
                .MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt
                .MapFrom(src => src.Email))
            .ForMember(dest => dest.UserRole, opt => opt
                .MapFrom(src => src.Role))
            .ForMember(dest => dest.Tasks, opt => opt
                .MapFrom(src => 
                src.UserTasks != null 
                    ? src.UserTasks.Select(t => new GetAllUsersTasksResponse
                    {
                        TaskId = t.TaskId.ToString(),
                        TaskStatus = (TaskStatus)t.Task.Status
                    }).ToList() 
                    : new List<GetAllUsersTasksResponse>()
            ))
            .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => 
                src.UserOrders != null 
                    ? src.UserOrders.Select(o => new GetAllUsersOrdersResponse
                    {
                        OrderId = o.OrderId.ToString(),
                        OrderStatus = o.Order.Status
                    }).ToList() 
                    : new List<GetAllUsersOrdersResponse>()
            ))
            .ForMember(dest => dest.Clients, opt => opt.MapFrom(src => 
                src.ClientUsers != null 
                    ? src.ClientUsers.Select(c => new GetAllUsersClientsResponse
                    {
                        ClientName = c.Client.Name
                    }).ToList()
                    : new List<GetAllUsersClientsResponse>()
            ));


        CreateMap<List<User>, GetAllUsersResponse>()
            .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src));

    }
}
using AutoMapper;
using CRMSolution.Data.Models;
using ControllerFirst.DTO.Responses;
using CRMSolution.DTO.Requests.Client;
using System.Linq;

namespace CRMSolution.Data.Mapping
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<CreateClientRequest, Client>()
                .ForMember(dest => dest.Name, opt => opt
                    .MapFrom(src => src.name))
                .ForMember(dest => dest.Address, opt => opt
                    .MapFrom(src => src.address))
                .ForMember(dest => dest.Email, opt => opt
                    .MapFrom(src => src.email))
                .ForMember(dest => dest.Phone, opt => opt
                    .MapFrom(src => src.phone));
            
            CreateMap<ChangeDataClientRequest, Client>()
                .ForMember(dest => dest.Name, opt => opt
                    .MapFrom(src => src.name))
                .ForMember(dest => dest.Address, opt => opt
                    .MapFrom(src => src.address))
                .ForMember(dest => dest.Email, opt => opt
                    .MapFrom(src => src.newEmail))
                .ForMember(dest => dest.Phone, opt => opt
                    .MapFrom(src => src.phone));
            
            CreateMap<Client, ClientWithOrdersAndTasksResponse>()
                .ForMember(dest => dest.Orders, opt => opt
                    .MapFrom(src => src.ClientOrders.Select(co => co.Order).ToList()));

            
            CreateMap<Order, KanbanOrderResponse>()
                .ForMember(dest => dest.OrderId, opt => opt
                    .MapFrom(src => src.Id))
                .ForMember(dest => dest.OrderStatus, opt => opt
                    .MapFrom(src => (int)src.Status)) // Приведение к int
                .ForMember(dest => dest.Tasks, opt => opt
                    .MapFrom(src => src.Tasks));


            
            CreateMap<Tasks, KanbanTaskResponse>()
                .ForMember(dest => dest.TaskId, opt => opt
                    .MapFrom(src => src.Id))
                .ForMember(dest => dest.Status, opt => opt
                    .MapFrom(src => src.Status.ToString()));

            
            CreateMap<Client, ClientWithOrdersAndTasksResponse>()
                .ForMember(dest => dest.CreatedAt, opt => opt
                    .MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.Orders, opt => opt
                    .MapFrom(src => src.ClientOrders.Select(co => co.Order).ToList()));

            CreateMap<Order, KanbanOrderResponse>()
                .ForMember(dest => dest.OrderId, opt => opt
                    .MapFrom(src => src.Id))
                .ForMember(dest => dest.OrderStatus, opt => opt
                    .MapFrom(src => src.Status)) 
                .ForMember(dest => dest.Tasks, opt => opt
                    .MapFrom(src => src.Tasks));


            CreateMap<Tasks, KanbanTaskResponse>();
            
            CreateMap<Order, OrderDetailsResponse>()
                .ForMember(dest => dest.Client, opt => opt
                    .MapFrom(src => src.ClientOrders.FirstOrDefault().Client)) 
                .ForMember(dest => dest.Users, opt => opt
                    .MapFrom(src => src.UserOrders.Select(uo => uo.User)));

            CreateMap<Client, ClientResponse>(); 
            CreateMap<User, OrderDetailsUserResponse>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username));

        }
    }
}

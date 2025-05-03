using AutoMapper;
using CRMSolution.Grpc.Orders;
using OrderService.Data.Models;
using OrderService.DTO.Requests;
using OrderService.DTO.Responses;

namespace OrderService.Data.Mapping;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<CreateOrderRequest, Order>()
            .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => (decimal)src.TotalAmount))
            .ForMember(dest => dest.Status, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.ClientId, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());
        
        CreateMap<HttpChangeOrderDataRequest, Order>()
            .ForMember(dest => dest.Status, opt => opt
                .MapFrom(src => src.status))
            .ForMember(dest => dest.TotalAmount, opt =>
                opt.MapFrom(src => src.totalAmount))
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.orderId));
        
        
        CreateMap<DeleteOrderRequest, Order>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.OrderId));
        
        CreateMap<FindOrderRequest, Order>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.orderId));
        
        // CreateMap<Order, OrderResponse>()
        //     .ForMember(dest => dest.ClientOrders, opt => opt
        //         .MapFrom(src => src.ClientOrders));
        //
        // CreateMap<ClientOrder, ClientOrderDto>()
        //     .ForMember(dest => dest.ClientId, opt => opt
        //         .MapFrom(src => src.ClientId))
        //     .ForMember(dest => dest.ClientName, opt => opt
        //         .MapFrom(src => src.Client.Name))
        //     .ForMember(dest => dest.ClientEmail, opt => opt
        //         .MapFrom(src => src.Client.Email))
        //     .ForMember(dest => dest.ClientPhone, opt => opt
        //         .MapFrom(src => src.Client.Phone))
        //     .ForMember(dest => dest.CreatedAt, opt => opt
        //         .MapFrom(src => src.Client.CreatedAt.ToString()))
        //     .ForMember(dest => dest.ClientAddress, opt => opt
        //         .MapFrom(src => src.Client.Address));
        //
        // CreateMap<Order, OrderDetailsResponse>()
        //     .ForMember(dest => dest.Client, opt => opt
        //         .MapFrom(src => src.ClientOrders.FirstOrDefault().Client))
        //     .ForMember(dest => dest.CallRecordingUrl, opt => opt
        //         .MapFrom(src => src.CallRecordings.Select(cr => cr.Url).ToList()))
        //     .ForMember(dest => dest.Users, opt => opt
        //         .MapFrom(src => src.UserOrders.Select(uo => uo.User)));
        //
        //
        //
        // CreateMap<User, OrderDetailsUserResponse>()
        //     .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username));
        //
        // CreateMap<Client, ClientResponse>();
        // CreateMap<Tasks, OrderDetailsTaskResponse>()
        //     .ForMember(dest => dest.Status, opt => opt
        //         .MapFrom(src => src.Status));
    }
}
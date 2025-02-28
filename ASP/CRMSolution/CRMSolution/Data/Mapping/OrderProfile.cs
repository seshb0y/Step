using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;

namespace CRMSolution.Data.Mapping;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<CreateOrderRequest, Order>()
            .ForMember(dest => dest.TotalAmount, opt =>
                opt.MapFrom(src => src.totalAmount));
        
        CreateMap<ChangeOrderDataRequest, Order>()
            .ForMember(dest => dest.TotalAmount, opt =>
                opt.MapFrom(src => src.totalAmount))
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.orderId));
        
        CreateMap<DeleteOrderRequest, Order>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.orderId));
        
        CreateMap<FindOrderRequest, Order>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.orderId));
    }
}
using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Client;

namespace CRMSolution.Data.Mapping;

public class ClientProfile : Profile
{
    public ClientProfile()
    {
        CreateMap<CreateClientRequest, Client>()
            .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.name))
            .ForMember(dest => dest.Address, opt =>
                opt.MapFrom(src => src.address))
            .ForMember(dest => dest.Email, opt =>
                opt.MapFrom(src => src.email))
            .ForMember(dest => dest.Phone, opt =>
                opt.MapFrom(src => src.phone));

        CreateMap<ChangeDataClientRequest, Client>()
            .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.name))
            .ForMember(dest => dest.Address, opt =>
                opt.MapFrom(src => src.address))
            .ForMember(dest => dest.Email, opt =>
                opt.MapFrom(src => src.newEmail))
            .ForMember(dest => dest.Phone, opt =>
                opt.MapFrom(src => src.phone));
    }
}
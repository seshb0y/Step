using AutoMapper;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Models;

namespace ControllerFirst.Data.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterRequest, User>()
            .ForMember(dest => dest.Username, opt =>
                opt.MapFrom(src => src.Username))
            .ForMember(dest => dest.Email,
                opt =>
                    opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Password,
                opt =>
                    opt.MapFrom(src => src.Password));
    }
}
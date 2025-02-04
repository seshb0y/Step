using AutoMapper;
using ControllerFirst.Models;
using Lesson1_ControllerFirst.DTO.Requests;

namespace Lesson1_ControllerFirst.Data.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterRequest, User>()
            .ForMember(dest => dest.Username, opt =>
                opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email,
                opt =>
                    opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Password,
                opt =>
                    opt.MapFrom(src => src.Password));
    }
}
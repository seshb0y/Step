using AutoMapper;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;

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
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName));
    }
}
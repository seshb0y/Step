using AutoMapper;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Data.Mapping;

public class AuthorProfile : Profile
{
    public AuthorProfile()
    {
        CreateMap<AuthorAddRequest, Authors>()
            .ForMember(dest => dest.FullName, opt =>
                opt.MapFrom(src => src.FullName));
        
        CreateMap<AuthorAddRequest, Books>()
            .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.PublicationDate, opt =>
            opt.MapFrom(src => src.PublicationDate))
            .ForMember(dest => dest.Publisher, opt =>
            opt.MapFrom(src => src.Publisher));

        CreateMap<AuthorAddRequest, Genres>()
            .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.GenreName));
    }
}
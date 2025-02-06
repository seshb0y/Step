using AutoMapper;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Data.Mapping;

public class GenreProfile : Profile
{
    public GenreProfile()
    {
        CreateMap<AddGenreRequest, Books>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Publisher,
                opt => opt.MapFrom(src => src.Publisher))
            .ForMember(dest => dest.PublicationDate,
                opt => opt.MapFrom(src => src.PublicationDate));
        
        CreateMap<AddGenreRequest, Authors>()
            .ForMember(dest => dest.FullName, opt =>
                opt.MapFrom(src => src.AuthorName));
        
        CreateMap<AddGenreRequest, Genres>()
            .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.GenreName));
    }
}
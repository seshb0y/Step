using AutoMapper;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Data.Mapping;

public class BookProfile : Profile
{
    public BookProfile()
    {
        CreateMap<AddBookRequest, Books>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Publisher,
                opt => opt.MapFrom(src => src.Publisher))
            .ForMember(dest => dest.PublicationDate,
                opt => opt.MapFrom(src => src.PublicationDate));
        
        CreateMap<AddBookRequest, Authors>()
            .ForMember(dest => dest.FullName, opt =>
                opt.MapFrom(src => src.AuthorName));
        
        CreateMap<AddBookRequest, Genres>()
            .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.GenreName));
    }
}
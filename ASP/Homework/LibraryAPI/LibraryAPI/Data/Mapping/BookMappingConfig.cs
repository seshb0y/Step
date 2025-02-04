using AutoMapper;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Data.Mapping;

public class BookProfile : Profile
{
    public BookProfile()
    {
        CreateMap<BookRequest, Books>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Author,
                opt => opt.Ignore())
            .ForMember(dest => dest.Publisher,
                opt => opt.MapFrom(src => src.Publisher))
            .ForMember(dest => dest.PublicationDate,
                opt => opt.MapFrom(src => src.PublicationDate));
    }
}
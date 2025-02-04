using AutoMapper;
using LibraryAPI.Data.Models;

namespace LibraryAPI.Data.Mapping;

public class GenreProfile : Profile
{
    public GenreProfile()
    {
        CreateMap<Genres, GenreAuthor>()
        .ForMember(dest => dest.Genre,
            opt => opt.MapFrom(src => src.Name));
    }
}
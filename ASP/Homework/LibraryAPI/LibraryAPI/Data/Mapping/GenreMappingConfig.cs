using AutoMapper;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Data.Mapping;

public class GenreProfile : Profile
{
    public GenreProfile()
    {
        CreateMap<GenreRequest, Genres>()
        .ForMember(dest => dest.Name,
            opt => opt.MapFrom(src => src.Name));
    }
}
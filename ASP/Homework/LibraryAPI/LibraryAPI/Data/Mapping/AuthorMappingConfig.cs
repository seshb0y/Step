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
                opt.MapFrom(src => src.FullName))
            .ForMember(dest => dest.Books, opt =>
                opt.MapFrom(src => src.Books))
            .ForMember(dest => dest.GenreAuthor, opt =>
                opt.MapFrom(src => src.Genres.Select(genre => new GenreAuthor
                {
                    Genre = new Genres{Name = genre.Name}
                })))
            .AfterMap((src, dest) =>
            {
                foreach (var book in dest.Books)
                {
                    book.Author = dest; 
                }
                
                foreach (var genreAuthor in dest.GenreAuthor)
                {
                    genreAuthor.Author = dest; 
                }
            });
    }
}
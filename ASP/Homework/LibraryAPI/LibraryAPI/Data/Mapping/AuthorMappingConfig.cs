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
                opt.MapFrom(src => src.Books.Select(
                    book => new Books
                    {
                        Name = book.Title,
                        Publisher = book.Publisher,
                        PublicationDate = book.PublicationDate
                    })))
            .ForMember(dest => dest.GenreAuthor, opt =>
                opt.MapFrom(src => src.Genres.Select(genre => new Genres
                {
                    Name = genre.Name,
                })));
    }
}
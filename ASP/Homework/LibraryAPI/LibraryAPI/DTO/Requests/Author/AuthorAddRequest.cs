using LibraryAPI.Data.Models;

namespace LibraryAPI.DTO.Requests;

public record AuthorAddRequest
(string FullName, GenreRequest[] Genres, BookRequest[] Books);
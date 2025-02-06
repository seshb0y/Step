using LibraryAPI.Data.Models;

namespace LibraryAPI.DTO.Requests;

public record AuthorAddRequest
(string FullName, string GenreName, string Title, string PublicationDate, string Publisher);
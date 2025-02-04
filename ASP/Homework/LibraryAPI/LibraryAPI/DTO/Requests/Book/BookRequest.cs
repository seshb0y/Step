namespace LibraryAPI.DTO.Requests;

public record BookRequest
(string Title, string Author, GenreRequest[] Genre, string Publisher, string PublicationDate);
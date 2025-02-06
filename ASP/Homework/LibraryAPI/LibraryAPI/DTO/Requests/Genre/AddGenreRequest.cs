namespace LibraryAPI.DTO.Requests;

public record AddGenreRequest
(string AuthorName, string GenreName, string Title, string PublicationDate, string Publisher);
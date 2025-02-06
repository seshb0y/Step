namespace LibraryAPI.DTO.Requests;

public record AddBookRequest
(string AuthorName, string GenreName, string Title, string PublicationDate, string Publisher);
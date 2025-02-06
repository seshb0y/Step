namespace LibraryAPI.DTO.Requests;

public record UpdateBookRequest
    (string FindByTitle, string NewTitle, string PublicationDate, string Publisher);
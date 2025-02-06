namespace LibraryAPI.DTO.Requests;

public record AuthorUpdateRequest
(string FindByName, string NewFullName);
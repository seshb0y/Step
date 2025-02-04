using LibraryAPI.Data.Models;

namespace LibraryAPI.DTO.Requests;

public record AuthorChangeDeleteRequest
    (string FindByName, string NewFullName);
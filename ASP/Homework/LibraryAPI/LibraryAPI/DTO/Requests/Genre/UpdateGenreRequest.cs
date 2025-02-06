namespace LibraryAPI.DTO.Requests;

public record UpdateGenreRequest
    (string NewGenre, string OldGenre);
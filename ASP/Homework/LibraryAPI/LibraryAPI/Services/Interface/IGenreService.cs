using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Services.Interface;

public interface IGenreService
{
    public Task AddGenreAsync(GenreRequest request);
}
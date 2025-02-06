using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Services.Interface;

public interface IGenreService
{
    public Task AddGenreAsync(AddGenreRequest request);
    public Task AddGenreToAuthorAsync(AddGenreRequest request);
    public Task AddGenreToBookAsync(AddGenreRequest request);
    public Task AddBookToAuthorAsync(AddGenreRequest request);
    
    public Task DeleteGenreAsync(FindDeleteGenreRequest request);

    public bool CheckGenreExists(FindDeleteGenreRequest request);
    
    public Task UpdateGenreAsync(UpdateGenreRequest request);
    
    public Task<Genres> FindGenreAsync(FindDeleteGenreRequest request);
}
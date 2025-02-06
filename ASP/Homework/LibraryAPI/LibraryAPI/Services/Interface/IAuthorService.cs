using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Services.Interface;

public interface IAuthorService
{
    public Task AddAuthorAsync(AuthorAddRequest request);
    public Task AddBookToAuthorAsync(AuthorAddRequest request);
    public Task AddGenreToAuthorAsync(AuthorAddRequest request);
    public Task AddGenreToBookAsync(AuthorAddRequest request);
    
    public Task DeleteAuthorAsync(AuthorFindDeleteRequest request);

    public bool CheckAuthorExists(AuthorFindDeleteRequest request);
    
    public Task UpdateAuthorAsync(AuthorUpdateRequest request);
    
    public Task<Authors> FindAuthorAsync(AuthorFindDeleteRequest request);
}
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Services.Interface;

public interface IAuthorService
{
    public Task AddAuthorAsync(AuthorAddRequest request);
    
    public Task DeleteAuthorAsync(AuthorChangeDeleteRequest request);

    public bool CheckAuthorExists(AuthorChangeDeleteRequest request);
    
    public Task UpdateAuthorAsync(AuthorChangeDeleteRequest request);
    
    public Task<Authors> FindAuthorAsync(AuthorChangeDeleteRequest request);
}
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Services.Interface;

public interface IBookService
{
    public Task AddBookAsync(AddBookRequest request);
    public Task AddBookToAuthorAsync(AddBookRequest request);
    public Task AddGenreToBookAsync(AddBookRequest request);
    public Task AddGenreToAuthorAsync(AddBookRequest request);
    
    public Task DeleteBookAsync(FindDeleteBookRequest request);

    public bool CheckBookExists(FindDeleteBookRequest request);
    
    public Task UpdateBookAsync(UpdateBookRequest request);
    
    public Task<Books> FindBookAsync(FindDeleteBookRequest request);
}
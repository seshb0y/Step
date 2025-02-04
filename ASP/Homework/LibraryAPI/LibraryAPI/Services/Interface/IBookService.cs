using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;

namespace LibraryAPI.Services.Interface;

public interface IBookService
{
    public Task AddBookAsync(BookRequest request);
    
    public Task DeleteBookAsync(BookRequest request);

    public bool CheckBookExists(BookRequest request);
    
    public Task UpdateBookAsync(BookRequest request);
    
    public Task<Books> FindBookAsync(BookRequest request);
}
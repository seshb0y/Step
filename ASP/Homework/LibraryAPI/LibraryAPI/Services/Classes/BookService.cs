using AutoMapper;
using LibraryAPI.Data.Context;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services.Classes;

public class BookService(LibContext context, IMapper mapper) : IBookService
{
    private readonly LibContext _context = context;
    private readonly IMapper _mapper = mapper;
    
    public async Task AddBookAsync(BookRequest request)
    {
        var book = _mapper.Map<Books>(request);
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBookAsync(BookRequest request)
    {
        var match = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        _context.Books.Remove(match);
        await _context.SaveChangesAsync();
    }

    public bool CheckBookExists(BookRequest request)
    {
        var match = _context.Books.FirstOrDefault(x => x.Name == request.Title);

        if (match != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task UpdateBookAsync(BookRequest request)
    {
        var match = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        match.Name = request.Title;
        await _context.SaveChangesAsync();
    }

    public async Task<Books> FindBookAsync(BookRequest request)
    {
        var match = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        return match;
    }
}
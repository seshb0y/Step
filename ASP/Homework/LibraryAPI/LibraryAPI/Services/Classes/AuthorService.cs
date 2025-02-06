using AutoMapper;
using LibraryAPI.Data.Context;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services.Classes;

public class AuthorService(LibContext context, IMapper mapper) : IAuthorService
{
    private readonly LibContext _context = context;
    private readonly IMapper _mapper = mapper;
    
    public async Task AddAuthorAsync(AuthorAddRequest request)
    {
        var author = _mapper.Map<Authors>(request);
        
        // var book = await _context.Books.FirstOrDefaultAsync(x => x.Author.FullName == author.FullName);
        //
        // book.Author = author;
        //
        await _context.Authors.AddAsync(author);
        await _context.SaveChangesAsync();
    }
    
    public async Task DeleteAuthorAsync(AuthorChangeDeleteRequest request)
    {
        var match = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.FindByName);
        
        _context.Authors.Remove(match);
        await _context.SaveChangesAsync();
    }

    public bool CheckAuthorExists(AuthorChangeDeleteRequest request)
    {
        var match = _context.Authors.FirstOrDefault(x => x.FullName == request.FindByName);

        if (match != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task UpdateAuthorAsync(AuthorChangeDeleteRequest request)
    {
        var match = _context.Authors.FirstOrDefault(x => x.FullName == request.FindByName);
        match.FullName = request.NewFullName;
        await _context.SaveChangesAsync();
    }

    public async Task<Authors> FindAuthorAsync(AuthorChangeDeleteRequest request)
    {
        var match = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.FindByName);
        return match;
    }
}